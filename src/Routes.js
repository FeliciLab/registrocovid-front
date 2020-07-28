import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  // Dashboard as DashboardView,
  // ProductList as ProductListView,
  // UserList as UserListView,
  // Typography as TypographyView,
  // Icons as IconsView,
  // Account as AccountView,
  // Settings as SettingsView,
  // SignUp as SignUpView,
  SignIn as SignInView,
  // NotFound as NotFoundView,
  ListPatients as ListPatientsView,
  GeneralInfo as GeneralInfoView,
} from './views';

const Routes = () => {
  return (

    <Switch>
      <Redirect
        exact
        from="/"
        to="/meus-pacientes"
      />
      {/*
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
      component={NotFoundView}
      exact
      layout={MinimalLayout}
      path="/not-found"
    />
  */}
      <RouteWithLayout
        component={GeneralInfoView}
        exact
        layout={MainLayout}
        path="/categorias/informacoes-gerais"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout isPrivate
        component={ListPatientsView}
        exact
        layout={MainLayout}
        path="/meus-pacientes"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
