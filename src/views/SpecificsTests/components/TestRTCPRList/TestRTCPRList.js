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
        {testes.map(teste => (
          <TesteRTCPRItem
            key={teste}
            teste={teste}
          />
        ))}
      </Grid>
    </div>
  );
};

TestRTCPRList.propTypes = {
  className: PropTypes.string,
  testes: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      data_coleta: PropTypes.string,
      data_resultado: PropTypes.string,
      sitios_tipos: PropTypes.exact({
        id: PropTypes.number,
        descricao: PropTypes.string,
      }),
      rt_pcr_resultados: PropTypes.exact({
        id: PropTypes.number,
        descricao: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default memo(TestRTCPRList);
