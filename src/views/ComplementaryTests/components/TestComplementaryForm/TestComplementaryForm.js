import React from 'react';
import {
  Grid,
  FormGroup,
  FormLabel,
  Typography,
  TextField,
  Card,
  IconButton,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import { Field, useFormikContext } from 'formik';
import useStyles from './styles';

const TestComplementaryForm = props => {
  const classes = useStyles();

  const { index, remove, descricao } = props;

  const {
    values,
    handleChange,
    errors,
    touched,
  } = useFormikContext();

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
    >
      <FormLabel className={classes.formLabel}>
        <Typography variant="h3">Exame Complementar - {descricao}</Typography>
        <IconButton
          aria-label="delete"
          onClick={() => remove(index)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </FormLabel>

      <Grid
        className={classes.fieldsWraper}
        container
        spacing={1}
      >
        {/* resultado */}
        <Grid
          className={classes.fieldTesteRapido}
          item
          md={6}
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">
                {values.newComplementaryTests[index].descricao}
              </Typography>
            </FormLabel>
            <Field
              InputLabelProps={{
                shrink: true,
              }}
              as={TextField}
              className={classes.radioGroup}
              error={
                errors.newComplementaryTests &&
                touched.newComplementaryTests &&
                !!errors.newComplementaryTests[index]?.resultado
              }
              helperText={
                (errors.newComplementaryTests &&
                touched.newComplementaryTests &&
                errors.newComplementaryTests[index]?.resultado) ?
                  errors.newComplementaryTests[index]?.resultado : null
              }
              name={`newComplementaryTests.${index}.resultado`}
              onChange={handleChange}
              value={values.newComplementaryTests[index].resultado}
              variant="outlined"
            />

          </FormGroup>
        </Grid>
        {/* data */}
        <Grid
          className={classes.fieldTesteRapido}
          item
          md={6}
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Data de coleta</Typography>
            </FormLabel>
            <Field
              InputLabelProps={{
                shrink: true,
              }}
              as={TextField}
              className={classes.dateField}
              error={
                errors.newComplementaryTests &&
                touched.newComplementaryTests &&
                !!errors.newComplementaryTests[index]?.data
              }
              helperText={
                (errors.newComplementaryTests &&
                touched.newComplementaryTests &&
                errors.newComplementaryTests[index]?.data) ?
                  errors.newComplementaryTests[index]?.data : null
              }
              label="Data da coleta do teste rápido"
              name={`newComplementaryTests.${index}.data`}
              onChange={handleChange}
              type="date"
              value={values.newComplementaryTests[index].data}
            />
          </FormGroup>
        </Grid>
      </Grid>


    </Grid>
  );
};

export default TestComplementaryForm;
