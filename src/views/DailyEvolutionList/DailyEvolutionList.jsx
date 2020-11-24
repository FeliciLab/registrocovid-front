import React, { useCallback, useEffect, useState } from 'react';
import useStyles from './styles';
import DailyEvolutionListBreadcrumbs from './components/DailyEvolutionListBreadcrumbs';
import DailyEvolutionListTitle from './components/DailyEvolutionListTitle';
import { buscarEvolucoesDiarias } from 'services/requests/datasRequests';
import { Typography } from '@material-ui/core';
import { usePatient } from 'context/PatientContext';
import { PrevJSON } from 'components';

const DailyEvolutionList = () => {
  const classes = useStyles();

  const { patient } = usePatient(); // pegando o id o paciente

  const [evolucoesDiarias, setEvolucoesDiarias] = useState([]);

  const handleFecthEvolucoesDiarias = useCallback(async () => {
    const response = await buscarEvolucoesDiarias(patient.id);
    console.log(response);
    setEvolucoesDiarias(response);
  }, [patient.id]);

  useEffect(() => {
    handleFecthEvolucoesDiarias();
  }, [handleFecthEvolucoesDiarias]);

  return (
    <div className={classes.root}>
      <DailyEvolutionListBreadcrumbs />
      <DailyEvolutionListTitle />
      <Typography variant="h4">Lista de evoluções</Typography>
      <PrevJSON
        data={evolucoesDiarias}
        name="evolucoesDiarias"
      />
    </div>
  );
};

export default DailyEvolutionList;
