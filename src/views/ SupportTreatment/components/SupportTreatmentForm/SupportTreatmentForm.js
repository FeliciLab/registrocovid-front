import React from 'react';

import PropTypes from 'prop-types';

import {
  Grid,
  FormLabel,
  Typography,
  IconButton,
  FormGroup,
  Card,
  TextField,
} from '@material-ui/core';
import { useFormikContext, Field } from 'formik';

import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';

function SupportTreatmentForm({ index, remove }) {
  const classes = useStyles();

  const {
    values,
    handleChange,
    errors,
    touched
  } = useFormikContext();

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
    >
      <FormLabel className={classes.formLabel}>
        <Typography variant="h4">Hemodiálise</Typography>
        <IconButton
          aria-label="delete"
          onClick={() => remove(index)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </FormLabel>

      <Grid
        className={classes.formWraper}
        container
        spacing={1}
      >
        {/* data_hemodialise */}
        <Grid
          className={classes.fieldWraper}
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Ocorrência</Typography>
            </FormLabel>
            <Field
              InputLabelProps={{
                shrink: true,
              }}
              as={TextField}
              className={classes.field}
              error={
                errors.newSupportTreatments &&
                touched.newSupportTreatments &&
                !!errors.newSupportTreatments[index]?.data_hemodialise
              }
              helperText={
                errors.newSupportTreatments &&
                touched.newSupportTreatments &&
                errors.newSupportTreatments[index]?.data_hemodialise
                  ? errors.newSupportTreatments[index]?.data_hemodialise
                  : null
              }
              label="Data da hemodialise"
              name={`newSupportTreatments.${index}.data_hemodialise`}
              onChange={handleChange}
              type="date"
              value={values.newSupportTreatments[index].data_hemodialise}
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
              label="Motivo da hemodiálise"
              name={`newSupportTreatments.${index}.motivo_hemodialise`}
              onChange={handleChange}
              type="text"
              value={values.newSupportTreatments[index].motivo_hemodialise}
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
              label="Frequência de hemodiálise"
              name={`newSupportTreatments.${index}.frequencia_hemodialise`}
              onChange={handleChange}
              type="text"
              value={values.newSupportTreatments[index].frequencia_hemodialise}
              variant="outlined"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  );
}

SupportTreatmentForm.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};

export default SupportTreatmentForm;
