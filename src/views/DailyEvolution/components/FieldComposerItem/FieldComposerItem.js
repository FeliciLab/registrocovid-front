import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';

const FieldGrid = ({ title, component: Component, type, value, ...rest }) => (
  <Grid item xs={6}>
    <FormGroup>
      <FormLabel>
        <Typography variant="h5">{title}</Typography>
      </FormLabel>
      <Component
        contentEditable={false} type={type} value={value}
        {...rest}
      />
    </FormGroup>
  </Grid>
);

// Ajudar na construcao de um item de Suporte respiratorio
const FieldComposerItem = props => {
  const { name, value } = props;

  const fields = {
    fluxo_o2: (
      <FieldGrid
        component={TextField}
        InputProps={{
          endAdornment: <InputAdornment position="start">l/min</InputAdornment>,
        }}
        title="Fluxo O₂"
        type="number"
        value={value || ''}
        variant="outlined"
      />
    ),
    concentracao_o2: (
      <FieldGrid
        component={TextField}
        InputProps={{
          endAdornment: <InputAdornment position="start">%</InputAdornment>,
        }}
        title="Concentração O₂"
        type="number"
        value={value}
        variant="outlined"
      />
    ),
    menos_24h_vmi: (
      <Grid item xs={12}>
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">
              Paciente permaneceu menos de 24h em ventilação invasiva?
            </Typography>
          </FormLabel>
          <FormControlLabel
            control={<Switch checked={value} color="primary" type="checkbox" />}
            label={<Typography variant="h5">Sim</Typography>}
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
        title="Fluxo de sangue"
        type="number"
        value={value || ''}
        variant="outlined"
      />
    ),
    fluxo_gasoso: (
      <FieldGrid
        component={TextField}
        InputProps={{
          endAdornment: <InputAdornment position="start">l/min</InputAdornment>,
        }}
        title="Fluxo de sangue"
        type="number"
        value={value || ''}
        variant="outlined"
      />
    ),
    fio2: (
      <FieldGrid
        component={TextField}
        InputProps={{
          endAdornment: <InputAdornment position="start">%</InputAdornment>,
        }}
        title="FiO₂"
        type="number"
        value={value || ''}
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
        title="Pronação"
        type="number"
        value={value || ''}
        variant="outlined"
      />
    ),
  };

  return fields[name];
};

FieldComposerItem.propTypes = {
  name: PropTypes.oneOf([
    'fluxo_o2',
    'menos_24h_vmi',
    'concentracao_o2',
    'fluxo_sangue',
    'fluxo_gasoso',
    'fio2',
    'quantidade_horas', // pronacao
  ]).isRequired,
  value: PropTypes.any,
};

export default memo(FieldComposerItem);
