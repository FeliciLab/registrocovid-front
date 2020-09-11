import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Context } from '../../context/AuthContext';

import api from '../../services/api';
import Dialog from '@material-ui/core/Dialog';
import SignIn from '../../views/SignIn';

const RouteWithLayout = props => {
  const { authenticated, loading } = useContext(Context);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
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

  setInterval(async () => {

    if (!isUnauthorized) {
      try {
        const user = await api.get('/profile');
        const logged = localStorage.getItem('@RegistroCovid:profile');
        if(user.email != logged.email) history.go('/');
        setIsUnauthorized(false);

        // Close modal
      } catch (error) {
        if(error.status == 401){
          setIsUnauthorized(true);
          // Open modal
        }
      }
    }
  }, 10 * 1000)

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
            <Dialog
              fullScreen
              open={isUnauthorized}
            >
              <SignIn isModal/>
            </Dialog>
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
