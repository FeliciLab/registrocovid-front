import React, { memo } from 'react';
import useStyles from './styles';

import PropTypes from 'prop-types';

import { Card, Grid } from '@material-ui/core';
import TesteRapidoItem from '../TesteRapidoItem';

const TestRapidoList = props => {
  const classes = useStyles();

  const { testes } = props;

  if (testes.length === 0) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Grid
        component={Card}
        item
      >
        {testes.map((teste, index) => (
          <TesteRapidoItem
            key={index}
            teste={teste}
          />
        ))}
      </Grid>
    </div>
  );
};

TestRapidoList.propTypes = {
  className: PropTypes.string,
  testes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      data_realizacao: PropTypes.string,
      resultado: PropTypes.bool,
    }),
  ).isRequired,
};

export default memo(TestRapidoList);
