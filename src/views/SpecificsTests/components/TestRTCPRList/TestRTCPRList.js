import React, { memo } from 'react';
import PropTypes from 'prop-types';

import useStyles from './styles';

import { Card, Grid } from '@material-ui/core';
import TesteRTCPRItem from '../TesteRTCPRItem';
import { useFormikContext } from 'formik';
import TesteRTPCRForm from '../TesteRTPCRForm';

const TestRTCPRList = ({ testes }) => {
  const classes = useStyles();

  const { values } = useFormikContext();

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

        {values.newsTestsRTCPRs.map((newTeste, index) => (
          <TesteRTPCRForm
            index={index}
            key={index}
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
      sitio_tipo: PropTypes.string,
      rt_pcr_resultado: PropTypes.exact({
        id: PropTypes.number,
        descricao: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default memo(TestRTCPRList);
