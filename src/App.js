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
import { PatientProvider } from './context/PatientContext';

import { ComorbidadeProvider } from './context/ComorbidadesContext';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ToastProvider>
            <PatientProvider>
              <ComorbidadeProvider>
                <Router history={history}>
                  <Routes />
                </Router>
              </ComorbidadeProvider>
            </PatientProvider>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    );
  }
}
