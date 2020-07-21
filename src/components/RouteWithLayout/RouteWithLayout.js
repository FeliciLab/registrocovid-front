import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Context } from '../../context/AuthContext';

const RouteWithLayout = props => {

  const { loading, authenticated } = useContext(Context);

  const { layout: Layout, component: Component, isPrivate = false, ...rest } = props;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return (
      <Redirect to="/sign-in" />
    );
  }

  return (
    <Route {...rest} render={matchProps => {
      return (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )
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
