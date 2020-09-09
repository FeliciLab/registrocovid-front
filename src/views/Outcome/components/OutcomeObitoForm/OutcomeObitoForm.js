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
import { useFormikContext, Field, FastField } from 'formik';
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
    values,
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
        {/* data */}
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
              name={`newDesfechos.${index}.data`}
              onChange={handleChange}
              type="date"
              value={values.newDesfechos[index].data}
            />
          </FormGroup>
        </Grid>

        {/* obito_menos_24h */}
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
                  checked={values.newDesfechos[index].obito_menos_24h}
                  color="primary"
                  name={`newDesfechos.${index}.obito_menos_24h`}
                  onChange={handleChange}
                />
              }
              label={
                <Typography variant="h6">
                  {values.newDesfechos[index].obito_menos_24h ? 'Sim' : 'Não'}
                </Typography>
              }
              name="suporte_respiratorio"
            />
          </FormLabel>
        </Grid>

        {/* obito_em_vm */}
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
                  checked={values.newDesfechos[index].obito_em_vm}
                  color="primary"
                  name={`newDesfechos.${index}.obito_em_vm`}
                  onChange={handleChange}
                />
              }
              label={
                <Typography variant="h6">
                  {values.newDesfechos[index].obito_em_vm ? 'Sim' : 'Não'}
                </Typography>
              }
              name="suporte_respiratorio"
            />
          </FormLabel>
        </Grid>

        {/* obito_em_uti */}
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
                  checked={values.newDesfechos[index].obito_em_uti}
                  color="primary"
                  name={`newDesfechos.${index}.obito_em_uti`}
                  onChange={handleChange}
                />
              }
              label={
                <Typography variant="h6">
                  {values.newDesfechos[index].obito_em_uti ? 'Sim' : 'Não'}
                </Typography>
              }
              name="suporte_respiratorio"
            />
          </FormLabel>
        </Grid>

        {/* causa_obito */}
        <Grid
          className={classes.fieldWraper}
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h5">Causa do óbito</Typography>
            </FormLabel>

            <FastField
              InputLabelProps={{
                shrink: true,
              }}
              as={TextField}
              className={classes.field}
              label="Descreva sua causa"
              name={`newDesfechos.${index}.causa_obito`}
              onChange={handleChange}
              type="text"
              value={values.newDesfechos[index].causa_obito}
              variant="outlined"
            />
          </FormGroup>
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
