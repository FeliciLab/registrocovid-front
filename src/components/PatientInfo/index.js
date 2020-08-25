import React from 'react';

import { Paper, Typography } from '@material-ui/core';

import { usePatient } from 'context/PatientContext';

import useStyles from './styles';

const PatientInfo = props => {
  const classes = useStyles();

  const { ...rest } = props;

  const { patient } = usePatient();

  return (
    <div
      {...rest}
      className={classes.root}
    >
      <Paper
        className={classes.paperContainer}
        variant="outlined"
      >
        <Typography variant="caption">Data de cadastro</Typography>
        <Typography variant="subtitle1">
          <strong className={classes.strongButton}>{patient?.created_at}</strong>
        </Typography>
      </Paper>

      <Paper
        className={classes.paperContainer}
        variant="outlined"
      >
        <Typography variant="caption">Número de Prontuário</Typography>
        <Typography variant="subtitle1">
          <strong>{patient?.prontuario}</strong>
        </Typography>
      </Paper>

    </div>
  );
};

export default PatientInfo;
