import React from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import CustonBreadcrumbs from 'components/CustonBreadcrumbs';

// Material-UI Components
import {
  Typography,
  Button,
  TextField,
  FormLabel,
  FormControlLabel,
  FormControl,
  Switch,
  Checkbox,
  FormGroup,
  Grid,
  MenuItem,
} from '@material-ui/core';

import { useToast } from 'hooks/toast';
import api from 'services/api';

const schema = Yup.object().shape({
  prontuario: Yup.number()
    .integer('Número de prontuário inválido')
    .required('Campo obrigatório'),
  data_internacao: Yup.date()
    .required('Campo obrigatório'),
  unidade_primeiro_atendimento: Yup.string(),
  outro_unidade_primeiro_atendimento: Yup.string(),
  unidade_de_saude: Yup.string(),
  outro_unidade_de_saude: Yup.string(),
  data_atendimento: Yup.date(),
  suporte_respiratorio: Yup.boolean(),
  tipo_suport_respiratorio: Yup.array().of(Yup.string()),
  reinternacao: Yup.boolean(),
});

const unidades_de_saude = [
  { id: 1, nome: 'Hospital Leonardo da Vinci' },
  { id: 2, nome: 'Hospital Geral Dr César Cals' },
  { id: 3, nome: 'Hospital Geral de Fortaleza' },
  { id: 4, nome: 'Hospital de Messejana' },
  { id: 5, nome: 'Hospital Regional Norte' },
  { id: 6, nome: 'Hospital Regional do Sertão Central' },
  { id: 7, nome: 'Hospital São José' },
  { id: 8, nome: 'Hospital Regional do Cariri' },
  { id: 9, nome: 'Hospital Infantil Albert Sabin' },
  { id: 10, nome: 'Hospital Batista' },
];

const GeneralInfo = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = async (values) => {
    if (!values.prontuario && !values.data_internacao) {
      addToast({
        type: 'warning',
        message: 'Existem campos obrigatórios em branco'
      });

      return;
    }

    const patient = {
      prontuario: values.prontuario,
      data_internacao: values.data_internacao,
      instituicao_primeiro_atendimento_id: values.unidade_primeiro_atendimento,
      instituicao_refererencia_id: values.unidade_de_saude,
      data_atendimento_referencia: values.data_atendimento,
      suporte_respiratorio: values.suporte_respiratorio,
      reinternacao: values.reinternacao
    };

    try {
      await api.post('/pacientes', patient);
      console.log(patient);

      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso'
      });

      history.push('/categorias');
    } catch (err) {
      if (err.response.data?.prontuario) {
        addToast({
          type: 'info',
          message: 'Paciente já cadastrado',
        });
      } else {
        addToast({
          type: 'error',
          message: 'Erro ao tentar inserir novo paciente, tente novamente',
        });
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            { label: 'Informações gerais', route: '/categorias/informacoes-gerais' },
          ]}
        />
      </div>

      <div className={classes.formWrapper}>
        <Formik
          initialValues={{
            prontuario: '',
            data_internacao: '',
            unidade_primeiro_atendimento: '',
            outro_unidade_primeiro_atendimento: '',
            unidade_de_saude: '',
            outro_unidade_de_saude: '',
            data_atendimento: '',
            suporte_respiratorio: false,
            tipo_suport_respiratorio: '',
            reinternacao: false
          }}
          onSubmit={handleSubmit}
          validateOnMount
          validationSchema={schema}
        >
          {({ values, touched, handleChange, errors, isSubmitting }) => (
            <Form component={FormControl}>
              <div className={classes.titleWrapper}>
                <Typography variant="h1">Informações Gerais</Typography>

                <Button
                  className={classes.buttonSave}
                  color="secondary"
                  disable={isSubmitting}
                  type="submit"
                  variant="contained"
                >
                  Salvar
                </Button>
              </div>

              <Grid
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
                      <Typography variant="h4">Número do prontuário</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      error={(errors.prontuario && touched.prontuario)}
                      helperText={
                        (errors.prontuario && touched.prontuario) ? errors.prontuario : null
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      as={TextField}
                      className={classes.dateField}
                      error={(errors.data_internacao && touched.data_internacao)}
                      helperText={
                        (errors.data_internacao && touched.data_internacao) ? errors.data_internacao : null
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
                <Grid
                  item
                  xs={12}
                >
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Nome do serviço / Unidade de Saúde onde o paciente recebeu o primeiro atendimento</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      label="Unidade de Saúde"
                      name="unidade_primeiro_atendimento"
                      onChange={handleChange}
                      select
                      value={values.unidade_primeiro_atendimento}
                      variant="filled"
                    >
                      {unidades_de_saude.map(({ id, nome }) => (
                        <MenuItem
                          key={id}
                          value={id}
                        >{nome}</MenuItem>
                      ))}
                      <MenuItem value={0}>Outro</MenuItem>
                    </Field>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      disabled={!(values.unidade_primeiro_atendimento === 0)}
                      label="Outra Unidade de Saúde"
                      name="outro_unidade_primeiro_atendimento"
                      onChange={handleChange}
                      type="text"
                      value={values.outro_unidade_primeiro_atendimento}
                      variant="outlined"
                    />
                  </FormGroup>
                </Grid>

                {/* unidade_de_saude */}
                <Grid
                  item
                  xs={12}
                >
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Nome do serviço / Unidade de Saúde que referenciou o paciente</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      label="Unidade de Saúde"
                      name="unidade_de_saude"
                      onChange={handleChange}
                      select
                      value={values.unidade_de_saude}
                      variant="filled"
                    >
                      {unidades_de_saude.map(({ id, nome }) => (
                        <MenuItem
                          key={id}
                          value={id}
                        >{nome}</MenuItem>
                      ))}
                      <MenuItem value={0}>Outro</MenuItem>
                    </Field>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      disabled={!(values.unidade_de_saude === 0)}
                      label="Outra Unidade de Saúde"
                      name="outro_unidade_de_saude"
                      onChange={handleChange}
                      type="text"
                      value={values.outro_unidade_de_saude}
                      variant="outlined"
                    />
                  </FormGroup>
                </Grid>


                {/* data_atendimento */}
                <Grid
                  item
                  xs={12}
                >
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Data do atendimento na unidade que referenciou o paciente</Typography>
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
                      value={values.data_internacao}
                    />
                  </FormGroup>
                </Grid>

                {/* suporte_respiratorio */}
                <Grid
                  item
                  xs={12}
                >

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
                    <FormControl
                      component="fieldset"
                      disabled={!values.suporte_respiratorio}
                    >
                      <FormLabel component="legend">Em caso afirmativo, qual o suporte respiratório?</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="Máscara de reservatório"
                              onChange={handleChange}
                            />
                          }
                          label="Máscara de reservatório"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="Ventilação invasiva"
                              onChange={handleChange}
                            />
                          }
                          label="Ventilação invasiva"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="Catéter O2"
                              onChange={handleChange}
                            />
                          }
                          label="Catéter O2"
                        />
                      </FormGroup>
                      {/* <FormHelperText>Selecione pelo menos um. (???)</FormHelperText> */}
                    </FormControl>
                  </FormGroup>
                </Grid>

                {/* reinternacao */}
                <Grid
                  item
                  xs={12}
                >
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
                        <Typography variant="h4">
                          Reinternação?
                        </Typography>
                      }
                      name="reinternacao"
                    />
                  </FormGroup>
                </Grid>

              </Grid>

            </Form>

          )}
        </Formik>
      </div>
    </div >
  );
}

export default GeneralInfo;
