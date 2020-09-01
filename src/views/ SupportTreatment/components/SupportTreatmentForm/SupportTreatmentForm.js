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
      item
    >
      <FormLabel className={classes.formLabel}>
        <Typography variant="h4">Hemodiálise</Typography>
      </FormLabel>

      <Grid
        className={classes.formWraper}
        container
        spacing={1}
      >
        {/* data_inicio */}
        <Grid
          className={classes.fieldWraper}
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Primeira Sessão</Typography>
            </FormLabel>
            <Field
              InputLabelProps={{
                shrink: true,
              }}
              as={TextField}
              className={classes.field}
              error={
                errors.data_inicio &&
                touched.data_inicio
              }
              helperText={
                errors.data_inicio &&
                touched.data_inicio &&
                errors.data_inicio
              }
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
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Última Sessão</Typography>
            </FormLabel>
            <Field
              InputLabelProps={{
                shrink: true,
              }}
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
          sm={6}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Motivo</Typography>
            </FormLabel>
            <Field
              InputLabelProps={{
                shrink: true,
              }}
              as={TextField}
              className={classes.field}
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
          sm={6}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Frequência</Typography>
            </FormLabel>
            <Field
              InputLabelProps={{
                shrink: true,
              }}
              as={TextField}
              className={classes.field}
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
