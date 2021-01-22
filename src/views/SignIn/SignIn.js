import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { TextMaskCPF } from 'components';
import CPFField from 'components/Forms/CPFField';
import { Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Context } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import schema from './schema';
import useStyles from './styles';

const initialValues = {
  cpf: '',
  password: '',
};

const SignIn = props => {
  const { isModal } = props;

  const classes = useStyles();

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
        initialValues={initialValues}
        onSubmit={handleSignIn}
        validateOnMount
        validationSchema={schema}
      >
        {({ values, touched, handleChange, errors }) => (
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
                <CPFField className={classes.textField} label="cpf" name="cpf" />
                <Field
                  as={TextField}
                  className={classes.textField}
                  error={errors.password && touched.password}
                  fullWidth
                  helperText={
                    errors.password && touched.password ? errors.password : null
                  }
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

export default withRouter(SignIn);
