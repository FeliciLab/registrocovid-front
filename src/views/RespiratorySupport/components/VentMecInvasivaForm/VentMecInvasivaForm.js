import {
  Card,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
} from '@material-ui/core';
import { Field } from 'formik';
import { TextField, Switch } from 'formik-material-ui';
import React from 'react';

const VentMecInvasivaForm = () => {
  return (
    <Grid
      component={Card}
      container
      spacing={2}
    >
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">Início</Typography>
          </FormLabel>
          <Field
            component={TextField}
            name="ventMecInvasiva.data_inicio"
            type="date"
            variant="outlined"
          />
        </FormGroup>
      </Grid>
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">Término</Typography>
          </FormLabel>
          <Field
            component={TextField}
            name="ventMecInvasiva.data_termino"
            type="date"
            variant="outlined"
          />
        </FormGroup>
      </Grid>

      <Grid item>
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
                name="ventMecInvasiva.menos_24h_vmi"
                type="checkbox"
              />}
            label={<Typography variant="h5">Sim</Typography>}
            name="ventMecInvasiva.menos_24h_vmi"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default VentMecInvasivaForm;
