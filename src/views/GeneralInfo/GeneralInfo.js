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
} from '@material-ui/core';

// Schema do Yup para validação dos campos.
const schema = Yup.object().shape({
  cpf: Yup.string()
    .required('Campo obrigatório'),
  password: Yup.string()
    .min(6, 'O campo Password deve ter pelo menos 6 caracteres.')
    .required('Campo obrigatório')
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
            primeiro_atendimento: '',
            unidade_de_saude: '',
            data_atendimento: '',
            suporte_respiratorio: '',
            qual_suport_respiratorio: '',
            reinternacao: ''
          }}
          validateOnMount
          onSubmit={handleSave}
          validationSchema={schema}
        >
          {({ values, touched, handleChange, isValid, errors }) => (
            <>

              <Field
                as={TextField}
                className={classes.textField}
                error={(errors.cpf && touched.cpf)}
                fullWidth
                helperText={
                  (errors.cpf && touched.cpf) ? errors.cpf : null
                }
                label="Número do prontuário"
                name="cpf"
                onChange={handleChange}
                type="text"
                value={values.cpf}
                variant="outlined"
              />

              <Field
                as={TextField}
                className={classes.textField}
                error={(errors.cpf && touched.cpf)}
                fullWidth
                helperText={
                  (errors.cpf && touched.cpf) ? errors.cpf : null
                }
                label="Data de internação"
                defaultValue="2017-05-24"
                name="data_internacao"
                onChange={handleChange}
                type="date"
                value={values.data_internacao}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />

            </>

          )}
        </Formik>
      </div>
    </div>
  );
}

export default GeneralInfo;
