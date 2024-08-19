import { Wallet } from '@/features/wallet';
import './DaoDetail.scss';
import { ProposalDashboard } from '@/components/proposalDashboard';


function DaoDetail() {
  return (
    <div className='dao-detail'>
    <ProposalDashboard />
    </div>
   
  );
}

export { DaoDetail };
