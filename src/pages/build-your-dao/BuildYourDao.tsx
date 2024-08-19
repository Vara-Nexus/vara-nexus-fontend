import { Wallet } from '@/features/wallet';
import './BuildYourDao.scss';
import { TokenMintForm } from '@/components/tokenMintForm';
import { DescribeYourDAO } from '@/components/describeYourDAO';
import { useNavigate } from 'react-router-dom';

function BuildYourDao() {

  const navigate = useNavigate();
  const handleGoToReviewInfos = () => {
    navigate('/review-dao-info');
  }

  return (
    <div>
        <h2 className="input-title">Describe Your DAO</h2>
        <DescribeYourDAO />
        <h2 className="input-title">Mint Your Token</h2>
        <TokenMintForm />
        <div className='submit-container'>
        <button className="create-dao-button" onClick={handleGoToReviewInfos}>Create</button>
        </div>
        
    </div>
  );
}

export { BuildYourDao };
