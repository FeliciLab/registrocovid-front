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
    <Grid
      className={classes.root}
      component={Card}
      container
      item
      md={10}
      spacing={2}
      xs={12}
    >
      <Grid
        className={classes.formWraper}
        container
        item
        spacing={1}
      >
        {/* data_inicio */}
        <Grid
          className={classes.field}
          item
          sm={6}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h5">Primeira Sessão</Typography>
            </FormLabel>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.field}
              contentEditable={false}
              label="Data"
              type="date"
              value={tratamento.data_inicio}
            />
          </FormGroup>
        </Grid>

        {/* data_termino */}
        <Grid
          className={classes.field}
          item
          sm={6}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h5">Última Sessão</Typography>
            </FormLabel>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.field}
              contentEditable={false}
              label="Data"
              type="date"
              value={tratamento.data_termino}
            />
          </FormGroup>
        </Grid>

        {/* motivo_hemodialise */}
        <Grid
          className={classes.fieldData}
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h5">Motivo</Typography>
            </FormLabel>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.field}
              contentEditable={false}
              type="text"
              value={tratamento.motivo_hemodialise || ''}
              variant="outlined"
            />
          </FormGroup>
        </Grid>

        {/* frequencia_hemodialise */}
        <Grid
          className={classes.fieldData}
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h5">Frequência</Typography>
            </FormLabel>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.field}
              contentEditable={false}
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
