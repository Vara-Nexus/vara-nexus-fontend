import { Wallet } from '@/features/wallet';

import styles from './DescribeYourDAO.module.scss';
import React, { useState } from 'react';

function DescribeYourDAO() {
  const [address, setAddress] = useState('0x924...4e54');
  const [tokens, setTokens] = useState("1");
  const [allocation, setAllocation] = useState('100%');

  return (
    <div className={styles.formContainer}>
          
          <div className={styles.formGroup}>
            <label htmlFor="dao-name">Name</label>
            <p className={styles.subtext}>Maximum of 128 characters</p>
            <input type="text" id="dao-name" placeholder="Type your DAO's name ..." />
            <p className="char-count">0/128</p>
          </div>
          
          {/* <div className={styles.formGroup}>
            <label htmlFor="dao-logo">Logo <span className="optional">Optional</span></label>
            <p className="subtext">JPG, PNG or GIF of no more than 3MB. We recommend 1024x1024px.</p>
            <div className="logo-upload">
              <button className="upload-button">+</button>
            </div>
          </div> */}
          
          <div className={styles.formGroup}>
            <label htmlFor="dao-description">Description</label>
            <p className={styles.subtext}>Describe your DAO&#39;s purpose in a few sentences. This is listed on the Explore page so new contributors can find you.</p>
            <textarea id="dao-description" placeholder="Type your summary ..."></textarea>
          </div>
          
    </div>
  );
}

export { DescribeYourDAO };
