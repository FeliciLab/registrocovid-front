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
  <Grid
    item
    xs={6}
  >
    <FormGroup>
      <FormLabel>
        <Typography variant="h5">{title}</Typography>
      </FormLabel>
      <Component
        contentEditable={false}
        type={type}
        value={value}
        {...rest}
      />
    </FormGroup>
  </Grid>
);

// Ajudar na construcao de um item de Suporte respiratorio
const FieldComposerItem = props => {
  const { name, value } = props;

  console.table({ name, value });

  const fields = {
    data_inicio: (
      <FieldGrid
        component={TextField}
        title="Inicio"
        type="date"
        value={value}
        variant="outlined"
      />
    ),
    data_termino: (
      <FieldGrid
        component={TextField}
        title="Término"
        type="date"
        value={value}
        variant="outlined"
      />
    ),
    fluxo_o2: (
      <FieldGrid
        component={TextField}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">l/min</InputAdornment>
          ),
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
      <Grid
        item
        xs={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">
              Paciente permaneceu menos de 24h em ventilação invasiva?
            </Typography>
          </FormLabel>
          <FormControlLabel
            control={
              <Switch
                checked={value}
                color="primary"
                type="checkbox"
              />
            }
            label={<Typography variant="h5">Sim</Typography>}
          />
        </FormGroup>
      </Grid>
    ),
    fluxo_sangue: (
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">Fluxo de sangue</Typography>
          </FormLabel>
          <TextField
            contentEditable={false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">l/min</InputAdornment>
              ),
            }}
            type="number"
            value={value || ''}
            variant="outlined"
          />
        </FormGroup>
      </Grid>
    ),
    fluxo_gasoso: (
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">Fluxo gasoso</Typography>
          </FormLabel>
          <TextField
            contentEditable={false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">l/min</InputAdornment>
              ),
            }}
            type="number"
            value={value || ''}
            variant="outlined"
          />
        </FormGroup>
      </Grid>
    ),
    fio2: (
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">FiO₂</Typography>
          </FormLabel>
          <TextField
            contentEditable={false}
            InputProps={{
              endAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
            type="number"
            value={value || ''}
            variant="outlined"
          />
        </FormGroup>
      </Grid>
    ),
    data_pronacao: (
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">Data de pronação</Typography>
          </FormLabel>
          <TextField
            contentEditable={false}
            type="date"
            value={value || ''}
            variant="outlined"
          />
        </FormGroup>
      </Grid>
    ),
    quantidade_horas: (
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">Pronação</Typography>
          </FormLabel>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">hora(s)</InputAdornment>
              ),
            }}
            type="number"
            value={value || ''}
            variant="outlined"
          />
        </FormGroup>
      </Grid>
    ),
    data_inclusao_desmame: (
      <Grid item>
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">
              Em caso afirmativo, informe a data da inclusão do paciente no
              desmame
            </Typography>
          </FormLabel>
          <TextField
            contentEditable={false}
            type="date"
            value={value || ''}
            variant="outlined"
          />
        </FormGroup>
      </Grid>
    ),
  };

  return fields[name];
};

FieldComposerItem.propTypes = {
  name: PropTypes.oneOf([
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
  value: PropTypes.any,
};

export default memo(FieldComposerItem);
