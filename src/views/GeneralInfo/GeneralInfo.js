import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useStyles from './styles';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

// Icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// Material-UI Components
import {
  Breadcrumbs,
  Typography,
  Button,
  TextField,
  Link as MuiLink,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Switch,
  Checkbox,
  FormGroup,
} from '@material-ui/core';

import { toast } from 'react-toastify';

import api from 'services/api';
// prontuario -> obrigatório
// data_internacao -> obrigatório
// unidade_primeiro_atendimento
// unidade_de_saude
// data_atendimento
// suporte_respiratorio
// tipo_suport_respiratorio
// reinternacao

// Schema do Yup para validação dos campos.
const schema = Yup.object().shape({
  prontuario: Yup.number()
    .integer('Número de prontuário inválido')
    .required('Campo obrigatório'),
  data_internacao: Yup.date()
    .required('Campo obrigatório'),
  unidade_primeiro_atendimento: Yup.string(),
  unidade_de_saude: Yup.string(),
  data_atendimento: Yup.date(),
  suporte_respiratorio: Yup.boolean(),
  tipo_suport_respiratorio: Yup.array().of(Yup.string()),
  reinternacao: Yup.boolean(),
});

const GeneralInfo = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = async (values) => {
    if (!values.prontuario && !values.data_internacao) {
      toast.warning('Existem campos obrigatórios em branco');
      return;
    }

    const patient = {
      prontuario: values.prontuario,
      data_internacao: values.data_internacao,
    };

    try {
      await api.post('/pacientes', patient);

      toast.success('Dados salvos com sucesso');
      history.push('/categorias');
    } catch (err) {
      if (err.response.data?.prontuario) {
        toast.info('Paciente já cadastrado');
      } else {
        toast.error('Erro ao tentar inserir novo paciente, tente novamente');
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        {/* TODO: vamos ter que realmente colocar isso num component a parte. */}
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={
            <NavigateNextIcon fontSize="small" />
          }
        >
          <MuiLink
            color="inherit"
            component={Link}
            to="/meus-pacientes"
          >
            Meus pacientes
          </MuiLink>
          <MuiLink
            color="inherit"
            component={Link}
            to="/categorias"
          >
            Categorias
          </MuiLink>
          <MuiLink
            color="textPrimary"
            component={Link}
            to="/categorias/informacoes-gerais"
          >
            Informações gerais
          </MuiLink>
        </Breadcrumbs>
      </div>

      <div className={classes.formWrapper}>
        <Formik
          initialValues={{
            prontuario: '',
            data_internacao: '',
            unidade_primeiro_atendimento: '',
            unidade_de_saude: '',
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
              {/* prontuario */}
              <FormGroup className={classes.formGroup}>
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

              {/* data_internacao */}
              <FormGroup className={classes.formGroup}>
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
                  // label="Data de internação"
                  helperText={
                    (errors.data_internacao && touched.data_internacao) ? errors.data_internacao : null
                  }
                  name="data_internacao"
                  onChange={handleChange}
                  type="date"
                  value={values.data_internacao}
                />
              </FormGroup>

              {/* unidade_primeiro_atendimento */}
              <FormGroup className={classes.formGroup}>
                <FormLabel>
                  <Typography variant="h4">Nome do serviço / Unidade de Saúde onde o paciente recebeu o primeiro atendimento</Typography>
                </FormLabel>
                <Field
                  as={RadioGroup}
                  name="unidade_primeiro_atendimento"
                  onChange={handleChange}
                  value={values.unidade_primeiro_atendimento}
                >
                  <FormControlLabel
                    control={<Radio />}
                    label="UPA - Autran Nunes"
                    value="UPA - Autran Nunes"
                  />
                  <FormControlLabel
                    control={<Radio />}
                    label="UPA - Conjunto Ceará"
                    value="UPA - Conjunto Ceará"
                  />
                  <FormControlLabel
                    control={<Radio />}
                    label="Outro:"
                    value="Outro"
                  />
                </Field>
              </FormGroup>

              {/* unidade_de_saude */}
              <FormGroup className={classes.formGroup}>
                <FormLabel>
                  <Typography variant="h4">Nome do serviço / Unidade de Saúde que referenciou o paciente</Typography>
                </FormLabel>
                <Field
                  as={RadioGroup}
                  name="unidade_de_saude"
                  onChange={handleChange}
                  value={values.unidade_de_saude}
                >
                  <FormControlLabel
                    control={<Radio />}
                    label="UPA - Autran Nunes"
                    value="UPA - Autran Nunes"
                  />
                  <FormControlLabel
                    control={<Radio />}
                    label="UPA - Conjunto Ceará"
                    value="UPA - Conjunto Ceará"
                  />
                  <FormControlLabel
                    control={<Radio />}
                    label="Outro:"
                    value="Outro"
                  />
                </Field>
              </FormGroup>

              {/* data_atendimento */}
              <FormGroup className={classes.formGroup}>
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
                  onChange={handleChange}
                  type="date"
                  value={values.data_internacao}
                />
              </FormGroup>

              {/* suporte_respiratorio */}
              <FormGroup className={classes.formGroup}>
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

              {/* reinternacao */}
              <FormGroup className={classes.formGroup}>
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
            </Form>

          )}
        </Formik>
      </div>
    </div>
  );
}

export default GeneralInfo;
