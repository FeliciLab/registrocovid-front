import React, { useCallback, useRef } from 'react';
import { Button, Typography } from '@material-ui/core';
import PatientInfo from 'components/PatientInfo';
import { useParams } from 'react-router-dom';
import DailyEvolutionBreadcrumbs from './components/DailyEvolutionBreadcrumbs';
import useStyles from './styles';
import DailyEvolutionForm from './components/DailyEvolutionForm';

const DailyEvolution = () => {
  const classes = useStyles();

  const { id } = useParams();

  const formRef = useRef(null);

  /// TODO: saber ainda o que vou fazer com isso
  const disableButton = false;

  // TODO: implementar aqui passando o handleImperative do onSubmit do From
  const handleSubmit = useCallback(() => {
    console.log('DailyEvolution.handleSubmit');
    formRef.current.handleSubmit();
  }, []);

  return (
    <div className={classes.root}>
      <DailyEvolutionBreadcrumbs id={id} />
      <div>
        <div className={classes.titleWrapper}>
          <Typography variant="h3">Evolução diária</Typography>
          <div className={classes.rightContent}>
            <PatientInfo />
            <Button
              className={classes.buttonSave}
              color="secondary"
              disabled={disableButton}
              onClick={handleSubmit}
              type="submit"
              variant="contained"
            >
              Salvar
            </Button>
          </div>
        </div>
        <DailyEvolutionForm ref={formRef} />
      </div>
    </div>
  );
};

export default DailyEvolution;
