import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel } from '@material-ui/core';
import { Field, FieldArray } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import randomIndex from 'helpers/randomIndex';

const CheckboxLabel = props => {
  const { classes, label, name, opcoes } = props;

  return (
    <>
      <InputLabel
        className={classes.label}
        htmlFor={name}
      >
        {label}
      </InputLabel>

      <div id="orgaos">
        <FieldArray
          name={name}
          render={() =>
            opcoes.map(opcao => (
              <Field
                component={CheckboxWithLabel}
                key={randomIndex()}
                Label={{ label: opcao.descricao }}
                name={`${name}.${opcao.id}`}
                type={'checkbox'}
              />
            ))
          }
        />
      </div>
    </>
  );
};

CheckboxLabel.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  opcoes: PropTypes.instanceOf(Array),
};

CheckboxLabel.defaultProps = { opcoes: [] };

export default CheckboxLabel;
