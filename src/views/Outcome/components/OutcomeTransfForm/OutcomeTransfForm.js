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
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { Field, useFormikContext, ErrorMessage } from 'formik';

// Form para Transferência para outro serviço
const OutcomeTransfForm = props => {
  const { index, remove } = props;

  const classes = useStyles();

  const { getInstituicoes, getTiposCuidadoPaliativo } = useSeeds();

  const [instituicoes, setInstituicoes] = useState([]);

  const [tiposCuiPale, setTiposCuiPale] = useState([]);

  const handleInstituicoes = useCallback(async () => {
    await getInstituicoes().then(response => {
      setInstituicoes(response.data);
    });
  }, [getInstituicoes]);

  const handleTiposCuiPale = useCallback(async () => {
    await getTiposCuidadoPaliativo().then(response => {
      setTiposCuiPale(response.data);
    });
  }, [getTiposCuidadoPaliativo]);

  useEffect(() => {
    handleTiposCuiPale();
    handleInstituicoes();
  }, [handleTiposCuiPale, handleInstituicoes]);

  const { values, handleChange, errors, touched } = useFormikContext();

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
      md={10}
      sm={12}
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

      {/* data */}
      <Grid
        className={classes.fieldWraper}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">
              Data de transferência para outro serviço
            </Typography>
          </FormLabel>
          <Field
            InputLabelProps={{
              shrink: true,
            }}
            as={TextField}
            className={classes.field}
            error={
              errors.newDesfechos &&
              touched.newDesfechos &&
              !!errors.newDesfechos[index]?.data
            }
            helperText={<ErrorMessage name={`newDesfechos.${index}.data`} />}
            label="Data"
            name={`newDesfechos.${index}.data`}
            onChange={handleChange}
            type="date"
            value={values.newDesfechos[index].data}
          />
        </FormGroup>
      </Grid>

      {/* instituicao_transferencia_id */}
      <Grid
        className={classes.fieldWraper}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">
              Em caso afirmativo para transferência para outro serviço, para
              onde?
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

      {/* tipo_cuidado_paliativo_id */}
      <Grid
        className={classes.fieldWraper}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">
              Paciente sob cuidados paliativos (CP)?
            </Typography>
          </FormLabel>
          <ErrorMessage
            color="error"
            component={Typography}
            name={`newDesfechos.${index}.tipo_cuidado_paliativo_id`}
            variant="caption"
          />
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
  );
};

OutcomeTransfForm.propTypes = {
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};

export default OutcomeTransfForm;
