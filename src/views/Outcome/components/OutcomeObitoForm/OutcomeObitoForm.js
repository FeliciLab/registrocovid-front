import React from 'react';
import {
  Grid,
  Card,
  FormLabel,
  Typography,
  IconButton,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { useFormikContext, Field } from 'formik';
import useStyles from './styles';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';

// TODO: remover depois
// const initialValues = {
//   newDesfechos: [],
//   tipoNewDesfechoSelected: '',
// };

const OutcomeObitoForm = props => {
  const { index, remove } = props;

  const classes = useStyles();

  const {
    // values,
    handleChange,
    // errors,
    // touched
  } = useFormikContext();

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
    >
      <FormLabel className={classes.formLabel}>
        <Typography variant="h4">Óbito</Typography>
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
        {/* data_de_obito */}
        <Grid
          className={classes.fieldWraper}
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h5">Data de óbito</Typography>
            </FormLabel>
            <Field
              InputLabelProps={{
                shrink: true,
              }}
              as={TextField}
              className={classes.field}
              // error={
              //   errors.newIRASs &&
              //   touched.newIRASs &&
              //   !!errors.newIRASs[index]?.data
              // }
              // helperText={<ErrorMessage name={`newIRASs.${index}.data`} />}
              label="Data"
              // name={`newIRASs.${index}.data`}
              onChange={handleChange}
              type="date"
              // value={values.newIRASs[index].data}
            />
          </FormGroup>
        </Grid>

        {/* ??? */}
        <Grid
          className={classes.fieldWraper}
          item
          sm={12}
        >
          <FormLabel>
            <Typography variant="h5">
              O óbito ocorreu em menos de 24h após a data da internação?
            </Typography>
            <Field
              as={FormControlLabel}
              control={
                <Switch
                  // checked={values.suporte_respiratorio}
                  color="primary"
                  name="suporte_respiratorio"
                  onChange={handleChange}
                />
              }
              label={
                <Typography variant="h6">
                  Paciente chegou com suporte respiratório?
                </Typography>
              }
              name="suporte_respiratorio"
            />
          </FormLabel>
        </Grid>

        {/* ??? */}
        <Grid
          className={classes.fieldWraper}
          item
          sm={12}
        >
          <FormLabel>
            <Typography variant="h5">
              O paciente estava em ventilação mecânica na ocasião do óbito?
            </Typography>
            <Field
              as={FormControlLabel}
              control={
                <Switch
                  // checked={values.suporte_respiratorio}
                  color="primary"
                  name="suporte_respiratorio"
                  onChange={handleChange}
                />
              }
              label={
                <Typography variant="h6">
                  Paciente chegou com suporte respiratório?
                </Typography>
              }
              name="suporte_respiratorio"
            />
          </FormLabel>
        </Grid>

        {/* ??? */}
        <Grid
          className={classes.fieldWraper}
          item
          sm={12}
        >
          <FormLabel>
            <Typography variant="h5">
              O paciente estava na UTI na ocasião do óbito?
            </Typography>
            <Field
              as={FormControlLabel}
              control={
                <Switch
                  // checked={values.suporte_respiratorio}
                  color="primary"
                  name="suporte_respiratorio"
                  onChange={handleChange}
                />
              }
              label={
                <Typography variant="h6">
                  Paciente chegou com suporte respiratório?
                </Typography>
              }
              name="suporte_respiratorio"
            />
          </FormLabel>
        </Grid>
      </Grid>
    </Grid>
  );
};

OutcomeObitoForm.propTypes = {
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};

export default OutcomeObitoForm;
