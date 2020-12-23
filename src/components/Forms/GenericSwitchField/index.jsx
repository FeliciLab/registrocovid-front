import { FormControlLabel, Typography } from '@material-ui/core';
import { Field } from 'formik';
import { Switch } from 'formik-material-ui';
import React from 'react';

function GenericSwitchField(props) {
  const { label, name, ...rest } = props;

  return (
    <FormControlLabel
      control={
        <Field
          color="primary"
          component={Switch}
          name={name}
          type="checkbox"
          {...rest}
        />
      }
      label={<Typography variant="h4">{label}</Typography>}
    />
  );
}

export default GenericSwitchField;
