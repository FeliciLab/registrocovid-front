import React from 'react';
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

// Ajudar na construcao de um item de Suporte respiratorio
const FieldComposerItem = props => {
  const { name, value } = props;

  const fields = {
    fluxo_o2: (
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">Fluxo O₂</Typography>
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
    data_inicio: (
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">Inicio</Typography>
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
    data_termino: (
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">Término</Typography>
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
    concentracao_o2: (
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">Concentração O₂</Typography>
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
              <Switch
                color="primary"
                type="checkbox"
                value={value || undefined}
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">l/min</InputAdornment>
              )
            }}
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

export default FieldComposerItem;
