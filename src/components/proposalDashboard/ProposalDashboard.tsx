import { Wallet } from '@/features/wallet';
import styles from './ProposalDashboard.module.scss';
import { useAccount, useApi } from '@gear-js/react-hooks';
import { useWallet } from '@/features/wallet/hooks';
import { useEffect, useState } from 'react';
import { ADDRESS, PROGRAMS } from '@/consts';
import { Sails } from 'sails-js';
import { useNavigate } from 'react-router-dom';

import imgDaoIcon from '@/assets/images/6099e984a465a162069952448.png'

function ProposalDashboard() {

  const gearApi = useApi();
  const {
    wallet, walletAccounts, setWalletId, resetWalletId, getWalletAccounts, saveWallet, removeWallet,
  } = useWallet();
  const {extensions} =  useAccount()
  const [daoInfos, setDaoInfos] = useState<TypeDaoInfos>();

  const daoName =  decodeURIComponent(window.location.pathname.split('/').pop()??'');

  const [proposals, setProposals] = useState<TypeProposal[]>([]);

  type TypeDaoInfos = {
      "name": string,
      "description": string,
      "token_actor": string,
      "token": {
          "name": string,
          "symbol": string,
          "decimals": number,
          "total_supply": string
      }
  }

  type TypeProposal = {
    creator: string
    description: string
    status: string
    title: string
    votes_against: number
    votes_for: number
    voting_end: number
    voting_start: number
  }

  const fetchDaoInfo = async () => {

    if(gearApi.api && walletAccounts && walletAccounts.length > 0 && extensions && extensions.length > 0) {
      try {
        
        const sails = await Sails.new();
        sails.setApi(gearApi.api);
        // Load the IDL file
        const idl = await fetch('../src/assets/idls/nexus_dao.idl').then((res) => res.text());
        sails.parseIdl(idl);
        sails.setProgramId(PROGRAMS.DAO_ID);

        console.log('daoName - ', daoName)

        const _daoInfo: TypeDaoInfos = await sails.services.NexusDao.queries.GetDaoInfo(walletAccounts[0].address, undefined, undefined, daoName);
        setDaoInfos(_daoInfo);

        // 
        const _proposals: [TypeProposal] = await sails.services.NexusDao.queries.GetProposals(walletAccounts[0].address, undefined, undefined, daoName);
        // 
        console.log('Proposals:', _proposals);
        setProposals(_proposals.reverse());

      } catch (error) {
        console.error('Failed to fetch daoName:', error);
      }
    }
  }

  const navigate = useNavigate();
  const handleGoToProposalCreate = () => {
    navigate('/proposal-create/' + daoName);
  }

  useEffect(() => {

    fetchDaoInfo().catch((error) => {
      alert('Failed to fetch data of dao');
    });
  }, []); 

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div>
          <h1>{daoInfos?.name}</h1>
          <p>{daoInfos?.description}</p>
          <div className={styles.metadata}>
            <span>📅 &nbsp;July 2024</span>
            {/* <span>🌐 &nbsp;Polygon</span> */}
            <span>🔗 &nbsp;Docs</span>
          </div>
        </div>
        <div className={styles.profile}>
          <img src={imgDaoIcon} alt="Profile" />
          <button className={styles.followButton}>Follow</button>
        </div>
      </header>

      <div className={styles.actions}>

        <div className={styles.leftCell}>
          <div className={styles.proposals}>
            <span>{proposals.length} Proposals created</span>
            <button onClick={handleGoToProposalCreate} className={styles.newProposalButton}>New proposal</button>
          </div>

          <div className={styles.proposalsList}>

            {proposals.map((proposal, index) => (
              
              <div className={styles.proposal} key={index}>
                <span className={styles.statusActived}>Actived</span>
                <h3><a href={`/proposal-detail/${daoName}/${proposals.length - index}`}>{proposal.title}</a></h3>
                <p>{proposal.description}</p>
                <span>Published </span> 
              </div>
            ))}
  

            {/* <div className={styles.proposal}>
              <span className={styles.statusActived}>Actived</span>
              <h3>Decided to participate in Vara’s hackathon.</h3>
              <p>The main purpose is to enter this new ecosystem and see if we can obtain a grant.</p>
              <span>Published </span>
            </div> */}

            {/* <div className={styles.proposal}>
              <span className={styles.statusDefeated}>Defeated</span>
              <h3>Support the AVAR Hackathon</h3>
              <p>In order to support the AVAR community in developing a project similar to DAO, as a competition project for the hackathon.</p>
              <span>Published by 0x67f…5557</span>
            </div> */}
          </div>
        </div>


        <div className={styles.rightCell}>
          <div className={styles.treasury}>
            <span>$0.00</span>
            <p>Treasury value</p>
            <button className={styles.newTransferButton}>New transfer</button>
          </div>

          {/* <div className={styles.members}>
            <p>5 Members</p>
            <button className={styles.newTransferButton}>Add member</button>
          </div> */}
        </div>



      </div>


    </div>
  );
}

export { ProposalDashboard };
