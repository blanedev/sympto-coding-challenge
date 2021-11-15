import { Redirect, Switch } from 'react-router-dom';
import Layout from './Layout';
import AppRoute from './AppRoute';
import { routes } from './routes';

export const AppLayout = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <AppRoute
          exact
          key={route.key}
          path={route.path}
          component={route.component}
          layout={Layout}
        />
      ))}
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default AppLayout;
