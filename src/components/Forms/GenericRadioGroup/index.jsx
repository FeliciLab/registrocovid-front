import React from 'react';
import {
  FormControlLabel,
  InputLabel,
  Radio,
  Typography,
} from '@material-ui/core';
import { Field } from 'formik';
import { RadioGroup } from 'formik-material-ui';
import PropTypes from 'prop-types';
import randomIndex from 'helpers/randomIndex';

const GenericRadioGroup = props => {
  const { itens, label, name, ...rest } = props;

  return (
    <>
      <InputLabel>
        <Typography variant="h4">{label}</Typography>
      </InputLabel>
      <Field
        component={RadioGroup}
        name={name}
        {...rest}
      >
        {itens.map(item => (
          <FormControlLabel
            control={<Radio />}
            key={randomIndex()}
            label={item.descricao}
            value={String(item.id)}
          />
        ))}
      </Field>
    </>
  );
};

GenericRadioGroup.propTypes = {
  itens: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      descricao: PropTypes.string.isRequired,
    }),
  ),
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default GenericRadioGroup;
