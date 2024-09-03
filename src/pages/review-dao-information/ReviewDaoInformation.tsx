import React, { useEffect, useState } from 'react';
import './ReviewDaoInformation.scss';
import { Sails } from 'sails-js';
import { GearApi, HexString } from '@gear-js/api';
import { useWallet } from '@/features/wallet/hooks';
import { useAccount, useApi } from '@gear-js/react-hooks';

import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';
import { BN, hexToBn } from '@polkadot/util';

import { PROGRAMS } from '@/consts';
import { useFormData } from '@/providers/FormDaoBuildDataContext';
import { H } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';
import { useNavigate } from 'react-router-dom';

const SS58_PREFIX = 42;

function ReviewDaoInformation() {

  interface FormData {
    name: string;
    description: string;
    programId: string;
  }

  const { formData, setFormData } = useFormData() as { formData: FormData, setFormData: React.Dispatch<React.SetStateAction<FormData>> };
  console.log('exists: formData:', formData);
  
  const [isDeploying, setIsDeploying] = useState(false);
  const [balanceList, setBalanceList] = useState<{ address: string; balance: string }[]>([]);

  const {
    wallet, walletAccounts, setWalletId, resetWalletId, getWalletAccounts, saveWallet, removeWallet,
  } = useWallet();

  const {extensions} =  useAccount()
  const navigate = useNavigate();

  const gearApi = useApi();


  const handleDeploy = async () => {

    console.log(walletAccounts, wallet, extensions);
    
    setIsDeploying(true);
    console.log("DAO_PROGRAM_ID" ,PROGRAMS);
    try {

      if(gearApi.api && walletAccounts && walletAccounts.length > 0 && extensions && extensions.length > 0) {

        const sails = await Sails.new();
        sails.setApi(gearApi.api);

        // Load the IDL file
        const idl = await fetch('./src/idls/nexus_dao.idl').then((res) => res.text());
        sails.parseIdl(idl);
        sails.setProgramId(PROGRAMS.DAO_ID);

        const transaction = sails.services.NexusDao.functions.CreateDao(
          formData.name,
          formData.description,
          formData.programId,
        );

        transaction.withAccount(walletAccounts[0].address, {
          signer: extensions[0].signer,
        });
        await transaction.calculateGas();
        transaction.withValue(BigInt(0));
        const { response } = await transaction.signAndSend();
        const result = await response();
        console.log('DAO Created:', result);

        if(result) {
          alert('DAO created successfully');
          // 跳转到 /explore-dao
          navigate('/explore-dao');

        }
      }
    } catch (error) {
      console.error('Failed to deploy DAO:', error);
    } finally {
      setIsDeploying(false);
    }
  };


  const fetchBalanceList = async () => {

    if(gearApi.api && walletAccounts && walletAccounts.length > 0 && extensions && extensions.length > 0) {
      try {
        
        const sails = await Sails.new();
        sails.setApi(gearApi.api);
        // Load the IDL file
        const idl = await fetch('./src/idls/nexus_vft.idl').then((res) => res.text());
        sails.parseIdl(idl);
        // sails.setProgramId("0x3881881eadb003b1f144f6bcf50a9edbcebfc16c9dab554b1723dbe3b3c2fddd");
        sails.setProgramId(formData.programId as HexString);

        const balances: [[string, string]] = await sails.services.NexusVft.queries.Balances(walletAccounts[0].address);
        const result = balances.map((item) => {

          
          const rowActorId = item[0];
          const rowBalance = item[1];

          console.log('item:', { rowActorId, rowBalance });

          // Convert actor_id (hex) to SS58 address
          const address = encodeAddress(rowActorId, SS58_PREFIX);
    
          const balanceBn = hexToBn(rowBalance, { isLe: false, isNegative: false }); 
          const decimals = 6;
          const divisor = new BN(10).pow(new BN(decimals));
          const balance = balanceBn.div(divisor).toString();

          return {
            address,
            balance,
          };
        });
        console.log('Balances:', result);
        setBalanceList(result);

      } catch (error) {
        console.error('Failed to fetch balances:', error);
      }
    }
  }

  useEffect(() => {

    // Check information
    if(!formData.name) {
      alert('Please enter the VFT token program ID');
      return ;
    }

    if(!formData.description) {
      alert('Please enter the description');
      return ;
    }

    if(!formData.programId) {
      alert('Please enter the VFT token program ID');
      return ;
    }

    fetchBalanceList().catch((error) => {
      alert('Failed to fetch, make sure you have the VFT token program ID');
    });

  }, []);  

  return (

    <div>
      <h2 className='input-title'>Review Dao Information</h2>
          <div className="review-container">
            
            <div className="review-content">
              <div className="info-row">
                <span className="label">Name:</span>
                <span className="value">{formData.name}</span>
              </div>
              
              <div className="info-row">
                <span className="label">Description:</span>
                <span className="value">
                  {formData.description}
                </span>
              </div>
              
              {/* <div className="info-row">
                <span className="label">Token Name:</span>
                <span className="value">NexusCoin</span>
              </div>
              
              <div className="info-row">
                <span className="label">Token Symbol:</span>
                <span className="value">VEC</span>
              </div> */}

            <div className="info-row">
                <span className="label">VFTToken Id:</span>
                <span className="value">{formData.programId}</span>
              </div>
              
              <div className="info-row">
                <span className="label">Distribute list:</span>
                <div className="value">
                  {/* <p>5Ct3GP....KBegF4 <span className='token-proportion'>[25%]</span> 25000000 VEC</p>
                  <p>5Ct3GP....KBegF4 <span className='token-proportion'>[25%]</span> 25000000 VEC</p>
                  <p>5Ct3GP....KBegF4 <span className='token-proportion'>[50%]</span> 25000000 VEC</p> */}
                  {balanceList.map((item) => (
                    <p key={item.address}>{item.address} <span className='token-proportion'>{item.balance} VEC</span></p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className='submit-container'>
            <button 
              className="deploy-dao-button" 
              onClick={handleDeploy} 
              disabled={isDeploying}
            >
            {isDeploying ? 'Deploying...' : 'Deployed to Vara'}
            </button>
            </div>
            
          </div>
    </div>
    
  );
}

export { ReviewDaoInformation };
