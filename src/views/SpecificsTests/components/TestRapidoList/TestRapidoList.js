import React from 'react';
import useStyles from './styles';

import { Card, Grid } from '@material-ui/core';
import TesteRapidoItem from '../TesteRapidoItem';

const TestRapidoList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        component={Card}
        item
        spacing={2}
        xs={10}
      >
        <TesteRapidoItem />
        <TesteRapidoItem />
        <TesteRapidoItem />
        <TesteRapidoItem />
      </Grid>
    </div>
  );
};

export default TestRapidoList;
