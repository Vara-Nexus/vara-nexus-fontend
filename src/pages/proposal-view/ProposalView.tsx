import { Wallet } from '@/features/wallet';
import './ProposalView.scss';
import { ProposalDetail } from '@/components/proposalDetail';


function ProposalView() {
  return (
    <div className='dao-detail'>
    <ProposalDetail />
    </div>
   
  );
}

export { ProposalView };
