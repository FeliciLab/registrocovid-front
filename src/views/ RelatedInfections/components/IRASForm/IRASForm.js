import React, { memo } from 'react';
import {
  Grid,
  Card,
  FormLabel,
  Typography,
  FormGroup,
  TextField,
  IconButton,
} from '@material-ui/core';
import useStyles from './styles';
import PropTypes from 'prop-types';
import { useFormikContext, Field } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';

const IRASForm = ({ index, label, remove }) => {
  const classes = useStyles();

  const {
    values,
    handleChange,
    // errors,
    // touched,
  } = useFormikContext();

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
      <FormLabel className={classes.formLabel}>
        <Typography variant="h4">{label}</Typography>
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
              <Typography variant="h5">Ocorrência</Typography>
              <IconButton
                aria-label="delete"
                onClick={() => remove(index)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </FormLabel>
            <Field
              InputLabelProps={{
                shrink: true,
              }}
              as={TextField}
              className={classes.field}
              // error={
              //   errors.data_inicio &&
              //   touched.data_inicio
              // }
              // helperText={
              //   errors.data_inicio &&
              //   touched.data_inicio &&
              //   errors.data_inicio
              // }
              label="Data"
              name={`newIRASs.${index}.data`}
              onChange={handleChange}
              type="date"
              value={values.data}
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  );
};

IRASForm.propTypes = {
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
};

export default memo(IRASForm);
