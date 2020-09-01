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

  const {
    values,
    handleChange,
    // errors,
    // touched,
  } = useFormikContext();

  return (
    <Grid className={classes.root} component={Card} item>
      <FormLabel className={classes.formLabel}>
        <Typography variant="h4">Hemodiálise</Typography>
      </FormLabel>

      <Grid className={classes.formWraper} container spacing={1}>
        {/* data_inicio */}
        <Grid className={classes.fieldWraper} item sm={12}>
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Última Sessão</Typography>
            </FormLabel>
            <Field
              as={TextField}
              className={classes.field}
              // error={
              //   errors.newSupportTreatments &&
              //   touched.newSupportTreatments &&
              //   !!errors.newSupportTreatments[index]?.data_hemodialise
              // }
              // helperText={
              //   errors.newSupportTreatments &&
              //   touched.newSupportTreatments &&
              //   errors.newSupportTreatments[index]?.data_hemodialise
              //     ? errors.newSupportTreatments[index]?.data_hemodialise
              //     : null
              // }
              InputLabelProps={{
                shrink: true,
              }}
              label="Data"
              name={'newSupportTreatment.data_inicio'}
              onChange={handleChange}
              type="date"
              value={values.newSupportTreatment.data_inicio}
            />
          </FormGroup>
        </Grid>

        {/* data_termino */}
        <Grid className={classes.fieldWraper} item sm={12}>
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Última Sessão</Typography>
            </FormLabel>
            <Field
              as={TextField}
              className={classes.field}
              // error={
              //   errors.newSupportTreatments &&
              //   touched.newSupportTreatments &&
              //   !!errors.newSupportTreatments[index]?.data_hemodialise
              // }
              // helperText={
              //   errors.newSupportTreatments &&
              //   touched.newSupportTreatments &&
              //   errors.newSupportTreatments[index]?.data_hemodialise
              //     ? errors.newSupportTreatments[index]?.data_hemodialise
              //     : null
              // }
              InputLabelProps={{
                shrink: true,
              }}
              label="Data"
              name={'newSupportTreatment.data_termino'}
              onChange={handleChange}
              type="date"
              value={values.newSupportTreatment.data_termino}
            />
          </FormGroup>
        </Grid>

        {/* motivo_hemodialise */}
        <Grid className={classes.fieldWraper} item sm={6}>
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Motivo</Typography>
            </FormLabel>
            <Field
              as={TextField}
              className={classes.field}
              InputLabelProps={{
                shrink: true,
              }}
              name={'newSupportTreatment.motivo_hemodialise'}
              onChange={handleChange}
              type="text"
              value={values.newSupportTreatment.motivo_hemodialise}
              variant="outlined"
            />
          </FormGroup>
        </Grid>

        {/* frequencia_hemodialise */}
        <Grid className={classes.fieldWraper} item sm={6}>
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Frequência</Typography>
            </FormLabel>
            <Field
              as={TextField}
              className={classes.field}
              InputLabelProps={{
                shrink: true,
              }}
              name={'newSupportTreatment.frequencia_hemodialise'}
              onChange={handleChange}
              type="text"
              value={values.newSupportTreatment.frequencia_hemodialise}
              variant="outlined"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default memo(SupportTreatmentForm);
