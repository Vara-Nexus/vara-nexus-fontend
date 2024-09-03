import { Wallet } from '@/features/wallet';
import './BuildYourDao.scss';
import { TokenMintForm } from '@/components/tokenMintForm';
import { DescribeYourDAO } from '@/components/describeYourDAO';
import { useNavigate } from 'react-router-dom';
import { SetStateAction, useState } from 'react';
import { useFormData } from '@/providers/FormDaoBuildDataContext';

function BuildYourDao() {
  
  interface FormData {
    name: string;
    description: string;
    programId: string;
  }

  const { formData, setFormData } = useFormData() as { formData: FormData, setFormData: React.Dispatch<React.SetStateAction<FormData>> };
  
  const navigate = useNavigate();
  const handleGoToReviewInfos = () => {
    navigate('/review-dao-info');
  }

  const handleDescribeDataChange = (data: SetStateAction<{ name: string; description: string; }>) => {
    console.log('data:', data);
    setFormData({...formData, ...data});
  };

  const handleMintDataChange = (data: SetStateAction<{ programId: string;}>) => {
    console.log('data:', data);
    setFormData({...formData, ...data});
  };
  

  return (
    <div>

        <h2 className="input-title">Describe Your DAO</h2>
        <DescribeYourDAO onChange={handleDescribeDataChange}  />
        <h2 className="input-title">Associating Your Token</h2>
        <TokenMintForm onChange={handleMintDataChange}  />
        <div className='submit-container'>
        <button className="create-dao-button" onClick={handleGoToReviewInfos}>Create</button>
        </div>
        
    </div>
  );
}

export { BuildYourDao };
