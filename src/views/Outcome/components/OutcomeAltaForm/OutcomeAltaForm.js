import React from 'react';
import PropTypes from 'prop-types';
import { Grid, FormLabel, Typography, IconButton, Card } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';

const OutcomeAltaForm = props => {
  const { index, remove } = props;

  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
    >
      <FormLabel className={classes.formLabel}>
        <Typography variant="h4">Cuidados paliativos</Typography>
        <IconButton
          aria-label="delete"
          onClick={() => remove(index)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </FormLabel>
    </Grid>
  );
}

OutcomeAltaForm.propTypes = {
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};


export default OutcomeAltaForm;
