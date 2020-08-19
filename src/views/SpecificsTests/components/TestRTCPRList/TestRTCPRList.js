import React, { memo } from 'react';
import PropTypes from 'prop-types';

import useStyles from './styles';

import { Card, Grid } from '@material-ui/core';
import TesteRTCPRItem from '../TesteRTCPRItem';

const TestRTCPRList = ({ testes }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        component={Card}
        item
        xs={10}
      >
        {testes.map((teste) => (
          <TesteRTCPRItem
            key={teste}
            teste={teste}
          />
        ))}
      </Grid>
    </div>
  );
};

//TODO: colocar aqui os atributos do
TestRTCPRList.propTypes = {
  className: PropTypes.string,
  testes: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      data_coleta: PropTypes.string,
      sitio_amostra: PropTypes.string,
      data_resultado: PropTypes.string,
      resultado: PropTypes.string,
    }),
  ).isRequired,
};

export default memo(TestRTCPRList);
