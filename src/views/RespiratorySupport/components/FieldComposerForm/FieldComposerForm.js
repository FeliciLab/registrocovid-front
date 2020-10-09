import {
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { TextField, Switch } from 'formik-material-ui';
import React, { memo } from 'react';

const FieldGrid = ({ title, component, type, name, ...rest }) => (
  <Grid
    item
    xs={6}
  >
    <FormGroup>
      <FormLabel>
        <Typography variant="h5">{title}</Typography>
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
        name={name}
        title="Inicio"
        type="date"
        variant="outlined"
      />
    ),
    data_termino: (
      <FieldGrid
        component={TextField}
        name={name}
        title="Término"
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
        name={name}
        title="Fluxo O₂"
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
        name={name}
        title="Concentração O₂"
        type="number"
        variant="outlined"
      />
    ),
    menos_24h_vmi: (
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">
            Paciente permaneceu menos de 24h em ventilação invasiva?
            </Typography>
          </FormLabel>
          <FormControlLabel
            control={
              <Field
                color="primary"
                component={Switch}
                type="checkbox"
              />
            }
            label={<Typography variant="h5">Sim</Typography>}
            name={name}
          />
        </FormGroup>
      </Grid>
    ),
    fluxo_sangue: (
      <FieldGrid
        component={TextField}
        InputProps={{
          endAdornment: <InputAdornment position="start">l/min</InputAdornment>,
        }}
        name={name}
        title="Fluxo de sangue"
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
        name={name}
        title="Fluxo gasoso"
        type="number"
        variant="outlined"
      />
    ),
    fio2: (
      <FieldGrid
        component={TextField}
        InputProps={{
          endAdornment: <InputAdornment position="start">%</InputAdornment>,
        }}
        name={name}
        title="FiO₂"
        type="number"
        variant="outlined"
      />
    ),
    data_pronacao: (
      <FieldGrid
        component={TextField}
        name={name}
        title="Data de pronação"
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
        name={name}
        title="Pronação"
        type="number"
        variant="outlined"
      />
    ),
    data_inclusao_desmame: (
      <FieldGrid
        component={TextField}
        name={name}
        title="Em caso afirmativo, informe a data da inclusão do paciente no desmame"
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
