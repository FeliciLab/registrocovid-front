import { FormGroup, FormLabel, Typography } from '@material-ui/core';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';

function GenericNumberField(props) {
  const { label, name, ...rest } = props;

  return (
    <FormGroup>
      <FormLabel>
        <Typography variant="h4">Número do prontuário</Typography>
      </FormLabel>
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
