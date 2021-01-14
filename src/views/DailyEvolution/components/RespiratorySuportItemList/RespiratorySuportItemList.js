import React from 'react';
import { Card, Grid } from '@material-ui/core';
import RespiratorySuportItem from '../RespiratorySuportItem/RespiratorySuportItem';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '684px',
    marginTop: theme.spacing(2),
  },
}));

const RespiratorySuportItemList = props => {
  const { list, descricao } = props;

  const classes = useStyles();

  if (!list || list.length === 0) return null;

  return (
    <Grid
      className={classes.root} component={Card} container
      item spacing={2}
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
