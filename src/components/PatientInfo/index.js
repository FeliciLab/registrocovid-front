import React, { useEffect, useState } from 'react';

import { Button } from '@material-ui/core';

import useStyles from './styles';

const PatientInfo = (props) => {
  const classes = useStyles();
  const { patient: patientProps } = props;

  const [patient, setPatient] = useState(() => {
    const patientInfosAlreadExists = localStorage.getItem(`@RegistroCovid:patient-${patientProps?.prontuario}`);

    if (!patientInfosAlreadExists) {
      // Faz a request para a API
      const response = {
        prontuario: 'xxxxxxx',
        created_at: '05/08/2020',
      };

      localStorage.setItem(`@RegistroCovid:patient-${response.prontuario}`, JSON.stringify(response));

      return response;
    }

    return JSON.parse(patientInfosAlreadExists);
  });

  // useEffect(() => {
  //   async function loadInfos() {
  //     const patientInfosAlreadExists = localStorage.getItem(`@RegistroCovid:patient-${prontuario}`);

  //     if (patientInfosAlreadExists) {
  //       setPatient(JSON.parse(patientInfosAlreadExists));
  //       return;
  //     }

  //     // Faz a request para a API
  //     const response = {
  //       prontuario,
  //       created_at: '05/08/2020',
  //     };

  //     setPatient(response);

  //     localStorage.clear();
  //     localStorage.setItem(`@RegistroCovid:patient-${prontuario}`, JSON.stringify(response));
  //   }

  //   loadInfos();
  // }, []);

  return (
    <div>
      <Button
        style={{ pointerEvents: 'none' }}
        variant="outlined"
      >
        <div className={classes.button}>
          <span className={classes.spanButton}>Data de cadastro</span>
          <strong className={classes.strongButton}>{patient?.created_at}</strong>
        </div>
      </Button>

      <Button
        style={{ pointerEvents: 'none', marginLeft: 10 }}
        variant="outlined"
      >
        <div className={classes.button}>
          <span className={classes.spanButton}>Número de Prontuário</span>
          <strong className={classes.strongButton}>{patient?.prontuario}</strong>
        </div>
      </Button>
    </div>
  );
};

export default PatientInfo;

