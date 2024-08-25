import { Wallet } from '@/features/wallet';

import styles from './ExploreDaos.module.scss';
import React, { useState } from 'react';

function ExploreDaos() {
 
  return (
    <div className={styles.exploreContainer}>
  
      <div className={styles.filterButtons}>
        <button className={styles.active}>All DAOs</button>
        <button>Yours DAOs</button>
        <button>Following</button>
      </div>

      <div className={styles.daoCards}>
        <div className={styles.daoCard}>
          <h3><a href="/explore-dao/1">Green Earth DAO</a></h3>
          <p>Green Earth DAO is an initiative dedicated to promoting environmental sustainability through decentralized governance. By funding eco-friendly projects and supporting green technologies, Green Earth DAO aims to create a positive impact on our planet and inspire a new wave of ecological consciousness in the Web3 space.</p>
          <div className={styles.daoFooter}>
          <span>1.2K Members</span>
          <span>103 Proposals</span>
          </div>
        </div>

        <div className={styles.daoCard}>
          <h3><a href="/explore-dao/2">Artisans Collective</a></h3>
          <p>Artisans Collective is a decentralized platform for artists and creators to showcase their work, collaborate on projects, and receive funding through community governance. The DAO empowers artists by providing tools for peer collaboration, funding, and fair revenue sharing, fostering creativity and innovation across various mediums.</p>
          <div className={styles.daoFooter}>
          <span>1.2K Members</span>
          <span>103 Proposals</span>
          </div>
        </div>

        <div className={styles.daoCard}>
          <h3><a href="/explore-dao/3">DeFi Guardians</a></h3>
          <p>DeFi Guardians is a DAO that aims to protect and educate users in the decentralized finance (DeFi) space. With a focus on security, transparency, and community-driven audits, DeFi Guardians ensures that DeFi projects adhere to best practices, safeguarding investors and fostering trust within the ecosystem.</p>
          <div className={styles.daoFooter}>
          <span>1.2K Members</span>
          <span>103 Proposals</span>
          </div>
        </div>

        <div className={styles.daoCard}>
          <h3><a href="/explore-dao/4">EduDAO</a></h3>
          <p>EduDAO is committed to revolutionizing education through decentralized, peer-to-peer learning. By enabling learners and educators to interact directly, EduDAO promotes accessible and affordable education for all. The platform supports a wide range of subjects and skill levels, making lifelong learning available to anyone with an internet connection.</p>
          <div className={styles.daoFooter}>
          <span>1.2K Members</span>
          <span>103 Proposals</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ExploreDaos };
