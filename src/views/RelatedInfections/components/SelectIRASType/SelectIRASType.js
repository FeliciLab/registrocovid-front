import React, { memo } from 'react';

import PropTypes from 'prop-types';
import useStyles from './styles';
import {
  Card,
  Grid,
  FormGroup,
  FormLabel,
  Typography,
  TextField,
  MenuItem,
  Button,
} from '@material-ui/core';
import { Field, useFormikContext } from 'formik';
import { useCallback } from 'react';

import AddIcon from '@material-ui/icons/Add';

const SelectIRASType = props => {
  const { tipos } = props;

  const classes = useStyles();

  const { values, handleChange, setFieldValue } = useFormikContext();

  const handleAddIRASType = useCallback(() => {
    setFieldValue('newIRASs', [
      ...values.newIRASs,
      {
        data: '',
        descricao: '',
        tipo_iras_id: values.tipoIRASSelected.toString(),
        tipo_iras_descricao: tipos.filter(
          tipo => tipo.id === Number(values.tipoIRASSelected),
        )[0].descricao,
      },
    ]);
  }, [setFieldValue, values.newIRASs, values.tipoIRASSelected, tipos]);

  return (
    <Grid
      className={classes.root}
      component={Card}
      container
      item
    >
      <FormGroup>
        <FormLabel>
          <Typography variant="h4">Tipo teste</Typography>
        </FormLabel>
        <Grid
          className={classes.actionWrapper}
          item
        >
          <Field
            as={TextField}
            className={classes.textField}
            label="Escolher"
            name="tipoIRASSelected"
            onChange={handleChange}
            select
            type="text"
            value={values.tipoIRASSelected}
            variant="outlined"
          >
            {tipos.map(tipo => (
              <MenuItem
                key={tipo.id}
                value={tipo.id.toString()}
              >
                {tipo.descricao}
              </MenuItem>
            ))}
          </Field>
          <Button
            className={classes.buttonAddType}
            color="secondary"
            disabled={values.tipoIRASSelected === ''}
            onClick={() => handleAddIRASType()}
            startIcon={<AddIcon />}
            variant="contained"
          >
            ADICIONAR OCORRÊNCIA
          </Button>
        </Grid>
      </FormGroup>
    </Grid>
  );
};

SelectIRASType.propTypes = {
  tipos: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      descricao: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default memo(SelectIRASType);
