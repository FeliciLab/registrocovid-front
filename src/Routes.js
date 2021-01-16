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
import paths from 'paths';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to={paths.MEUS_PACIENTES} />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path={paths.SIGN_IN}
      />
      <RouteWithLayout
        component={ListPatientsView}
        exact
        isPrivate
        layout={MainLayout}
        path={paths.MEUS_PACIENTES}
      />
      <RouteWithLayout
        component={CategoriesView}
        exact
        isPrivate
        layout={MainLayout}
        path={paths.CATEGORIAS}
      />
      <RouteWithLayout
        component={GeneralInfoView}
        exact
        isPrivate
        layout={MainLayout}
        path={paths.CATEGORIA_INFORMACOES_GERAIS}
      />
      <RouteWithLayout
        component={SpecificsTestsView}
        exact
        isPrivate
        layout={MainLayout}
        path={paths.CATEGORIA_EXAMES_ESPECIFICOS}
      />
      <RouteWithLayout
        component={SpecificsTestsView}
        exact
        isPrivate
        layout={MainLayout}
        path={`${paths.CATEGORIA_EXAMES_ESPECIFICOS}/:id`}
      />
      <RouteWithLayout
        component={PersonalHistoryView}
        exact
        isPrivate
        layout={MainLayout}
        path={paths.CATEGORIA_HISTORIA_PESSOAL}
      />
      <RouteWithLayout
        component={ComplicationsView}
        exact
        isPrivate
        layout={MainLayout}
        path={paths.CATEGORIA_COMPLICACOES}
      />
      <RouteWithLayout
        component={ComplicationsVMView}
        exact
        isPrivate
        layout={MainLayout}
        path={paths.CATEGORIA_COMPLICACOES_VM}
      />
      <RouteWithLayout
        component={InitialSymptomsView}
        exact
        isPrivate
        layout={MainLayout}
        path={paths.CATEGORIA_SINTOMAS_INICIAIS}
      />
      <RouteWithLayout
        component={ComorbiditiesView}
        exact
        isPrivate
        layout={MainLayout}
        path={paths.CATEGORIA_COMORBIDADES}
      />
      <RouteWithLayout
        component={PatientIdentification}
        exact
        isPrivate
        layout={MainLayout}
        path={paths.CATEGORIA_IDENTIFICACAO_PACIENTE}
      />
      <RouteWithLayout
        component={PatientIdentification}
        exact
        isPrivate
        layout={MainLayout}
        path={`${paths.CATEGORIA_IDENTIFICACAO_PACIENTE}/:id`}
      />
      <RouteWithLayout
        component={HemodialiseView}
        exact
        isPrivate
        layout={MainLayout}
        path={paths.CATEGORIA_HEMODIALISE}
      />
      <RouteWithLayout
        component={ComplementaryTestsView}
        exact
        isPrivate
        layout={MainLayout}
        path={paths.CATEGORIA_EXAMES_COMPLEMENTARES}
      />
      <RouteWithLayout
        component={OutcomeView}
        exact
        isPrivate
        layout={MainLayout}
        path={paths.CATEGORIA_DESFECHO}
      />
      <RouteWithLayout
        component={RelatedInfectionsView}
        exact
        isPrivate
        layout={MainLayout}
        path={paths.CATEGORIA_IRAS}
      />
      <RouteWithLayout
        component={DailyEvolutionListView}
        exact
        isPrivate
        layout={MainLayout}
        path={paths.CATEGORIA_EVOLUCAO_DIARIA_LIST}
      />
      <RouteWithLayout
        component={DailyEvolutionView}
        exact
        isPrivate
        layout={MainLayout}
        path={paths.CATEGORIA_EVOLUCAO_DIARIA}
      />
      <RouteWithLayout
        component={DailyEvolutionView}
        exact
        isPrivate
        layout={MainLayout}
        path={`${paths.CATEGORIA_EVOLUCAO_DIARIA}/:id`}
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path={paths.NOT_FOUND}
      />
      <Redirect to={paths.NOT_FOUND} />
    </Switch>
  );
};

export default Routes;
