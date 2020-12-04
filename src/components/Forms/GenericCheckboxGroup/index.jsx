import React from 'react';
import { InputLabel, Typography } from '@material-ui/core';
import { Field, FieldArray } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import PropTypes from 'prop-types';

const GenericCheckboxGroup = props => {
  const { label, name, opcoes, ...rest } = props;

  return (
    <>
      <InputLabel htmlFor={name}>
        <Typography variant="h4">{label}</Typography>
      </InputLabel>
      <FieldArray
        {...rest}
        name={name}
        render={() =>
          opcoes.map(opcao => (
            <Field
              component={CheckboxWithLabel}
              key={opcao.id}
              Label={{ label: opcao.descricao }}
              name={`${name}.${opcao.id}`}
              type={'checkbox'}
            />
          ))
        }
      />
    </>
  );
};

GenericCheckboxGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  opcoes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      descricao: PropTypes.string.isRequired,
    }),
  ),
};

export default GenericCheckboxGroup;
