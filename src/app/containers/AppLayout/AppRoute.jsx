import { Route } from 'react-router-dom';

const AppRoute = ({ component, layout: Layout, ...rest }) => {
  const render = (Component) => (props) => {
    if (!!Component) {
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }
  };
  return <Route {...rest} render={render(component)} />;
};

export default AppRoute;
