import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  FormLabel,
  Typography,
  IconButton,
  FormGroup,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import useStyles from './styles';
import useSeeds from 'hooks/seeds';

import { Field, useFormikContext } from 'formik';
import { useCallback } from 'react';

// Form para Cuidados Paleativos
const OutcomeCuiPaleForm = props => {
  const { index, remove } = props;

  const { getTiposCuidadoPaliativo } = useSeeds();

  const [tiposCuiPale, setTiposCuiPale] = useState([]);

  const classes = useStyles();

  const handleTiposCuiPale = useCallback(async () => {
    await getTiposCuidadoPaliativo().then(response => {
      setTiposCuiPale(response.data);
    });
  }, [getTiposCuidadoPaliativo]);

  useEffect(() => {
    handleTiposCuiPale();
  }, [handleTiposCuiPale]);

  const {
    values,
    handleChange,
    // errors,
    // touched
  } = useFormikContext();

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
    >
      <FormLabel className={classes.formLabel}>
        <Typography variant="h4">Cuidados paliativos</Typography>
        <IconButton
          aria-label="delete"
          onClick={() => remove(index)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </FormLabel>
      <Grid
        className={classes.formWraper}
        container
        spacing={1}
      >
        {/* tipo_cuidado_paliativo_id */}
        <Grid
          className={classes.fieldWraper}
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h5">
                Paciente encontrava-se em cuidados paliativos?
              </Typography>
            </FormLabel>
            <Field
              as={RadioGroup}
              className={classes.radioGroup}
              name={`newDesfechos.${index}.tipo_cuidado_paliativo_id`}
              onChange={handleChange}
              row
              value={values.newDesfechos[index].tipo_cuidado_paliativo_id}
            >
              {tiposCuiPale.map(tipo => (
                <FormControlLabel
                  control={<Radio />}
                  key={tipo.id}
                  label={tipo.descricao}
                  value={tipo.id.toString()}
                />
              ))}
            </Field>
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  );
};

OutcomeCuiPaleForm.propTypes = {
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};

export default OutcomeCuiPaleForm;
