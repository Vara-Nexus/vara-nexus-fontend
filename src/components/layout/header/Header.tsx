import { Wallet } from '@/features/wallet';

import styles from './Header.module.scss';
import { Logo } from './logo';


function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}><a href="/">Nexus</a></div>
      <nav>
        <a href="/build-dao">Create your DAO</a>
        <a href="/explore-dao">Explore DAOs</a>
      </nav>
      <Wallet />
    </header>
  );
}

export { Header };
