import { Wallet } from '@/features/wallet';
import styles from './ProposalDetail.module.scss';


function ProposalDetail() {
  return (
    <div className={styles.proposalContainer}>
      <div className={styles.proposalHeader}>
        <h2>Decided to participate in Vara&#39;s hackathon.</h2>
        <p className={styles.publishedBy}>
          Published by 5ChoCZYZmMwQe4ZzNE1QqJcyoePYMtWzcbpjJEw2rYu7TSVC
        </p>
        <p>The main purpose is to enter this new ecosystem and see if we can obtain a grant.</p>
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
                <div className={styles.yesBar} style={{ width: '100%' }}></div>
              </div>
              <span className={styles.voteToken}>9M LDA</span>
              <span className={styles.voteProportion}>100%</span>
            </div>
            <div className={styles.voteItem}>
              <span className={styles.voteTitle}>No</span>
              <div className={styles.progressBar}>
                <div className={styles.noBar} style={{ width: '0%' }}></div>
              </div>
              <span className={styles.voteToken}>0 LDA</span>
              <span className={styles.voteProportion}>0%</span>
            </div>
            <div className={styles.voteItem}>
              <span className={styles.voteTitle}>Abstain</span>
              <div className={styles.progressBar}>
                <div className={styles.abstainBar} style={{ width: '11%' }}></div>
              </div>
              <span className={styles.voteToken}>990k LDA</span>
              <span className={styles.voteProportion}>11%</span>
            </div>
          </div>
          <button className={styles.voteSubmitted} disabled>Vote submitted</button>
        </div>

        <div className={styles.statusSection}>
          <h3>Status</h3>
          <div className={styles.statusItem}>
            <span>✅ Published</span>
            <p>2024/07/15 09:50 PM UTC+8</p>
          </div>
          <div className={styles.statusItem}>
            <span>🟢 Running</span>
            <p>2024/07/15 09:50 PM UTC+8</p>
          </div>
          <div className={styles.statusItem}>
            <span>❌ Rejected</span>
            <p>2024/07/22 10:50 PM UTC+8</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProposalDetail };
