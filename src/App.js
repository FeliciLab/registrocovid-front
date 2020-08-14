import React, { Component } from 'react';
import { Router } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import Routes from './Routes';
import history from './history';

import { AuthProvider } from './context/AuthContext';
import { PatientProvider } from './context/PatientContext';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <PatientProvider>
            <Router history={history}>
              <Routes />
            </Router>
          </PatientProvider>
        </AuthProvider>
      </ThemeProvider>
    );
  }
}
