import React from 'react';
import { Link } from 'react-router-dom';
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
  FormHelperText,
} from '@material-ui/core';

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
  prontuario: Yup.string()
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

  const classes = useStyles();

  const handleSave = async (values) => {
    // TODO: implementar a action do button save aqui.
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
            to="/meus-pacientes/categorias"
          >
            Categorias
          </MuiLink>
          <MuiLink
            color="textPrimary"
            component={Link}
            to="/meus-pacientes/categorias"
          >
            Informações gerais
          </MuiLink>

        </Breadcrumbs>
        <div className={classes.titleWrapper}>
          <Typography variant="h1">Informações Gerias</Typography>
          <Button
            className={classes.buttonSave}
            color="secondary"
            variant="contained"
          >
            Salvar
          </Button>
        </div>
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
          validateOnMount
          onSubmit={handleSave}
          validationSchema={schema}
        >
          {({ values, touched, handleChange, isValid, errors }) => (
            <Form component={FormControl}>
              {/* prontuario */}
              <FormGroup className={classes.formGroup}>
                <FormLabel>
                  <Typography variant="h4">Número do prontuário</Typography>
                </FormLabel>
                <Field className={classes.textField}
                  as={TextField}
                  error={(errors.prontuario && touched.prontuario)}
                  helperText={
                    (errors.prontuario && touched.prontuario) ? errors.prontuario : null
                  }
                  label="Número do prontuário"
                  name="prontuario"
                  onChange={handleChange}
                  type="text"
                  value={values.prontuario}
                  variant="outlined"
                />
              </FormGroup>

              {/* data_internacao */}
              <FormGroup className={classes.formGroup}>
                <FormLabel>
                  <Typography variant="h4">Data de internação</Typography>
                </FormLabel>
                <Field className={classes.dateField}
                  as={TextField}
                  error={(errors.data_internacao && touched.data_internacao)}
                  helperText={
                    (errors.data_internacao && touched.data_internacao) ? errors.data_internacao : null
                  }
                  // label="Data de internação"
                  name="data_internacao"
                  onChange={handleChange}
                  type="date"
                  value={values.data_internacao}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  <FormControlLabel value="UPA - Autran Nunes" control={<Radio />} label="UPA - Autran Nunes" />
                  <FormControlLabel value="UPA - Conjunto Ceará" control={<Radio />} label="UPA - Conjunto Ceará" />
                  <FormControlLabel value="Outro" control={<Radio />} label="Outro:" />
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
                  <FormControlLabel value="UPA - Autran Nunes" control={<Radio />} label="UPA - Autran Nunes" />
                  <FormControlLabel value="UPA - Conjunto Ceará" control={<Radio />} label="UPA - Conjunto Ceará" />
                  <FormControlLabel value="Outro" control={<Radio />} label="Outro:" />
                </Field>
              </FormGroup>

              {/* data_atendimento */}
              <FormGroup className={classes.formGroup}>
                <FormLabel>
                  <Typography variant="h4">Data do atendimento na unidade que referenciou o paciente</Typography>
                </FormLabel>
                <Field className={classes.dateField}
                  as={TextField}
                  name="data_internacao"
                  onChange={handleChange}
                  type="date"
                  value={values.data_internacao}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormGroup>

              {/* suporte_respiratorio */}
              <FormGroup className={classes.formGroup}>
                <Field
                  as={FormControlLabel}
                  name="suporte_respiratorio"
                  label={
                    <Typography variant="h4">
                      Paciente chegou com suporte respiratório?
                    </Typography>
                  }
                  control={
                    <Switch
                      checked={values.suporte_respiratorio}
                      onChange={handleChange}
                      name="suporte_respiratorio"
                      color="primary"
                    />
                  }
                />
                {/* tipo_suport_respiratorio */}
                <FormControl component="fieldset"
                  disabled={!values.suporte_respiratorio}
                >
                  <FormLabel component="legend">Em caso afirmativo, qual o suporte respiratório?</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox onChange={handleChange} name="Máscara de reservatório" />
                      }
                      label="Máscara de reservatório"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox onChange={handleChange} name="Ventilação invasiva" />
                      }
                      label="Ventilação invasiva"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox onChange={handleChange} name="Catéter O2" />
                      }
                      label="Catéter O2"
                    />
                  </FormGroup>
                  <FormHelperText>Selecione pelo menos um. (???)</FormHelperText>
                </FormControl>
              </FormGroup>

              {/* reinternacao */}
              <FormGroup className={classes.formGroup}>
                <Field
                  as={FormControlLabel}
                  name="reinternacao"
                  label={
                    <Typography variant="h4">
                      Reinternação?
                  </Typography>
                  }
                  control={
                    <Switch
                      checked={values.reinternacao}
                      onChange={handleChange}
                      name="reinternacao"
                      color="primary"
                    />
                  }
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
