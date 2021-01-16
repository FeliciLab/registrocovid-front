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
  SpecificsTests as SpecificsTestsView,
  PersonalHistory as PersonalHistoryView,
  ComplicationsVM as ComplicationsVMView,
  Complications as ComplicationsView,
  InitialSymptoms as InitialSymptomsView,
  Comorbidities as ComorbiditiesView,
  Hemodialise as HemodialiseView,
  ComplementaryTests as ComplementaryTestsView,
  Outcome as OutcomeView,
  RelatedInfections as RelatedInfectionsView,
  DailyEvolutionList as DailyEvolutionListView,
  DailyEvolution as DailyEvolutionView,
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
        component={SpecificsTestsView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/exames-especificos/:id"
      />
      <RouteWithLayout
        component={SpecificsTestsView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/exames-especificos/"
      />
      <RouteWithLayout
        component={PersonalHistoryView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/historia-pessoal"
      />
      <RouteWithLayout
        component={ComplicationsView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/complicacoes"
      />
      <RouteWithLayout
        component={ComplicationsVMView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/complicacoes-vm"
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
        component={HemodialiseView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/hemodialise/"
      />
      <RouteWithLayout
        component={ComplementaryTestsView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/exames-complementares/"
      />
      <RouteWithLayout
        component={OutcomeView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/desfecho/"
      />
      <RouteWithLayout
        component={RelatedInfectionsView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/iras/"
      />
      <RouteWithLayout
        component={DailyEvolutionListView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/evolucao-diaria-list/"
      />
      <RouteWithLayout
        component={DailyEvolutionView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/evolucao-diaria/"
      />
      <RouteWithLayout
        component={DailyEvolutionView}
        exact
        isPrivate
        layout={MainLayout}
        path="/categorias/evolucao-diaria/:id"
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
