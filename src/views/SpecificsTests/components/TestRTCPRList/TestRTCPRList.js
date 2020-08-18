import React, { memo } from 'react';
import useStyles from './styles';

import { Card, Grid } from '@material-ui/core';
import TesteRTCPRItem from '../TesteRTCPRItem';

const TestRTCPRList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        component={Card}
        item
        spacing={2}
        xs={10}
      >
        <TesteRTCPRItem />
        <TesteRTCPRItem />
        <TesteRTCPRItem />
        <TesteRTCPRItem />
      </Grid>
    </div>
  );
};

export default memo(TestRTCPRList);
