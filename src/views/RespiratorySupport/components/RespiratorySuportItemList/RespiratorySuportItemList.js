import React from 'react';
import { Grid } from '@material-ui/core';
import RespiratorySuportItem from '../RespiratorySuportItem/RespiratorySuportItem';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '864px',
  },
}));

const RespiratorySuportItemList = props => {
  const { list, descricao } = props;

  const classes = useStyles();

  if (list.length === 0) return null;

  return (
    <Grid
      className={classes.root}
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
