import React, { useContext, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Context } from '../../context/AuthContext';

const RouteWithLayout = props => {
  const { authenticated, loading } = useContext(Context);
  const history = useHistory();

  const {
    layout: Layout,
    component: Component,
    isPrivate = false,
    ...rest
  } = props;

  useEffect(() => {
    if (!authenticated && isPrivate && !loading) {
      console.log(authenticated);
    }
  }, [authenticated]);

  if (isPrivate && !authenticated && !loading) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <Route
      {...rest}
      render={matchProps => {
        return (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        );
      }}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  isPrivate: PropTypes.bool,
};

export default RouteWithLayout;
