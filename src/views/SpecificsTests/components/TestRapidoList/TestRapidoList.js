import React, { memo } from 'react';
import useStyles from './styles';

import PropTypes from 'prop-types';

import { Card, Grid } from '@material-ui/core';
import TesteRapidoItem from '../TesteRapidoItem';

const TestRapidoList = ({ testes }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        component={Card}
        item
        xs={10}
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
