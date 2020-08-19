import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  NotFound as NotFoundView,
  SignIn as SignInView,
  ListPatients as ListPatientsView,
  Categories as CategoriesView,
  GeneralInfo as GeneralInfoView,
} from './views';
import PatientIdentification from 'views/PatientIdentification';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/meus-pacientes"
      />
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
        component={CategoriesView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias"
      />
      <RouteWithLayout
        component={GeneralInfoView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/informacoes-gerais"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
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
