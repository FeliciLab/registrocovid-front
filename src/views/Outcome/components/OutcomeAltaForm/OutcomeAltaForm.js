import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  FormLabel,
  Typography,
  IconButton,
  Card,
  FormGroup,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from '@material-ui/core';
import useSeeds from 'hooks/seeds';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';
import { Field, useFormikContext, ErrorMessage } from 'formik';

const OutcomeAltaForm = props => {
  const { index, remove } = props;

  const classes = useStyles();

  const { getTiposAutoCuidados, getTiposCuidadoPaliativo } = useSeeds();

  const [tiposAutoCuidados, setTiposAutoCuidados] = useState([]);

  const [tiposCuiPale, setTiposCuiPale] = useState([]);

  const {
    values,
    handleChange,
    errors,
    touched
  } = useFormikContext();

  const handleTiposCuiPale = useCallback(async () => {
    await getTiposCuidadoPaliativo().then(response => {
      setTiposCuiPale(response.data);
    });
  }, [getTiposCuidadoPaliativo]);

  const handleTiposAutoCuidados = useCallback(async () => {
    await getTiposAutoCuidados().then(response => {
      setTiposAutoCuidados(response.data);
    });
  }, [getTiposAutoCuidados]);

  useEffect(() => {
    handleTiposCuiPale();
    handleTiposAutoCuidados();
  }, [handleTiposCuiPale, handleTiposAutoCuidados]);

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
    >
      <FormLabel className={classes.formLabel}>
        <Typography variant="h4">Alta hospitalar</Typography>
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
        {/* data */}
        <Grid
          className={classes.fieldWraper}
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h5">Data da alta hospitalar</Typography>
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

        {/* tipo_autocuidado_id */}
        <Grid
          className={classes.fieldWraper}
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h5">
                Habilidade de auto-cuidado no momento da alta comparado a antes
                da doença:
              </Typography>
            </FormLabel>
            <Field
              as={RadioGroup}
              className={classes.radioGroup}
              name={`newDesfechos.${index}.tipo_autocuidado_id`}
              onChange={handleChange}
              row
              value={values.newDesfechos[index].tipo_autocuidado_id}
            >
              {tiposAutoCuidados.map(tipo => (
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
    </Grid>
  );
};

OutcomeAltaForm.propTypes = {
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};

export default OutcomeAltaForm;
