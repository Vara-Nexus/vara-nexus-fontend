import { Wallet } from '@/features/wallet';
import './CreateProposal.scss';
import { TokenMintForm } from '@/components/tokenMintForm';
import { useNavigate } from 'react-router-dom';
import { SetStateAction, useState } from 'react';
import { useFormData } from '@/providers/FormDaoBuildDataContext';
import { DescribeYourProposal } from '@/components/describeYourProposal';
import { useWallet } from '@/features/wallet/hooks';
import { useAccount, useApi } from '@gear-js/react-hooks';

import { Sails } from 'sails-js';
import { PROGRAMS } from '@/consts';

function CreateProposal() {
  

  const [proposalInfos, setProposalInfos] = useState<{title: string, summary: string}|undefined>(undefined);
  const [isDeploying, setIsDeploying] = useState(false);
  const [balanceList, setBalanceList] = useState<{ address: string; balance: string }[]>([]);

  const {
    wallet, walletAccounts, setWalletId, resetWalletId, getWalletAccounts, saveWallet, removeWallet,
  } = useWallet();

  const {extensions} =  useAccount()
  const gearApi = useApi();
  const navigate = useNavigate();

  // Call CreateProposal : (dao_name: str, title: str, description: str, voting_start: u32, voting_end: u32) -> u32;
  const submitAProposal = async () => {
    console.log('proposalInfos = ', proposalInfos);

    const daoName =  decodeURIComponent(window.location.pathname.split('/').pop()??'');

    if (!proposalInfos?.title || !proposalInfos?.summary || daoName === '') {
      alert('Please fill out both the title and the summary.');
      return;
    }

    if (gearApi.api && walletAccounts && walletAccounts.length > 0 && extensions && extensions.length > 0) {
      setIsDeploying(true);
      try {
        // Initialize Sails for contract interaction
        const sails = await Sails.new();
        sails.setApi(gearApi.api);
        
        // Load the DAO IDL file (update the path to match your setup)
        const idl = await fetch('../src/assets/idls/nexus_dao.idl').then((res) => res.text());
        sails.parseIdl(idl);
        sails.setProgramId(PROGRAMS.DAO_ID); // Ensure you have the correct DAO program ID

        console.log('walletAccounts[0].address:', walletAccounts[0].address);
        // // 获取当前区块高度
        const block = await gearApi.api.rpc.chain.getBlock();
        // 获取区块高度
        const blockHeight = block.block.header.number.toNumber();
        console.log('blockHeight:', blockHeight);

        // Define voting start and end times (you can adjust these to suit your needs)
        const voting_start = blockHeight; // Current time in seconds
        const voting_end = blockHeight + 604800; // Voting ends in 7 days (seconds)

        console.log('voting_start:', voting_start, 'voting_end:', voting_end);

        // Call the CreateProposal function on the NexusDao service
        const transaction = sails.services.NexusDao.functions.CreateProposal(
          daoName, 
          proposalInfos.title,
          proposalInfos.summary,
          voting_start,
          voting_end,
        );

        // Set the transaction account and sign the transaction
        transaction.withAccount(walletAccounts[0].address, {
          signer: extensions[0].signer,
        });

        await transaction.calculateGas();
        transaction.withValue(BigInt(0));

        const { response } = await transaction.signAndSend();
        const result = await response();
        console.log('Proposal Created:', result);

        if (result) {
          alert('Proposal created successfully');
          navigate('/explore-dao/'+encodeURIComponent(daoName)); // Redirect to proposals page
        }
      } catch (error) {
        console.error('Failed to submit proposal:', error);
      } finally {
        setIsDeploying(false);
      }
    } else {
      alert('Please connect your wallet to submit a proposal.');
    }
    
  }

  const handleDescribeDataChange = (data: {title: string, summary: string}) => {
    if(data){
      setProposalInfos({
        title: data.title,
        summary: data.summary
      });
    }
  };

  

  return (
    <div>

        <h2 className="input-title">Create a proposal</h2>
        <DescribeYourProposal onChange={handleDescribeDataChange}  />
        <div className='submit-container'>
        <button
          className="create-proposal-button"
          onClick={submitAProposal}
          disabled={isDeploying}
        >
          {isDeploying ? 'Submitting...' : 'Create'}
        </button>
        </div>
        
    </div>
  );
}

export { CreateProposal };
