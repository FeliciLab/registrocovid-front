import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import { Formik, Form, Field } from 'formik';
import CustomBreadcrumbs from 'components/CustomBreadcrumbs';
import { Switch, TextField } from 'formik-material-ui';
import {
  Typography,
  Button,
  FormLabel,
  FormControlLabel,
  FormControl,
  FormGroup,
  Grid,
  MenuItem,
  CircularProgress,
  Card,
} from '@material-ui/core';

import schema from './schema';
import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';
import api from 'services/api';
import formatDate from 'helpers/formatDate';

const loadInitialValues = patient => {
  let initialValues = {
    prontuario: '',
    data_internacao: '',
    unidade_primeiro_atendimento: '',
    unidade_de_saude: '',
    data_atendimento: '',
    suporte_respiratorio: false,
    tipo_suport_respiratorio: '',
    reinternacao: false,
    chegou_traqueostomizado: false,
  };

  if (patient && patient.prontuario) {
    initialValues = {
      prontuario: patient.prontuario,
      data_internacao: patient.data_internacao,
      suporte_respiratorio: patient.suporte_respiratorio || false,
      reinternacao: patient.reinternacao || false,
      unidade_primeiro_atendimento: patient.instituicao_primeiro_atendimento
        ? patient.instituicao_primeiro_atendimento.id
        : '',
      unidade_de_saude: patient.instituicao_referencia
        ? patient.instituicao_referencia.id
        : '',
      data_atendimento: patient.data_atendimento_referencia || '',
      tipo_suport_respiratorio:
        patient.tipo_suporte_respiratorios.length > 0
          ? patient.tipo_suporte_respiratorios[0].id
          : '',
      chegou_traqueostomizado: patient.chegou_traqueostomizado,
    };
  }

  return initialValues;
};

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
    let patient = {
      prontuario: values.prontuario,
      data_internacao: values.data_internacao,
      instituicao_primeiro_atendimento_id: values.unidade_primeiro_atendimento,
      instituicao_refererencia_id: values.unidade_de_saude,
      data_atendimento_referencia: values.data_atendimento,
      suporte_respiratorio: values.suporte_respiratorio,
      reinternacao: values.reinternacao,
      chegou_traqueostomizado: values.chegou_traqueostomizado,
    };

    if (values.suporte_respiratorio) {
      patient = {
        ...patient,
        tipos_suporte_respiratorio: [{ id: values.tipo_suport_respiratorio }],
      };
    }

    try {
      const response = await api.post('/pacientes', patient);

      const responsePatient = {
        id: response.data.paciente.id,
        prontuario: response.data.paciente.prontuario,
        created_at: formatDate(response.data.paciente.created_at),
      };

      const complementaryResponsePatient = {
        ...responsePatient,

        data_internacao: values.data_internacao,
        suporte_respiratorio: values.suporte_respiratorio,
        reinternacao: values.reinternacao,

        instituicao_primeiro_atendimento: {
          id: values.unidade_primeiro_atendimento,
        },
        instituicao_referencia: { id: values.unidade_de_saude },
        data_atendimento_referencia: values.data_atendimento,
        tipo_suporte_respiratorios: [{ id: values.tipo_suport_respiratorio }],
        chegou_traqueostomizado: values.chegou_traqueostomizado,
      };

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

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        {patient.id ? (
          <CustomBreadcrumbs
            links={[
              { label: 'Meus pacientes', route: '/meus-pacientes' },
              { label: 'Categorias', route: '/categorias' },
              {
                label: 'Informações gerais',
                route: '/categorias/informacoes-gerais',
              },
            ]}
          />
        ) : (
          <CustomBreadcrumbs
            links={[
              { label: 'Meus pacientes', route: '/meus-pacientes' },
              {
                label: 'Informações gerais',
                route: '/categorias/informacoes-gerais',
              },
            ]}
          />
        )}
      </div>

      <div className={classes.formWrapper}>
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

              {loading ? (
                <CircularProgress />
              ) : (
                <Grid
                  className={classes.card}
                  component={Card}
                  container
                  item
                  lg={8}
                  spacing={2}
                >
                  {/* prontuario */}
                  <Grid
                    item
                    md={6}
                    sm={12}
                  >
                    <FormGroup>
                      <FormLabel>
                        <Typography variant="h4">
                          Número do prontuário
                        </Typography>
                      </FormLabel>
                      <Field
                        className={classes.textField}
                        component={TextField}
                        label="Número do prontuário"
                        name="prontuario"
                        type="number"
                        variant="outlined"
                      />
                    </FormGroup>
                  </Grid>

                  {/* data_internacao */}
                  <Grid
                    item
                    md={6}
                    sm={12}
                  >
                    <FormGroup>
                      <FormLabel>
                        <Typography variant="h4">Data de internação</Typography>
                      </FormLabel>
                      <Field
                        className={classes.dateField}
                        component={TextField}
                        name="data_internacao"
                        type="date"
                        variant="outlined"
                      />
                    </FormGroup>
                  </Grid>

                  {/* unidade_primeiro_atendimento */}
                  <Grid
                    item
                    xs={12}
                  >
                    <FormGroup>
                      <FormLabel>
                        <Typography variant="h4">
                          Nome do serviço / Unidade de Saúde onde o paciente
                          recebeu o primeiro atendimento
                        </Typography>
                      </FormLabel>
                      <Field
                        className={classes.textField}
                        component={TextField}
                        label="Unidade de Saúde"
                        name="unidade_primeiro_atendimento"
                        select
                        variant="filled"
                      >
                        {instituicoes.map(({ id, nome }) => (
                          <MenuItem
                            key={id}
                            value={id}
                          >
                            {nome}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormGroup>
                  </Grid>

                  {/* unidade_de_saude */}
                  <Grid
                    item
                    xs={12}
                  >
                    <FormGroup>
                      <FormLabel>
                        <Typography variant="h4">
                          Nome do serviço / Unidade de Saúde que referenciou o
                          paciente
                        </Typography>
                      </FormLabel>
                      <Field
                        className={classes.textField}
                        component={TextField}
                        label="Unidade de Saúde"
                        name="unidade_de_saude"
                        select
                        variant="filled"
                      >
                        {instituicoes.map(({ id, nome }) => (
                          <MenuItem
                            key={id}
                            value={id}
                          >
                            {nome}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormGroup>
                  </Grid>

                  {/* data_atendimento */}
                  <Grid
                    item
                    xs={12}
                  >
                    <FormGroup>
                      <FormLabel>
                        <Typography variant="h4">
                          Data do atendimento na unidade que referenciou o
                          paciente
                        </Typography>
                      </FormLabel>
                      <Field
                        className={classes.dateField}
                        component={TextField}
                        name="data_atendimento"
                        type="date"
                        variant="outlined"
                      />
                    </FormGroup>
                  </Grid>

                  {/* suporte_respiratorio */}
                  <Grid
                    item
                    xs={12}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Field
                            color="primary"
                            component={Switch}
                            name="suporte_respiratorio"
                            type="checkbox"
                          />
                        }
                        label={
                          <Typography variant="h4">
                            Paciente chegou com suplementação de oxigênio?
                          </Typography>
                        }
                      />
                      {/* tipo_suport_respiratorio */}
                      <FormControl component="fieldset">
                        <FormLabel component="legend">
                          Em caso afirmativo, qual o suporte respiratório?
                        </FormLabel>
                        <Field
                          className={classes.textField}
                          component={TextField}
                          disabled={!values.suporte_respiratorio}
                          label="Tipo suporte respiratorio"
                          name="tipo_suport_respiratorio"
                          select
                          variant="filled"
                        >
                          {tiposSuporteRespiratorio.map(({ id, nome }) => (
                            <MenuItem
                              key={id}
                              value={id}
                            >
                              {nome}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </FormGroup>
                  </Grid>

                  {/* chegou_traqueostomizado */}
                  <Grid
                    container
                    item
                    xs={12}
                  >
                    <FormControlLabel
                      control={
                        <Field
                          color="primary"
                          component={Switch}
                          name="chegou_traqueostomizado"
                          type="checkbox"
                        />
                      }
                      label={
                        <Typography variant="h4">
                          Paciente chegou traqueostomizado?
                        </Typography>
                      }
                    />
                  </Grid>

                  {/* reinternacao */}
                  <Grid
                    container
                    item
                    xs={12}
                  >
                    <FormControlLabel
                      control={
                        <Field
                          color="primary"
                          component={Switch}
                          name="reinternacao"
                          type="checkbox"
                        />
                      }
                      label={
                        <Typography variant="h4">Reinternação?</Typography>
                      }
                    />
                  </Grid>
                </Grid>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default GeneralInfo;
