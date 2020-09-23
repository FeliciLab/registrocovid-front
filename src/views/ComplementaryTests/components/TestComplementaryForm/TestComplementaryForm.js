import React, { memo } from 'react';

import PropTypes from 'prop-types';

import {
  Grid,
  FormGroup,
  FormLabel,
  Typography,
  Card,
  IconButton,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import { Field, useFormikContext } from 'formik';
import useStyles from './styles';
import { TextField } from 'formik-material-ui';

const TestComplementaryForm = props => {
  const classes = useStyles();

  const { index, remove } = props;

  const { values } = useFormikContext();

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
    >
      <div className={classes.formLabel}>
        <Typography variant="h4">
          {values.newComplementaryTests[index].descricao}
        </Typography>
        <IconButton
          aria-label="delete"
          onClick={() => remove(index)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>

      <Grid
        className={classes.formWraper}
        container
        spacing={1}
      >
        {/* resultado */}
        <Grid
          className={classes.fieldWraper}
          item
          md={6}
          xs={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Resultado</Typography>
            </FormLabel>
            <Field
              className={classes.field}
              component={TextField}
              name={`newComplementaryTests.${index}.resultado`}
              type="text"
              variant="outlined"
            />
          </FormGroup>
        </Grid>
        {/* data */}
        <Grid
          className={classes.fieldWraper}
          item
          md={6}
          xs={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Data</Typography>
            </FormLabel>
            <Field
              className={classes.field}
              component={TextField}
              name={`newComplementaryTests.${index}.data`}
              type="date"
              variant="outlined"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  );
};

TestComplementaryForm.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};

export default memo(TestComplementaryForm);
