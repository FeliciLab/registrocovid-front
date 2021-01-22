import { Button, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import CPFField from 'components/Forms/CPFField';
import PasswordField from 'components/Forms/PasswordField';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Context } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import schema from './schema';
import useStyles from './styles';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const initialValues = {
  cpf: '',
  password: '',
};

const SignIn = props => {
  const { isModal } = props;

  const classes = useStyles();

  const { handleLogin, erroLogin } = useContext(Context);

  const useProfile = useUser();

  const handleSignIn = async values => {
    const user = {
      cpf: values.cpf,
      password: values.password,
    };
    // sanitizando o cpf
    user.cpf = user.cpf.split('.').join('');
    user.cpf = user.cpf.split('-').join('');

    if (isModal) user.isModal = true;
    handleLogin(user).then(() => {
      useProfile.mountProfile();
    });
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSignIn}
        validateOnMount
        validationSchema={schema}
      >
        {({ isValid }) => (
          <Form className={classes.form}>
            <div className={classes.contentForm}>
              <div className={classes.divImage}>
                <img
                  alt="Under development"
                  className={classes.image}
                  src="/images/logo.svg"
                />
              </div>
              <div className={classes.viewForm}>
                <Typography className={classes.title} variant="h2">
                  Entrar no sistema
                </Typography>
                <CPFField
                  className={classes.textField}
                  label="cpf"
                  name="cpf"
                />
                <PasswordField
                  className={classes.textField}
                  label="Password"
                  name="password"
                />
                <div className={classes.signInButtonWrapper}>
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    disabled={!isValid}
                    endIcon={<ArrowForwardIcon />}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Entrar
                  </Button>

                  {erroLogin && (
                    <div className={classes.errorLoginMessage}>
                      <InfoIcon />
                      <Typography
                        className={classes.errorLoginMessageLabel}
                        variant="caption"
                      >
                        Usuário ou senha incorretos, tente novamente.
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withRouter(SignIn);
