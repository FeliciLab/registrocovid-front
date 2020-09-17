import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import CustomBreadcrumbs from 'components/CustomBreadcrumbs';

// Material-UI Components
import {
  Typography,
  Button,
  TextField,
  FormLabel,
  FormControlLabel,
  FormControl,
  Switch,
  FormGroup,
  Grid,
  MenuItem,
  CircularProgress,
  Card,
} from '@material-ui/core';

import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';
import api from 'services/api';
import formatDate from 'helpers/formatDate';

const schema = Yup.object().shape({
  prontuario: Yup.number()
    .integer('Número de prontuário inválido (apenas números inteiros)')
    .min(1, 'Número de prontuário deve ser maior que 0 (zero)')
    .required('Campo obrigatório'),
  data_internacao: Yup.date().required('Campo obrigatório'),
  unidade_primeiro_atendimento: Yup.string(),
  unidade_de_saude: Yup.string(),
  data_atendimento: Yup.date(),
  suporte_respiratorio: Yup.boolean(),
  tipo_suport_respiratorio: Yup.string(),
  reinternacao: Yup.boolean(),
});

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
      setTiposSuporteRespiratorio(responseSuportesRespiratorio.data);
    } catch {
      addToast({
        type: 'error',
        message: 'Erro ao tentar carregar informações, tente novamente',
      });

      history.goBack();
    } finally {
      setLoading(false);
    }
  }, [addToast, history]);

  useEffect(() => {
    handleInfos();
  }, [handleInfos]);

  const handleSubmit = async values => {
    if (!values.prontuario && !values.data_internacao) {
      addToast({
        type: 'warning',
        message: 'Existem campos obrigatórios em branco',
      });
      return;
    }

    let patient = {
      prontuario: values.prontuario,
      data_internacao: values.data_internacao,
      instituicao_primeiro_atendimento_id: values.unidade_primeiro_atendimento,
      instituicao_refererencia_id: values.unidade_de_saude,
      data_atendimento_referencia: values.data_atendimento,
      suporte_respiratorio: values.suporte_respiratorio,
      reinternacao: values.reinternacao,
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

        instituicao_primeiro_atendimento: { id: values.unidade_primeiro_atendimento },
        instituicao_referencia: { id: values.unidade_de_saude },
        data_atendimento_referencia: values.data_atendimento,
        tipo_suporte_respiratorios: [{ id: values.tipo_suport_respiratorio }],
      }

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

  const loadInitialValues = () => {
    let initialValues = {
      prontuario: '',
      data_internacao: '',
      unidade_primeiro_atendimento: '',
      unidade_de_saude: '',
      data_atendimento: '',
      suporte_respiratorio: false,
      tipo_suport_respiratorio: '',
      reinternacao: false,
    };

    if (patient && patient.prontuario) {
      initialValues = {
        prontuario: patient.prontuario,
        data_internacao: patient.data_internacao,
        suporte_respiratorio: patient.suporte_respiratorio || false,
        reinternacao: patient.reinternacao || false,

        unidade_primeiro_atendimento: patient.instituicao_primeiro_atendimento ? patient.instituicao_primeiro_atendimento.id : '',
        unidade_de_saude: patient.instituicao_referencia ? patient.instituicao_referencia.id : '',
        data_atendimento: patient.data_atendimento_referencia || '',
        tipo_suport_respiratorio: patient.tipo_suporte_respiratorios.length > 0 ? patient.tipo_suporte_respiratorios[0].id : '',
      }
    }

    return initialValues;
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
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
      </div>

      <div className={classes.formWrapper}>
        <Formik
          initialValues={loadInitialValues()}
          onSubmit={handleSubmit}
          validateOnMount
          validationSchema={schema}>
          {({ values, touched, handleChange, errors, isSubmitting }) => (
            <Form component={FormControl}>
              <div className={classes.titleWrapper}>
                <Typography variant="h1">Informações Gerais</Typography>

                <Button
                  className={classes.buttonSave}
                  color="secondary"
                  disabled={!!patient.prontuario || isSubmitting}
                  type="submit"
                  variant="contained">
                  Salvar
                </Button>
              </div>

              {loading ? (
                <CircularProgress />
              ) : (
                <Grid component={Card} container item lg={8} spacing={2}>
                  {/* prontuario */}
                  <Grid item md={6} sm={12}>
                    <FormGroup>
                      <FormLabel>
                        <Typography variant="h4">
                          Número do prontuário
                        </Typography>
                      </FormLabel>
                      <Field
                        as={TextField}
                        className={classes.textField}
                        error={errors.prontuario && touched.prontuario}
                        helperText={
                          errors.prontuario && touched.prontuario
                            ? errors.prontuario
                            : null
                        }
                        label="Número do prontuário"
                        name="prontuario"
                        onChange={handleChange}
                        type="number"
                        value={values.prontuario}
                        variant="outlined"
                      />
                    </FormGroup>
                  </Grid>

                  {/* data_internacao */}
                  <Grid item md={6} sm={12}>
                    <FormGroup>
                      <FormLabel>
                        <Typography variant="h4">Data de internação</Typography>
                      </FormLabel>
                      <Field
                        InputLabelProps={{
                          shrink: true,
                        }}
                        as={TextField}
                        className={classes.dateField}
                        error={
                          errors.data_internacao && touched.data_internacao
                        }
                        helperText={
                          errors.data_internacao && touched.data_internacao
                            ? errors.data_internacao
                            : null
                        }
                        label="Data de internação"
                        name="data_internacao"
                        onChange={handleChange}
                        type="date"
                        value={values.data_internacao}
                      />
                    </FormGroup>
                  </Grid>

                  {/* unidade_primeiro_atendimento */}
                  <Grid item xs={12}>
                    <FormGroup>
                      <FormLabel>
                        <Typography variant="h4">
                          Nome do serviço / Unidade de Saúde onde o paciente
                          recebeu o primeiro atendimento
                        </Typography>
                      </FormLabel>
                      <Field
                        as={TextField}
                        className={classes.textField}
                        label="Unidade de Saúde"
                        name="unidade_primeiro_atendimento"
                        onChange={handleChange}
                        select
                        value={values.unidade_primeiro_atendimento}
                        variant="filled">
                        {instituicoes.map(({ id, nome }) => (
                          <MenuItem key={id} value={id}>
                            {nome}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormGroup>
                  </Grid>

                  {/* unidade_de_saude */}
                  <Grid item xs={12}>
                    <FormGroup>
                      <FormLabel>
                        <Typography variant="h4">
                          Nome do serviço / Unidade de Saúde que referenciou o
                          paciente
                        </Typography>
                      </FormLabel>
                      <Field
                        as={TextField}
                        className={classes.textField}
                        label="Unidade de Saúde"
                        name="unidade_de_saude"
                        onChange={handleChange}
                        select
                        value={values.unidade_de_saude}
                        variant="filled">
                        {instituicoes.map(({ id, nome }) => (
                          <MenuItem key={id} value={id}>
                            {nome}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormGroup>
                  </Grid>

                  {/* data_atendimento */}
                  <Grid item xs={12}>
                    <FormGroup>
                      <FormLabel>
                        <Typography variant="h4">
                          Data do atendimento na unidade que referenciou o
                          paciente
                        </Typography>
                      </FormLabel>
                      <Field
                        InputLabelProps={{
                          shrink: true,
                        }}
                        as={TextField}
                        className={classes.dateField}
                        label="Data Atendimento"
                        name="data_atendimento"
                        onChange={handleChange}
                        type="date"
                        value={values.data_atendimento}
                      />
                    </FormGroup>
                  </Grid>

                  {/* suporte_respiratorio */}
                  <Grid item xs={12}>
                    <FormGroup>
                      <Field
                        as={FormControlLabel}
                        control={
                          <Switch
                            checked={values.suporte_respiratorio}
                            color="primary"
                            name="suporte_respiratorio"
                            onChange={handleChange}
                          />
                        }
                        label={
                          <Typography variant="h4">
                            Paciente chegou com suporte respiratório?
                          </Typography>
                        }
                        name="suporte_respiratorio"
                      />
                      {/* tipo_suport_respiratorio */}
                      <FormControl component="fieldset">
                        <FormLabel component="legend">
                          Em caso afirmativo, qual o suporte respiratório?
                        </FormLabel>
                        <Field
                          as={TextField}
                          className={classes.textField}
                          disabled={!values.suporte_respiratorio}
                          label="Tipo suporte respiratorio"
                          name="tipo_suport_respiratorio"
                          onChange={handleChange}
                          select
                          value={values.tipo_suport_respiratorio}
                          variant="filled">
                          {tiposSuporteRespiratorio.map(({ id, nome }) => (
                            <MenuItem key={id} value={id}>
                              {nome}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </FormGroup>
                  </Grid>

                  {/* reinternacao */}
                  <Grid item xs={12}>
                    <FormGroup>
                      <Field
                        as={FormControlLabel}
                        control={
                          <Switch
                            checked={values.reinternacao}
                            color="primary"
                            name="reinternacao"
                            onChange={handleChange}
                          />
                        }
                        label={
                          <Typography variant="h4">Reinternação?</Typography>
                        }
                        name="reinternacao"
                      />
                    </FormGroup>
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
