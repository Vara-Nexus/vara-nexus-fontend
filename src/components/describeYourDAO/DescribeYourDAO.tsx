import { Wallet } from '@/features/wallet';

import styles from './DescribeYourDAO.module.scss';
import React, { useState, useEffect } from 'react';

function DescribeYourDAO({ onChange }: { onChange: (formData: {name: string, description: string}) => void }) {
  
  const [daoName, setDaoName] = useState('');
  const [daoDescription, setDaoDescription] = useState('');

  const handleNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setDaoName(e.target.value);
  };

  const handleDescriptionChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setDaoDescription(e.target.value);
  };

  // useEffect(() => {
  //   // Whenever the daoName or daoDescription changes, notify the parent component
  //   onChange({ name: daoName, description: daoDescription });
  // }, [daoName, daoDescription, onChange]);

  const handleBlur = () => {
    onChange({ name: daoName, description: daoDescription });
  };

  return (
    <div className={styles.formContainer}>
          
          <div className={styles.formGroup}>
            <label htmlFor="dao-name">Name</label>
            <p className={styles.subtext}>Maximum of 128 characters</p>
            <input 
              type="text" 
              id="dao-name" 
              placeholder="Type your DAO's name ..." 
              value={daoName} 
              onChange={handleNameChange} 
              onBlur={handleBlur} 
            />
            <p className={styles.charCount}>{daoName.length}/128</p>
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
            <textarea 
              id="dao-description" 
              placeholder="Type your summary ..." 
              value={daoDescription} 
              onChange={handleDescriptionChange}
              onBlur={handleBlur} 
            ></textarea>
          </div>
          
    </div>
  );
}

export { DescribeYourDAO };
