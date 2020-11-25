import React from 'react';
import { useParams } from 'react-router-dom';
import DailyEvolutionBreadcrumbs from './components/DailyEvolutionBreadcrumbs';
import useStyles from './styles';

const DailyEvolution = () => {
  const classes = useStyles();

  const { id } = useParams();

  return (
    <div className={classes.root}>
      <DailyEvolutionBreadcrumbs id={id} />
    </div>
  );
};

export default DailyEvolution;
