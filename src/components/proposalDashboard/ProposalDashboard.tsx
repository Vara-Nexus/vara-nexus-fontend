import { Wallet } from '@/features/wallet';
import styles from './ProposalDashboard.module.scss';


function ProposalDashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div>
          <h1>Linda’s Finance</h1>
          <p>0xe3f…9b80</p>
          <p>For finance manage</p>
          <div className={styles.metadata}>
            <span>📅 &nbsp;July 2024</span>
            {/* <span>🌐 &nbsp;Polygon</span> */}
            <span>🔗 &nbsp;Docs</span>
          </div>
        </div>
        <div className={styles.profile}>
          <img src="/src/assets/images/proposal-logo.png" alt="Profile" />
          <button className={styles.followButton}>Follow</button>
        </div>
      </header>

      <div className={styles.actions}>

        <div className={styles.leftCell}>
          <div className={styles.proposals}>
            <span>2 Proposals created</span>
            <button className={styles.newProposalButton}>New proposal</button>
          </div>

          <div className={styles.proposalsList}>
            <div className={styles.proposal}>
              <span className={styles.statusDefeated}>Defeated</span>
              <h3>Decided to participate in Vara’s hackathon.</h3>
              <p>The main purpose is to enter this new ecosystem and see if we can obtain a grant.</p>
              <span>Published by you</span>
            </div>

            <div className={styles.proposal}>
              <span className={styles.statusDefeated}>Defeated</span>
              <h3>Support the AVAR Hackathon</h3>
              <p>In order to support the AVAR community in developing a project similar to DAO, as a competition project for the hackathon.</p>
              <span>Published by 0x67f…5557</span>
            </div>
          </div>
        </div>


        <div className={styles.rightCell}>
          <div className={styles.treasury}>
            <span>$0.00</span>
            <p>Treasury value</p>
            <button className={styles.newTransferButton}>New transfer</button>
          </div>

          <div className={styles.members}>
            <p>5 Members</p>
            <button className={styles.newTransferButton}>Add member</button>
          </div>
        </div>



      </div>


    </div>
  );
}

export { ProposalDashboard };
