import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel } from '@material-ui/core';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

const InputNumberLabel = ({ name, label, classes }) => (
  <>
    <InputLabel
      className={classes.label}
      htmlFor={name}
    >
      {label}
    </InputLabel>
    <div>
      <Field
        component={TextField}
        fullWidth
        name={name}
        type={'number'}
      />
    </div>
  </>
);

InputNumberLabel.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default InputNumberLabel;
