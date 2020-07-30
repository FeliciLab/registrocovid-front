import React, { useState } from 'react';
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
  Snackbar,
  MenuItem,
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const GeneralInfo = () => {
  const history = useHistory();
  const classes = useStyles();

  const [openAlert, setOpenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('teste');
  const [stateAlert, setStateAlert] = useState('success');

  // error, warning, info, success

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const handleSubmit = async (values) => {

    // teste
    setOpenAlert(true);

    if (!values.prontuario && !values.data_internacao) {
      // toast.warning('Existem campos obrigatórios em branco');
      setStateAlert('warning');
      setMessageAlert('Existem campos obrigatórios em branco');
      return;
    }

    const patient = {
      prontuario: values.prontuario,
      data_internacao: values.data_internacao,
    };

    try {
      await api.post('/pacientes', patient);

      // toast.success('Dados salvos com sucesso');
      setStateAlert('success');
      setMessageAlert('Dados salvos com sucesso');
      history.push('/categorias');
    } catch (err) {
      if (err.response.data?.prontuario) {
        // toast.info('Paciente já cadastrado');
        setStateAlert('info');
        setMessageAlert('Paciente já cadastrado');
      } else {
        // toast.error('Erro ao tentar inserir novo paciente, tente novamente');
        setStateAlert('error');
        setMessageAlert('Erro ao tentar inserir novo paciente, tente novamente');
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs links={[
          { label: 'Meus pacientes', route: '/meus-pacientes' },
          { label: 'Categorias', route: '/categorias' },
          { label: 'Informações gerais', route: '/categorias/informacoes-gerais' },
        ]} />
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
          {({ values, touched, handleChange, isValid, errors }) => (
            <Form component={FormControl}>
              <div className={classes.titleWrapper}>
                <Typography variant="h1">Informações Gerais</Typography>

                <Button
                  className={classes.buttonSave}
                  color="secondary"
                  type="submit"
                  variant="contained"
                >
                  Salvar
                </Button>
              </div>

              <Grid container item lg={8} spacing={2}>

                {/* prontuario */}
                <Grid item sm={12} md={6}>
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
                <Grid item sm={12} md={6}>
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
                      label="Data de internação"
                      helperText={
                        (errors.data_internacao && touched.data_internacao) ? errors.data_internacao : null
                      }
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
                      <Typography variant="h4">Nome do serviço / Unidade de Saúde onde o paciente recebeu o primeiro atendimento</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      select
                      name="unidade_primeiro_atendimento"
                      onChange={handleChange}
                      value={values.unidade_primeiro_atendimento}
                      label="Unidade de Saúde"
                      variant="filled"
                    >
                      <MenuItem value={1}>Unidade de Saúde [1]</MenuItem>
                      <MenuItem value={2}>Unidade de Saúde [2]</MenuItem>
                      <MenuItem value={3}>Unidade de Saúde [3]</MenuItem>
                      <MenuItem value={0}>Outro</MenuItem>
                    </Field>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      name="outro_unidade_primeiro_atendimento"
                      onChange={handleChange}
                      label="Outra Unidade de Saúde"
                      type="text"
                      value={values.outro_unidade_primeiro_atendimento}
                      variant="outlined"
                      disabled={!(values.unidade_primeiro_atendimento === 0)}
                    />
                  </FormGroup>
                </Grid>

                {/* unidade_de_saude */}
                <Grid item xs={12}>
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Nome do serviço / Unidade de Saúde que referenciou o paciente</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      select
                      name="unidade_de_saude"
                      onChange={handleChange}
                      value={values.unidade_de_saude}
                      label="Unidade de Saúde"
                      variant="filled"
                    >
                      <MenuItem value={1}>Unidade de Saúde [1]</MenuItem>
                      <MenuItem value={2}>Unidade de Saúde [2]</MenuItem>
                      <MenuItem value={3}>Unidade de Saúde [3]</MenuItem>
                      <MenuItem value={0}>Outro</MenuItem>
                    </Field>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      name="outro_unidade_de_saude"
                      onChange={handleChange}
                      label="Outra Unidade de Saúde"
                      type="text"
                      value={values.outro_unidade_de_saude}
                      variant="outlined"
                      disabled={!(values.unidade_de_saude === 0)}
                    />
                  </FormGroup>
                </Grid>


                {/* data_atendimento */}
                <Grid item xs={12}>
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
                      name="data_internacao"
                      label="Data internação"
                      onChange={handleChange}
                      type="date"
                      value={values.data_internacao}
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

      {/* Avisos */}
      <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={openAlert} severity={stateAlert}>
          <Typography variant="h3">
            {messageAlert}
          </Typography>
        </Alert>
      </Snackbar>
    </div >
  );
}

export default GeneralInfo;
