import { Route, Routes } from 'react-router-dom';

import { Home } from './home';
import { BuildYourDao } from './build-your-dao';
import { ReviewDaoInformation } from './review-dao-information';
import { ExploreDao } from './explore-dao';
import { DaoDetail } from './dao-detail';

const routes = [
  { path: '/', Page: Home },
  { path: '/build-dao', Page: BuildYourDao },
  { path: '/review-dao-info', Page: ReviewDaoInformation },
  { path: '/explore-dao', Page: ExploreDao },
  { path: '/explore-dao/:daoId', Page: DaoDetail },
];

function Routing() {
  const getRoutes = () => routes.map(({ path, Page }) => <Route key={path} path={path} element={<Page />} />);

  return <Routes>{getRoutes()}</Routes>;
}

export { Routing };
