import React, { useContext, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Context } from '../../context/AuthContext';

import useStyles from './styles';

import api from '../../services/api';
import { Dialog, DialogTitle } from '@material-ui/core';
import SignIn from '../../views/SignIn';

const RouteWithLayout = props => {
  const { authenticated, loading, setErroLogin, erroLogin } = useContext(
    Context,
  );
  const history = useHistory();
  const classes = useStyles();

  const {
    layout: Layout,
    component: Component,
    isPrivate = false,
    ...rest
  } = props;

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!erroLogin && history.location.pathname !== '/sign-in') {
        try {
          await api.get('/profile');
        } catch (error) {
          if (error.response?.status == 401) {
            setErroLogin(true);
          }
        }
      }
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [erroLogin]);

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
              classes={{ paper: classes.paper }}
              fullScreen
              open={erroLogin}
            >
              <DialogTitle>
                Sua sessão expirou. Por favor, faça o login para continuar.
              </DialogTitle>
              <SignIn isModal />
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
