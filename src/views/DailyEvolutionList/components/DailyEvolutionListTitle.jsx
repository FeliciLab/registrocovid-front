import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import PatientInfo from 'components/PatientInfo';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rigthWrapper: {
    display: 'flex',
  }
}));

const DailyEvolutionListTitle = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3">Evolução diária</Typography>
      <div className={classes.rigthWrapper}>
        <PatientInfo />
        <Button
          className={classes.buttonSave}
          color="secondary"
          onClick={() => history.push('/categorias/')}
          startIcon={<AddIcon />}
          variant="contained"
        >
          INSERIR NOVA OCORRÊNCIA
        </Button>
      </div>
    </div>
  );
};

export default DailyEvolutionListTitle;
