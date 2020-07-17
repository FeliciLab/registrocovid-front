import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import useStyles from './styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field } from 'formik';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';

import { useAuth } from '../../hooks/auth';

// Schema do Yup para validação dos campos.
const schema = Yup.object().shape({
  cpf: Yup.string()
    // eslint-disable-next-line
    // .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Digite um CPF válido (xxx.xxx.xxx-xx).')
    .required('Campo obrigatório'),
  password: Yup.string()
    .required('Campo obrigatório')
});

const SignIn = props => {
  const { history } = props;

  // Contexto do Usuário.
  const { signIn } = useAuth();

  const classes = useStyles();

  const handleBack = () => {
    history.goBack();
  };

  // Essa function está só pomo teste.
  const handleSignIn = (values) => {
    console.log(values);
    const user = {
      cpf: values.cpf,
      password: values.password
    }
    signIn(user);
    history.push('/meus-pacientes');
  };

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.content}
          item
          lg={6}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              {/* <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton> */}
            </div>
            <div className={classes.contentBody}>
              <Formik
                initialValues={{
                  cpf: '',
                  password: ''
                }}
                onSubmit={handleSignIn}
                render={({ values, handleChange, isValid, errors }) => (
                  <Form className={classes.form}>
                    <Typography
                      className={classes.title}
                      variant="h2"
                    >
                      Entrar no sistema
                    </Typography>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      error={errors.email}
                      fullWidth
                      helperText={errors.cpf ? errors.cpf : null}
                      label="cpf"
                      name="cpf"
                      onChange={handleChange}
                      type="text"
                      value={values.cpf}
                      variant="outlined"
                    />
                    <Field
                      as={TextField}
                      className={classes.textField}
                      error={errors.email}
                      fullWidth
                      helperText={errors.password ? errors.password : null}
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={!isValid}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Entrar
                    </Button>
                  </Form>
                )}
                validationSchema={schema}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
