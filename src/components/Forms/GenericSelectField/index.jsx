import { FormGroup, FormLabel, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';

const useStyles = makeStyles(theme => ({
  formLabel: {
    paddingBottom: theme.spacing(1),
  },
}));

function GenericSelectField(props) {
  const { title, label, name, children, ...rest } = props;

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
        label={label}
        name={name}
        select
        variant="outlined"
        {...rest}
      >
        {children}
      </Field>
    </FormGroup>
  );
}

export default GenericSelectField;
