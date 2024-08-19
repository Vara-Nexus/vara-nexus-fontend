import { Wallet } from '@/features/wallet';

import styles from './TokenMintForm.module.scss';
import React, { useState } from 'react';

function TokenMintForm() {
  const [address, setAddress] = useState('0x924...4e54');
  const [tokens, setTokens] = useState("1");
  const [allocation, setAllocation] = useState('100%');

  return (
    <div className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="token-name">Name</label>
        <p className={styles.subtext}>The full name of the token. </p>
        <input type="text" id="token-name" placeholder="Enter the token name..." />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="token-symbol">Symbol</label>
        <p className={styles.subtext}>The abbreviation of the token. </p>
        <input type="text" id="token-symbol" placeholder="Enter the token symbol..." />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="token-symbol">Distribute tokens</label>
        <p className={styles.subtext}>
          Add the wallets you&#39;d like to distribute tokens to. If you need help distributing tokens.
        </p>
        <div className={styles.subtext}>
          <span>Your connected wallet was automatically added to the distribution list. You can remove it if you like.</span>
        </div>
        <div className={styles.distributionList}>
          <div className={styles.distributionItem}>
            <label htmlFor="token-symbol">Address</label>
            <label htmlFor="token-symbol">Tokens</label>
          </div>
          <div className={styles.distributionItem}>
            <input type="address" value={address} disabled className={styles.walletAddress} />
            <div className={styles.actions}>
              {/* <button onClick={() => navigator.clipboard.writeText(address)}>Copy</button>
              <button>Link</button> */}
              {/* <button>-</button> */}
              <input type="number" value={tokens} onChange={(e) => setTokens(e.target.value)} />
              {/* <button>+</button> */}
              {/* <input type="text" value={allocation} disabled />
              <button>...</button> */}
            </div>
          </div>
          <div className={styles.addWalletButtonContainer}>
          <button className={styles.addWalletButton}>Add wallet +</button>
          </div>
          
        </div>
      </div>

      
    </div>
  );
}

export { TokenMintForm };
