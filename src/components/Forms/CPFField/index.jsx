import { FormGroup, FormLabel, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import TextMaskCPF from 'components/TextMaskCPF';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';

const useStyles = makeStyles(theme => ({
  formLabel: {
    paddingBottom: theme.spacing(1),
  },
}));

const CPFField = props => {
  const { label, title, name, ...rest } = props;

  const classes = useStyles();

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
          inputComponent: TextMaskCPF,
        }}
        label={label}
        name={name}
        variant="outlined"
        {...rest}
      />
    </FormGroup>
  );
};

export default CPFField;
