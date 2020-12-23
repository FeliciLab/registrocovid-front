import { FormGroup, FormLabel, Typography } from '@material-ui/core';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  formLabel: {
    paddingBottom: theme.spacing(1),
  },
}));

function GenericNumberField(props) {
  const { title, label, name, ...rest } = props;

  const classes = useStyles();

  return (
    <FormGroup>
      {title && (
        <FormLabel className={classes.formLabel}>
          <Typography variant="h4">{title}</Typography>
        </FormLabel>
      )}
      <Field
        component={TextField}
        label={label}
        name={name}
        type="number"
        variant="outlined"
        {...rest}
      />
    </FormGroup>
  );
}

export default GenericNumberField;
