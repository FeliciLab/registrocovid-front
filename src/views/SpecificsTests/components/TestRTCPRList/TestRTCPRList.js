import React, { memo } from 'react';
import PropTypes from 'prop-types';

import useStyles from './styles';

import { Card, Grid } from '@material-ui/core';
import TesteRTCPRItem from '../TesteRTCPRItem';

const TestRTCPRList = props => {
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
        xs={10}
      >
        {testes.map((teste, index) => (
          <TesteRTCPRItem
            key={index}
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
    PropTypes.shape({
      id: PropTypes.number,
      data_coleta: PropTypes.string,
      data_resultado: PropTypes.string,
      sitio_tipo: PropTypes.string,
      rt_pcr_resultado: PropTypes.exact({
        id: PropTypes.number,
        descricao: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default memo(TestRTCPRList);
