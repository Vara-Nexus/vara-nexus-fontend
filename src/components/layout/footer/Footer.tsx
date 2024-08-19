import styles from './Footer.module.scss';
import { Copyright } from './copyright';
import { Socials } from './socials';

function Footer() {
  return (
    <footer className={styles.footer}>
      {/* <Socials />
      <Copyright /> */}
      <div className={styles.footerLinks}>
          <a href="https://vara.network/">Vara Network</a>
          <a href="https://outgoing-kiss-988.notion.site/Vara-Nexus-DAO-fff0f4ac4b0680e9bff4ff411fd39075">Dao Wiki</a>
          <a href="/">Nexus Tokenomics</a>
          <a href="/">Nexus Whitepaper</a>
        </div>
    </footer>
  );
}

export { Footer };
