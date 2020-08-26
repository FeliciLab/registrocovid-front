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
  PersonalHistory as PersonalHistoryView,
  PhysicalExam as PhysicalExamView,
  InitialSymptoms as InitialSymptomsView,
  Comorbidities as ComorbiditiesView,
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
        component={PersonalHistoryView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/historia-pessoal"
      />
      <RouteWithLayout
        component={PhysicalExamView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/exame-fisico"
      />
      <RouteWithLayout
        component={PhysicalExamView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/exame-fisico/:examId"
      />
      <RouteWithLayout
        component={InitialSymptomsView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/sintomas-iniciais"
      />
      <RouteWithLayout
        component={ComorbiditiesView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/comorbidades"
      />
      <RouteWithLayout
        component={PatientIdentification}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/identificacao-paciente"
      />
      <RouteWithLayout
        component={PatientIdentification}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/identificacao-paciente/:id"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
