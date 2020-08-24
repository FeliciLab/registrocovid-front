import React from 'react';

import { Button } from '@material-ui/core';

import { usePatient } from 'context/PatientContext';

import useStyles from './styles';

const PatientInfo = () => {
  const classes = useStyles();
  const { patient } = usePatient();

  return (
    <div>
      <Button
        className={classes.buttonContainer}
        variant="outlined"
      >
        <div className={classes.button}>
          <span className={classes.spanButton}>Data de cadastro</span>
          <strong className={classes.strongButton}>
            {patient?.created_at}
          </strong>
        </div>
      </Button>

      <Button
        className={classes.buttonContainer}
        variant="outlined"
      >
        <div className={classes.button}>
          <span className={classes.spanButton}>Número de Prontuário</span>
          <strong className={classes.strongButton}>
            {patient?.prontuario}
          </strong>
        </div>
      </Button>
    </div>
  );
};

export default PatientInfo;
