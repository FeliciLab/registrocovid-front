import {
  Card,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Field } from 'formik';
import { TextField, Switch } from 'formik-material-ui';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    maxWidth: '864px',
    marginTop: theme.spacing(2)
  },
}));

const VentMecInvasivaForm = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      component={Card}
      container
      item
      spacing={2}
    >
      <Grid
        item
        xs={12}
      >
        <Typography variant="h4">Ventilação mecânica invasiva</Typography>
      </Grid>
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
              />
            }
            label={<Typography variant="h5">Sim</Typography>}
            name="ventMecInvasiva.menos_24h_vmi"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default VentMecInvasivaForm;
