import {
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  Switch,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { memo } from 'react';

const FieldGrid = ({ label, component, type, name, ...rest }) => (
  <Grid
    item
    xs={6}
  >
    <FormGroup>
      <FormLabel>
        <Typography variant="h5">{label}</Typography>
      </FormLabel>
      <Field
        component={component}
        name={name}
        type={type}
        {...rest}
      />
    </FormGroup>
  </Grid>
);

const FieldComposerForm = props => {
  const { field, name } = props;
  const fields = {
    data_inicio: (
      <FieldGrid
        component={TextField}
        label="Inicio"
        name={name}
        type="date"
        variant="outlined"
      />
    ),
    data_termino: (
      <FieldGrid
        component={TextField}
        label="Término"
        name={name}
        type="date"
        variant="outlined"
      />
    ),
    fluxo_o2: (
      <FieldGrid
        component={TextField}
        InputProps={{
          endAdornment: <InputAdornment position="start">l/min</InputAdornment>,
        }}
        label="Fluxo O₂"
        name={name}
        type="number"
        variant="outlined"
      />
    ),
    concentracao_o2: (
      <FieldGrid
        component={TextField}
        InputProps={{
          endAdornment: <InputAdornment position="start">%</InputAdornment>,
        }}
        label="Concentração O₂"
        name={name}
        type="number"
        variant="outlined"
      />
    ),
    menos_24h_vmi: (
      <FieldGrid
        component={FormControlLabel}
        control={
          <Switch
            color="primary"
            type="checkbox"
          />}
        label="Paciente permaneceu menos de 24h em ventilação invasiva?"
        name={name}
        type="checkbox"
        variant="outlined"
      />
    ),
    fluxo_sangue: (
      <FieldGrid
        component={TextField}
        InputProps={{
          endAdornment: <InputAdornment position="start">l/min</InputAdornment>,
        }}
        label="Fluxo de sangue"
        name={name}
        type="number"
        variant="outlined"
      />
    ),
    fluxo_gasoso: (
      <FieldGrid
        component={TextField}
        InputProps={{
          endAdornment: <InputAdornment position="start">l/min</InputAdornment>,
        }}
        label="Fluxo gasoso"
        name={name}
        type="number"
        variant="outlined"
      />
    ),
    fio2: (
      <FieldGrid
        component={TextField}
        InputProps={{
          endAdornment: <InputAdornment position="start">l/min</InputAdornment>,
        }}
        label="FiO₂"
        name={name}
        type="number"
        variant="outlined"
      />
    ),
    data_pronacao: (
      <FieldGrid
        component={TextField}
        label="Data de pronação"
        name={name}
        type="date"
        variant="outlined"
      />
    ),
    quantidade_horas: (
      <FieldGrid
        component={TextField}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">hora(s)</InputAdornment>
          ),
        }}
        label="Pronação"
        name={name}
        type="number"
        variant="outlined"
      />
    ),
    data_inclusao_desmame: (
      <FieldGrid
        component={TextField}
        label="Em caso afirmativo, informe a data da inclusão do paciente no desmame"
        name={name}
        type="date"
        variant="outlined"
      />
    ),
  };

  return fields[field];
};

FieldComposerForm.propTypes = {
  field: PropTypes.oneOf([
    'fluxo_o2',
    'data_inicio',
    'data_termino',
    'menos_24h_vmi',
    'concentracao_o2',
    'fluxo_sangue',
    'fluxo_gasoso',
    'fio2',
    'data_pronacao', // pronacao
    'quantidade_horas', // pronacao
    'data_inclusao_desmame', // desmane
  ]).isRequired,
  name: PropTypes.any.isRequired,
};

export default memo(FieldComposerForm);
