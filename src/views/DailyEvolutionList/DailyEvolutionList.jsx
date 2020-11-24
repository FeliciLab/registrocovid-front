import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './styles';
import { usePatient } from 'context/PatientContext';
import DailyEvolutionListBreadcrumbs from './components/DailyEvolutionListBreadcrumbs';
import DailyEvolutionListTitle from './components/DailyEvolutionListTitle';

const DailyEvolutionList = () => {
  const { patient } = usePatient();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DailyEvolutionListBreadcrumbs />
      <DailyEvolutionListTitle />
      <Typography variant="h1">Evolução diária</Typography>
      <Typography variant="h1">{patient.id}</Typography>
    </div>
  );
};

export default DailyEvolutionList;
