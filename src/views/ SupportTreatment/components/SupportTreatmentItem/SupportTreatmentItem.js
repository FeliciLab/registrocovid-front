import React, { memo } from 'react';

import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  FormGroup,
  FormLabel,
  TextField,
  Card,
} from '@material-ui/core';

import useStyles from './styles';

function SupportTreatmentItem({ tratamento }) {
  const classes = useStyles();

  return (
    <Grid component={Card} container item sm={10} spacing={2}>
      <Grid className={classes.heading} item>
        <Typography className={classes.headingLabel} variant="h4">
          Hemodiálise
        </Typography>
      </Grid>
      <Grid container item spacing={2}>
        {/* data_inicio */}
        <Grid item sm={6}>
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Primeira Sessão</Typography>
            </FormLabel>
            <TextField
              contentEditable={false}
              InputLabelProps={{
                shrink: true,
              }}
              label="Data"
              type="date"
              value={tratamento.data_inicio}
            />
          </FormGroup>
        </Grid>

        {/* data_termino */}
        <Grid item sm={6}>
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Última Sessão</Typography>
            </FormLabel>
            <TextField
              contentEditable={false}
              InputLabelProps={{
                shrink: true,
              }}
              label="Data"
              type="date"
              value={tratamento.data_termino}
            />
          </FormGroup>
        </Grid>

        {/* motivo_hemodialise */}
        <Grid className={classes.fieldData} item sm={6}>
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Motivo</Typography>
            </FormLabel>
            <TextField
              contentEditable={false}
              InputLabelProps={{
                shrink: true,
              }}
              type="text"
              value={tratamento.motivo_hemodialise || ''}
              variant="outlined"
            />
          </FormGroup>
        </Grid>

        {/* frequencia_hemodialise */}
        <Grid className={classes.fieldData} item sm={6}>
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Frequência</Typography>
            </FormLabel>
            <TextField
              contentEditable={false}
              InputLabelProps={{
                shrink: true,
              }}
              type="text"
              value={tratamento.frequencia_hemodialise || ''}
              variant="outlined"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  );
}

SupportTreatmentItem.propTypes = {
  className: PropTypes.string,
  tratamento: PropTypes.exact({
    id: PropTypes.number,
    data_inicio: PropTypes.string,
    data_termino: PropTypes.string,
    hemodialise: PropTypes.bool,
    motivo_hemodialise: PropTypes.string,
    frequencia_hemodialise: PropTypes.string,
  }).isRequired,
};

export default memo(SupportTreatmentItem);
