import { Route, Routes } from 'react-router-dom';

import { Home } from './home';
import { BuildYourDao } from './build-your-dao';
import { ReviewDaoInformation } from './review-dao-information';
import { ExploreDao } from './explore-dao';
import { DaoDetail } from './dao-detail';
import { ProposalView } from './proposal-view';
import { FormDataProvider } from '@/providers/FormDaoBuildDataContext';
import { CreateProposal } from './create-proposal/CreateProposal';

const routes = [
  { path: '/', Page: Home },
  { path: '/build-dao', Page: BuildYourDao },
  { path: '/review-dao-info', Page: ReviewDaoInformation },
  { path: '/explore-dao', Page: ExploreDao },
  { path: '/explore-dao/:daoName', Page: DaoDetail },
  { path: '/proposal-detail/:daoName/:proposalId', Page: ProposalView },
  { path: '/proposal-create/:daoName', Page: CreateProposal },
];

function Routing() {
  const getRoutes = () => routes.map(({ path, Page }) => <Route key={path} path={path} element={<Page />} />);

  return <FormDataProvider>
    <Routes>{getRoutes()}</Routes>
  </FormDataProvider>;

  // return <Routes>{getRoutes()}</Routes>;
}

export { Routing };
