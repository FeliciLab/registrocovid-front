import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import { Formik, Form } from 'formik';
import CustomBreadcrumbs from 'components/CustomBreadcrumbs';
import {
  Typography,
  Button,
  FormControl,
  Grid,
  MenuItem,
  CircularProgress,
  Card,
} from '@material-ui/core';

import schema from './schema';
import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';
import api from 'services/api';
import {
  loadInitialValues,
  postGeneralInfo,
} from 'models/generalInfo/GeneralInfoService';
import GenericNumberField from 'components/Forms/GenericNumberField';
import GenericDateField from 'components/Forms/GenericDateField';
import GenericSelectField from 'components/Forms/GenericSelectField';
import GenericSwitchField from 'components/Forms/GenericSwitchField';
import Gasometria from './components/Gasometria';

const GeneralInfo = () => {
  const { addToast } = useToast();

  const { patient, addPatient } = usePatient();

  const history = useHistory();
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [instituicoes, setInstituicoes] = useState([]);
  const [tiposSuporteRespiratorio, setTiposSuporteRespiratorio] = useState([]);

  const handleInfos = useCallback(async () => {
    try {
      setLoading(true);

      const responseInstituicoes = await api.get('/instituicoes');
      setInstituicoes(responseInstituicoes.data);

      const responseSuportesRespiratorio = await api.get(
        '/suportes-respiratorios',
      );
      setTiposSuporteRespiratorio(
        responseSuportesRespiratorio.data.filter(tipo =>
          [1, 2, 3, 4, 7].some(id => id === tipo.id),
        ),
      );
    } catch (error) {
      addToast({
        type: 'error',
        message: 'Erro ao tentar carregar informações, tente novamente',
      });

      history.goBack();
    } finally {
      setLoading(false);
    }
  }, [addToast, history]);

  const handleSubmit = async values => {
    try {
      const complementaryResponsePatient = await postGeneralInfo(values);
      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso',
      });
      addPatient(complementaryResponsePatient);
      history.push('/categorias');
    } catch (err) {
      if (err.response.data.message === 'The given data was invalid.') {
        addToast({
          type: 'info',
          message: `Número de prontuário ${values.prontuario} já está cadastrado`,
        });
      } else {
        addToast({
          type: 'error',
          message: 'Erro ao tentar inserir novo paciente, tente novamente',
        });
      }
    }
  };

  useEffect(() => {
    handleInfos();
  }, [handleInfos]);

  const links = patient.id
    ? [
      { label: 'Meus pacientes', route: '/meus-pacientes' },
      { label: 'Categorias', route: '/categorias' },
      {
        label: 'Informações gerais',
        route: '/categorias/informacoes-gerais',
      },
    ]
    : [
      { label: 'Meus pacientes', route: '/meus-pacientes' },
      {
        label: 'Informações gerais',
        route: '/categorias/informacoes-gerais',
      },
    ];

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustomBreadcrumbs links={links} />
      </div>
      <div className={classes.formWrapper}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Formik
            initialValues={loadInitialValues(patient)}
            onSubmit={handleSubmit}
            validateOnMount
            validationSchema={schema}
          >
            {({ values, isSubmitting }) => (
              <Form component={FormControl}>
                <div className={classes.titleWrapper}>
                  <Typography variant="h1">Informações Gerais</Typography>

                  <Button
                    className={classes.buttonSave}
                    color="secondary"
                    disabled={!!patient.prontuario || isSubmitting}
                    type="submit"
                    variant="contained"
                  >
                    Salvar
                  </Button>
                </div>
                <Grid
                  className={classes.card}
                  component={Card}
                  container
                  item
                  lg={8}
                  spacing={2}
                >
                  <Grid
                    item
                    md={6}
                    sm={12}
                  >
                    <GenericNumberField
                      label="Número do prontuário"
                      name="prontuario"
                      title="Número do prontuário"
                    />
                  </Grid>

                  <Grid
                    item
                    md={6}
                    sm={12}
                  >
                    <GenericDateField
                      label="Data de internação"
                      name="data_internacao"
                      title="Data de internação"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <GenericSelectField
                      label="Unidade de Saúde"
                      name="unidade_primeiro_atendimento"
                      title="Nome do serviço / Unidade de Saúde onde o paciente
                      recebeu o primeiro atendimento"
                    >
                      {instituicoes.map(({ id, nome }) => (
                        <MenuItem
                          key={id}
                          value={id}
                        >
                          {nome}
                        </MenuItem>
                      ))}
                    </GenericSelectField>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <GenericSelectField
                      label="Unidade de Saúde"
                      name="unidade_de_saude"
                      title="Nome do serviço / Unidade de Saúde que referenciou o
                      paciente"
                    >
                      {instituicoes.map(({ id, nome }) => (
                        <MenuItem
                          key={id}
                          value={id}
                        >
                          {nome}
                        </MenuItem>
                      ))}
                    </GenericSelectField>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <GenericDateField
                      name="data_atendimento"
                      title="Data do atendimento na unidade que referenciou o
                      paciente"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <GenericSwitchField
                      label="Paciente chegou com suplementação de oxigênio?"
                      name="suporte_respiratorio"
                    />
                    <GenericSelectField
                      disabled={!values.suporte_respiratorio}
                      label="Tipo suporte respiratorio"
                      name="tipo_suport_respiratorio"
                      title="Em caso afirmativo, qual o suporte respiratório?"
                    >
                      {tiposSuporteRespiratorio.map(({ id, nome }) => (
                        <MenuItem
                          key={id}
                          value={id}
                        >
                          {nome}
                        </MenuItem>
                      ))}
                    </GenericSelectField>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                  >
                    <GenericNumberField
                      disabled={!values.suporte_respiratorio}
                      name="fluxo_o2"
                      title="Fluxo O2"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                  >
                    <GenericNumberField
                      disabled={!values.suporte_respiratorio}
                      name="fio2"
                      title="FiO2"
                    />
                  </Grid>
                  <Gasometria />
                  <Grid
                    item
                    xs={12}
                  >
                    <GenericNumberField
                      endAdornment="mL/24h"
                      name="debito_urinario"
                      title="Débito urinário nas primeiras 24 horas da internação hospitalar"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <GenericSwitchField
                      label="Paciente chegou traqueostomizado?"
                      name="chegou_traqueostomizado"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <GenericSwitchField
                      label="Reinternação?"
                      name="reinternacao"
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default GeneralInfo;
