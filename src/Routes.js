import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  SignIn as SignInView,
  ListPatients as ListPatientsView,
} from './views';
import PatientIdentification from 'views/PatientIdentification';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/meus-pacientes" />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={ListPatientsView}
        exact
        isPrivate
        layout={MainLayout}
        path="/meus-pacientes"
      />
      <RouteWithLayout
        component={PatientIdentification}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/identificacao-paciente/:id"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
