import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import useSeeds from 'hooks/seeds';

import {
  Grid,
  FormLabel,
  Card,
  Typography,
  IconButton,
  FormGroup,
  TextField,
  MenuItem,
} from '@material-ui/core';
import { Field, useFormikContext } from 'formik';

// Form para Transferência para outro serviço
const OutcomeTransfForm = props => {
  const { index, remove } = props;

  const classes = useStyles();

  const { getInstituicoes } = useSeeds();

  const [instituicoes, setInstituicoes] = useState([]);

  const handleInstituicoes = useCallback(async () => {
    await getInstituicoes().then(response => {
      setInstituicoes(response.data);
    });
  }, [getInstituicoes]);

  useEffect(() => {
    handleInstituicoes();
  }, [handleInstituicoes]);

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
        <Typography variant="h4">Transferência para outro serviço</Typography>
        <IconButton
          aria-label="delete"
          onClick={() => remove(index)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </FormLabel>

      {/* instituicao_transferencia_id */}
      <Grid
        className={classes.fieldWraper}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">
              Em caso afirmativo para transferência para outro serviço, para onde?
            </Typography>
          </FormLabel>
          <Field
            as={TextField}
            className={classes.field}
            name={`newDesfechos.${index}.instituicao_transferencia_id`}
            onChange={handleChange}
            select
            value={values.newDesfechos[index].instituicao_transferencia_id}
            variant="outlined"
          >
            {instituicoes.map(({ id, nome }) => (
              <MenuItem
                key={id}
                value={id}
              >
                {nome}
              </MenuItem>
            ))}
          </Field>
        </FormGroup>
      </Grid>

      {/* data */}
      <Grid
        className={classes.fieldWraper}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">Data de óbito</Typography>
          </FormLabel>
          <Field
            InputLabelProps={{
              shrink: true,
            }}
            as={TextField}
            className={classes.field}
            // error={
            //   errors.newIRASs &&
            //   touched.newIRASs &&
            //   !!errors.newIRASs[index]?.data
            // }
            // helperText={<ErrorMessage name={`newIRASs.${index}.data`} />}
            label="Data"
            name={`newDesfechos.${index}.data`}
            onChange={handleChange}
            type="date"
            value={values.newDesfechos[index].data}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

OutcomeTransfForm.propTypes = {
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};

export default OutcomeTransfForm;
