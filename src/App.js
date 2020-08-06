import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { ToastProvider } from 'hooks/toast';

import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import Routes from './Routes';
import history from './history';

import { AuthProvider } from './context/AuthContext';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ToastProvider>
            <Router history={history}>
              <Routes />
            </Router>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    );
  }
}
