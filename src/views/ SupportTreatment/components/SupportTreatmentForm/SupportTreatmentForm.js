import React, { memo } from 'react';

import {
  Grid,
  FormLabel,
  Typography,
  FormGroup,
  Card,
  TextField,
} from '@material-ui/core';
import { useFormikContext, Field } from 'formik';
import useStyles from './styles';

function SupportTreatmentForm() {
  const classes = useStyles();

  const { values, handleChange, errors, touched } = useFormikContext();

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
          className={classes.fieldWraper}
          item
          sm={6}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h5">Primeira Sessão</Typography>
            </FormLabel>
            <Field
              as={TextField}
              className={classes.field}
              error={errors.data_inicio && touched.data_inicio}
              helperText={
                errors.data_inicio && touched.data_inicio && errors.data_inicio
              }
              InputLabelProps={{
                shrink: true,
              }}
              label="Data"
              name="data_inicio"
              onChange={handleChange}
              type="date"
              value={values.data_inicio}
            />
          </FormGroup>
        </Grid>

        {/* data_termino */}
        <Grid
          className={classes.fieldWraper}
          item
          sm={6}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h5">Última Sessão</Typography>
            </FormLabel>
            <Field
              as={TextField}
              className={classes.field}
              error={
                errors.data_termino &&
                touched.data_termino &&
                !!errors.data_termino
              }
              helperText={
                errors.data_termino &&
                touched.data_termino &&
                errors.data_termino
              }
              InputLabelProps={{
                shrink: true,
              }}
              label="Data"
              name="data_termino"
              onChange={handleChange}
              type="date"
              value={values.data_termino}
            />
          </FormGroup>
        </Grid>

        {/* motivo_hemodialise */}
        <Grid
          className={classes.fieldWraper}
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h5">Motivo</Typography>
            </FormLabel>
            <Field
              as={TextField}
              className={classes.field}
              InputLabelProps={{
                shrink: true,
              }}
              name="motivo_hemodialise"
              onChange={handleChange}
              type="text"
              value={values.motivo_hemodialise}
              variant="outlined"
            />
          </FormGroup>
        </Grid>

        {/* frequencia_hemodialise */}
        <Grid
          className={classes.fieldWraper}
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h5">Frequência</Typography>
            </FormLabel>
            <Field
              as={TextField}
              className={classes.field}
              InputLabelProps={{
                shrink: true,
              }}
              name="frequencia_hemodialise"
              onChange={handleChange}
              type="text"
              value={values.frequencia_hemodialise}
              variant="outlined"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default memo(SupportTreatmentForm);
