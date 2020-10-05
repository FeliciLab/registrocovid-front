import React, { memo } from 'react';
import useStyles from './styles';

import PropTypes from 'prop-types';

import { Card, Grid } from '@material-ui/core';
import TestComplementatyItem from '../TestComplementatyItem';

const TestComplementaryList = props => {
  const classes = useStyles();

  const { testes, descricao } = props;

  if (testes.length === 0) {
    return null
  }

  return (
    <div className={classes.root}>
      <Grid
        component={Card}
        item
      >
        {testes &&
          testes.map((teste, index) => (
            <TestComplementatyItem
              descricao={descricao}
              key={index}
              teste={teste}
            />
          ))}
      </Grid>
    </div>
  );
};

TestComplementaryList.propTypes = {
  className: PropTypes.string,
  descricao: PropTypes.string.isRequired,
  testes: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      tipo_exame_id: PropTypes.number,
      data: PropTypes.string,
      resultado: PropTypes.string,
      descricao: PropTypes.string,
    }),
  ),
};

export default memo(TestComplementaryList);
