import React from 'react';
import useStyles from './styles';

import PropTypes from 'prop-types';

import { Grid, Card } from '@material-ui/core';
import IRASItem from '../IRASItem/IRASItem';

function IRASList({ irasList }) {
  const classes = useStyles();

  // para o caso de não ter elementos a serem apresentados
  if (irasList.length === 0) return null;

  return (
    <div className={classes.root}>
      <Grid
        component={Card}
        item
      >
        {irasList.map((iras, index) => (
          <IRASItem
            iras={iras}
            key={index}
          />
        ))}
      </Grid>
    </div>
  );
}

IRASList.propTypes = {
  irasList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      data: PropTypes.string.isRequired,
      descricao: PropTypes.string,
      tipo_iras_id: PropTypes.number.isRequired,
      tipo_iras_descricao: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default IRASList;
