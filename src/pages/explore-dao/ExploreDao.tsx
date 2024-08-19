import { Wallet } from '@/features/wallet';
import './ExploreDao.scss';
import { ExploreDaos } from '@/components/exploreDaos';

function ExploreDao() {
  return (
    <div>
        <h2 className='input-title'>Explore DAOs</h2>
        <ExploreDaos />
    </div>
  );
}

export { ExploreDao };
