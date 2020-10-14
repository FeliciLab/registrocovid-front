import React from 'react';
import { Card, Grid } from '@material-ui/core';
import RespiratorySuportItem from '../RespiratorySuportItem/RespiratorySuportItem';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '864px',
    marginTop: theme.spacing(2)
  },
}));

const RespiratorySuportItemList = props => {
  const { list, descricao } = props;

  const classes = useStyles();

  if (list.length === 0) return null;

  return (
    <Grid
      className={classes.root}
      component={Card}
      container
      item
    >
      {list.map((item, index) => (
        <RespiratorySuportItem
          descricao={descricao}
          key={index}
          suporteRespiratorio={item}
        />
      ))}
    </Grid>
  );
};

export default RespiratorySuportItemList;
