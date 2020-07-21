import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/auth';

const RouteWithLayout = props => {

  const { token } = useAuth();

  useEffect(() => {
    console.log(token);
  }, []);

  const { layout: Layout, component: Component, isPrivate = false, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => {
        return isPrivate === !!token ? (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        ) : (
            <Redirect to={{
              pathname: isPrivate ? '/sign-in' : '/meus-pacientes',
              state: { from: matchProps.location },
            }} />
          );
      }}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  isPrivate: PropTypes.bool
};

export default RouteWithLayout;
