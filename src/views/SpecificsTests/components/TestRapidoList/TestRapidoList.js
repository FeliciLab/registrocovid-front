import React, { memo } from 'react';
import useStyles from './styles';

import PropTypes from 'prop-types';

import { Card, Grid } from '@material-ui/core';
import TesteRapidoItem from '../TesteRapidoItem';
import TesteRapidoForm from '../TesteRapidoForm';
import { useFormikContext } from 'formik';

const TestRapidoList = ({ testes }) => {
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
          <TesteRapidoItem
            key={index}
            teste={teste}
          />
        ))}

        {values.newsTestsRapidos.map((newTeste, index) => (
          <TesteRapidoForm
            index={index}
            key={index}
          />
        ))}
      </Grid>
    </div>
  );
};

TestRapidoList.propTypes = {
  className: PropTypes.string,
  testes: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      data_realizacao: PropTypes.string,
      resultado: PropTypes.bool,
    }),
  ).isRequired,
};

export default memo(TestRapidoList);
