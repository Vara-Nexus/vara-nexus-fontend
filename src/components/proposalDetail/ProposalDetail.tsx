import { Wallet } from '@/features/wallet';
import styles from './ProposalDetail.module.scss';
import { useAccount, useApi } from '@gear-js/react-hooks';
import { useWallet } from '@/features/wallet/hooks';
import { Sails } from 'sails-js';
import { PROGRAMS } from '@/consts';
import { useEffect, useState } from 'react';


function ProposalDetail() {

  const gearApi = useApi();
  const {
    wallet, walletAccounts, setWalletId, resetWalletId, getWalletAccounts, saveWallet, removeWallet,
  } = useWallet();
  const {extensions} =  useAccount()
  const [proposal, setProposal] = useState<TypeProposal>();

  // 从链接 http://localhost:5173/proposal-detail/Artisans%20Collective/0 获取 daoName和 proposalId
  const daoName = decodeURIComponent(window.location.pathname.split('/')[2]);
  const proposalId = window.location.pathname.split('/').pop();

  type TypeProposal = {
    creator: string;
    description: string;
    status: string;
    title: string;
    votes_against: number;
    votes_for: number;
    voting_end: number;
    voting_start: number;
  };

  console.log('daoName - ', daoName)
  console.log('proposalId - ', proposalId)


  const getProposal = async () => {
    
    if(gearApi.api && walletAccounts && walletAccounts.length > 0 && extensions && extensions.length > 0) {
      try {
        
        const sails = await Sails.new();
        sails.setApi(gearApi.api);
        // Load the IDL file
        const idl = await fetch('../../src/assets/idls/nexus_dao.idl').then((res) => res.text());
        sails.parseIdl(idl);
        sails.setProgramId(PROGRAMS.DAO_ID);
        // // Call GetProposal : query GetProposal : (dao_name: str, proposal_id: u32) -> opt Proposal;
        const _proposalInfo: TypeProposal = await sails.services.NexusDao.queries.GetProposal(walletAccounts[0].address, undefined, undefined, daoName, Number(proposalId)+1);

        console.log('_proposalInfo - ', _proposalInfo)

        setProposal(_proposalInfo);
 

      } catch (error) {
        console.error('Failed to fetch daoName:', error);
      }
    }
  }

  useEffect(() => {
    getProposal().catch((error) => {
      alert('Failed to fetch data of proposal');
    });
  }, []); 
  
  return (
    <div className={styles.proposalContainer}>
      <div className={styles.proposalHeader}>
        <h2>Decided to participate in Vara&#39;s hackathon.</h2>
        <p className={styles.publishedBy}>
          Published by {proposal?.creator} {/* on 2024/07/15 09:50 PM UTC+8 */}
        </p>
        <p>{proposal?.description}</p>
      </div>

      <div className={styles.proposalContent}>
        <div className={styles.votingSection}>
          <h3>Voting</h3>
          <p className={styles.proposalDefeated}>❗Proposal defeated</p>
          {/* <div className={styles.votingBreakdown}>
            <button className={styles.activeTab}>Breakdown</button>
            <button>Voters</button>
            <button>Info</button>
          </div> */}
          <div className={styles.votingResults}>
            <div className={styles.voteItem}>
              <span className={styles.voteTitle}>Yes</span>
              <div className={styles.progressBar}>
                <div className={styles.yesBar} style={{ width: '0%' }}></div>
              </div>
              <span className={styles.voteToken}>0 Power</span>
              <span className={styles.voteProportion}>0%</span>
            </div>
            <div className={styles.voteItem}>
              <span className={styles.voteTitle}>No</span>
              <div className={styles.progressBar}>
                <div className={styles.noBar} style={{ width: '0%' }}></div>
              </div>
              <span className={styles.voteToken}>0 Power</span>
              <span className={styles.voteProportion}>0%</span>
            </div>
            <div className={styles.voteItem}>
              <span className={styles.voteTitle}>Abstain</span>
              <div className={styles.progressBar}>
                <div className={styles.abstainBar} style={{ width: '0%' }}></div>
              </div>
              <span className={styles.voteToken}>0 Power</span>
              <span className={styles.voteProportion}>0%</span>
            </div>
          </div>
          <button className={styles.voteSubmitted} disabled>Vote submitted</button>
        </div>

        <div className={styles.statusSection}>
          <h3>Status</h3>
          <div className={styles.statusItem}>
            <span>✅ Published</span>
            {/* <p>2024/07/15 09:50 PM UTC+8</p> */}
          </div>
          <div className={styles.statusItem}>
            <span>🟢 Running</span>
            {/* <p>2024/07/15 09:50 PM UTC+8</p> */}
          </div>
          {/* <div className={styles.statusItem}>
            <span>❌ Rejected</span>
            <p>2024/07/22 10:50 PM UTC+8</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export { ProposalDetail };
