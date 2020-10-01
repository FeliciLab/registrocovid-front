import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import useStyles from './styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InfoIcon from '@material-ui/icons/Info';
import { Formik, Form, Field } from 'formik';
import { useUser } from '../../context/UserContext';
import { Context } from '../../context/AuthContext';
import {
  Button,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
} from '@material-ui/core';
import { TextMaskCPF } from 'components';

// Schema do Yup para validação dos campos.
const schema = Yup.object().shape({
  cpf: Yup.string()
    // eslint-disable-next-line
    // .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Digite um CPF válido (xxx.xxx.xxx-xx).')
    .required('Campo obrigatório'),
  password: Yup.string()
    .min(6, 'O campo Password deve ter pelo menos 6 caracteres.')
    .required('Campo obrigatório'),
});

const SignIn = props => {
  // const { history } = props;
  const { isModal } = props;

  const classes = useStyles();

  // Contexto de autenticação.
  const { handleLogin, erroLogin } = useContext(Context);
  const useProfile = useUser();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(showPassword => !showPassword);
  };

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
        initialValues={{
          cpf: '',
          password: '',
        }}
        onSubmit={handleSignIn}
        validateOnMount
        validationSchema={schema}
      >
        {({ values, touched, handleChange, isValid, errors }) => (
          <Form className={classes.form}>
            <div className={classes.contentForm}>
              <div className={classes.divImage}>
                <img
                  alt="Under development"
                  // style={{ height: 500 }}
                  className={classes.image}
                  src="/images/logo.svg"
                />
              </div>

              <div className={classes.viewForm}>
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Entrar no sistema
                </Typography>
                <Field
                  InputProps={{
                    inputComponent: TextMaskCPF,
                  }}
                  as={TextField}
                  className={classes.textField}
                  error={errors.cpf && touched.cpf}
                  fullWidth
                  helperText={errors.cpf && touched.cpf ? errors.cpf : null}
                  label="cpf"
                  name="cpf"
                  onChange={handleChange}
                  type="text"
                  value={values.cpf}
                  variant="outlined"
                />
                <Field
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Mudar a visibilidade da senha"
                          edge="end"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  as={TextField}
                  className={classes.textField}
                  error={errors.password && touched.password}
                  fullWidth
                  helperText={
                    errors.password && touched.password ? errors.password : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  variant="outlined"
                />
                <div className={classes.signInButtonWrapper}>
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    disabled={!touched.cpf}
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

SignIn.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignIn);
