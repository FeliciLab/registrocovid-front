import {
  FormGroup,
  FormLabel,
  IconButton,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useState } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
  formLabel: {
    paddingBottom: theme.spacing(1),
  },
}));

const PasswordField = props => {
  const { label, title, name, ...rest } = props;

  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(showPassword => !showPassword);
  };

  return (
    <FormGroup>
      {title && (
        <FormLabel className={classes.formLabel}>
          <Typography variant="h4">{title}</Typography>
        </FormLabel>
      )}
      <Field
        className={classes.field}
        component={TextField}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Mudar a visibilidade da senha"
                edge="end"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        label={label}
        name={name}
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        {...rest}
      />
    </FormGroup>
  );
};

export default PasswordField;
