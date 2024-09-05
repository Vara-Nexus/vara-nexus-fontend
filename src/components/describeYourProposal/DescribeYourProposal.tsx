import { Wallet } from '@/features/wallet';

import styles from './DescribeYourProposal.module.scss';
import React, { useState, useEffect } from 'react';

function DescribeYourProposal({ onChange }: { onChange: (formData: {title: string, summary: string}) => void }) {
  
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalSummary, setProposalSummary] = useState('');

  const handleTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setProposalTitle(e.target.value);
  };

  const handleSummaryChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setProposalSummary(e.target.value);
  };

  // useEffect(() => {
  //   // Whenever the daoName or daoDescription changes, notify the parent component
  //   onChange({ name: daoName, description: daoDescription });
  // }, [daoName, daoDescription, onChange]);

  const handleBlur = () => {
    onChange({ title: proposalTitle, summary: proposalSummary });
  };

  return (
    <div className={styles.formContainer}>
          
          <div className={styles.formGroup}>
            <label htmlFor="dao-name">Title</label>
            <p className={styles.subtext}>Maximum of 128 characters</p>
            <input 
              type="text" 
              id="dao-name" 
              placeholder="Give your proposal a title ..." 
              value={proposalTitle} 
              onChange={handleTitleChange} 
              onBlur={handleBlur} 
            />
            <p className={styles.charCount}>{proposalTitle.length}/128</p>
          </div>
          
          {/* <div className={styles.formGroup}>
            <label htmlFor="dao-logo">Logo <span className="optional">Optional</span></label>
            <p className="subtext">JPG, PNG or GIF of no more than 3MB. We recommend 1024x1024px.</p>
            <div className="logo-upload">
              <button className="upload-button">+</button>
            </div>
          </div> */}
          
          <div className={styles.formGroup}>
            <label htmlFor="dao-description">Summary</label>
            <p className={styles.subtext}> </p>
            <textarea 
              id="dao-description" 
              placeholder="Describe your proposal in 2-3 sentences." 
              value={proposalSummary} 
              onChange={handleSummaryChange}
              onBlur={handleBlur} 
            ></textarea>
          </div>
          
    </div>
  );
}

export { DescribeYourProposal };
