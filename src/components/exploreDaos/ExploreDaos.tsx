import { Wallet } from '@/features/wallet';

import styles from './ExploreDaos.module.scss';
import React, { useEffect, useState } from 'react';
import { useAccount, useApi } from '@gear-js/react-hooks';
import { useWallet } from '@/features/wallet/hooks';
import { Sails } from 'sails-js';
import { PROGRAMS } from '@/consts';

function ExploreDaos() {

  const gearApi = useApi();
  const {
    walletAccounts
  } = useWallet();
  const {extensions} =  useAccount()

  const [daoInfos, setDaoInfos] = useState<{ name: string, description: string, token_actor: string, token: null }[]>([]);
  
  const fetchBalanceList = async () => {

    if(gearApi.api && walletAccounts && walletAccounts.length > 0 && extensions && extensions.length > 0) {
      try {
        
        const sails = await Sails.new();
        sails.setApi(gearApi.api);
        // Load the IDL file
        const idl = await fetch('./src/assets/idls/nexus_dao.idl').then((res) => res.text());
        sails.parseIdl(idl);
        sails.setProgramId(PROGRAMS.DAO_ID);

        const result: [{
          "name": string,
          "description": string,
          "token_actor": string,
          "token": null
        }] = await sails.services.NexusDao.queries.GetAllDaoInfo(walletAccounts[0].address);

        setDaoInfos(result.reverse());
        
      } catch (error) {
        console.error('Failed to fetch balances:', error);
      }
    }
  }

  useEffect(() => {

    fetchBalanceList().catch((error) => {
      alert('Failed to fetch da');
    });

  }, []);  
 
  return (
    <div className={styles.exploreContainer}>
  
      <div className={styles.filterButtons}>
        <button className={styles.active}>All DAOs</button>
        <button>Yours DAOs</button>
        <button>Following</button>
      </div>

      <div className={styles.daoCards}>
        {daoInfos.map((daoInfo, index) => (
          <div className={styles.daoCard} key={index}>
            <h3><a href={`/explore-dao/${daoInfo.name}`}>{daoInfo.name}</a></h3>
            <p>{daoInfo.description}</p>
            <div className={styles.daoFooter}>
              <span> Members</span>
              <span> Proposals</span>
            </div>
          </div>
        ))}
        {/* <div className={styles.daoCard}>
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
        </div> */}
      </div>
    </div>
  );
}

export { ExploreDaos };
