import React, {useState} from 'react';

import DoneIcon from '@material-ui/icons/Done';
import {
  Typography,
  Button,
  Paper,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  Chip,
  TextField,
  Grid
} from '@material-ui/core';

import useStyles from './styles';
import CustonBreadcrumbs from 'components/CustonBreadcrumbs';
import PatientInfo from 'components/PatientInfo';

// Card, RadioButton, Field --> date, Chip, Grid para responsividade

const InitialSymptoms = () => {
  const classes = useStyles();
  const [enabled, setEnabled] = useState(true);

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleSaveButton = () => {
    console.info('');
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            { label: 'Sintomas Iniciais', route: '/categorias/sintomas-iniciais' },
          ]}
        />
      </div>
      <div className={classes.titleWrapper}>
        <Typography variant="h1">Sintomas Iniciais</Typography>

        <div className={classes.patientWrapper}>
          <PatientInfo />

          <Button
            className={classes.buttonSave}
            color="secondary"
            disabled={!enabled}
            type="submit"
            variant="contained"
            onClick={handleSaveButton}
          >
            Salvar
          </Button>
        </div>

      </div>
      <Grid container>
        <Grid
          item
          lg={2}
          md={6}
        ></Grid>
        <Grid
          item
          lg={8}
        >
          <Paper className={classes.paper}>
            <FormControl
              className={classes.control}
              component="fieldset"
            >
              <FormLabel
                className={classes.label}
                component="legend"
              >Tipo caso à admissão:</FormLabel>
              <RadioGroup
                aria-label="case-type"
                name="case"
              >
                <FormControlLabel
                  className={classes.radio}
                  control={<Radio />}
                  label="Caso suspeito"
                  value="suspect"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Caso confirmado"
                  value="confirmed"
                />
              </RadioGroup>
            </FormControl>

            <FormControl
              className={classes.control} 
              component="fieldset"
            >
              <FormLabel
                className={classes.label}
                component="legend"
              >Selecione os sintomas que o paciente apresentou</FormLabel>
              <div className={classes.chipWrapper}>
                <Chip
                  clickable
                  color="primary"
                  icon={<DoneIcon />}
                  label="Síndrome gripal"
                  onClick={handleClick}
                  onDelete={handleDelete}
                />
                <Chip
                  clickable
                  label="Coriza"
                  onClick={handleClick}
                />
                <Chip
                  clickable
                  color="primary"
                  icon={<DoneIcon />}
                  label="Síndrome gripal"
                  onClick={handleClick}
                  onDelete={handleDelete}
                />
                <Chip
                  clickable
                  label="Coriza"
                  onClick={handleClick}
                />
                <Chip
                  clickable
                  color="primary"
                  icon={<DoneIcon />}
                  label="Síndrome gripal"
                  onClick={handleClick}
                  onDelete={handleDelete}
                />
                <Chip
                  clickable
                  label="Coriza"
                  onClick={handleClick}
                />
                <Chip
                  clickable
                  color="primary"
                  icon={<DoneIcon />}
                  label="Síndrome gripal"
                  onClick={handleClick}
                  onDelete={handleDelete}
                />
                <Chip
                  clickable
                  label="Coriza"
                  onClick={handleClick}
                />
                <Chip
                  clickable
                  color="primary"
                  icon={<DoneIcon />}
                  label="Síndrome gripal"
                  onClick={handleClick}
                  onDelete={handleDelete}
                />
                <Chip
                  clickable
                  label="Coriza"
                  onClick={handleClick}
                />
                <Chip
                  clickable
                  color="primary"
                  icon={<DoneIcon />}
                  label="Síndrome gripal"
                  onClick={handleClick}
                  onDelete={handleDelete}
                />
                <Chip
                  clickable
                  label="Coriza"
                  onClick={handleClick}
                />
                <Chip
                  clickable
                  color="primary"
                  icon={<DoneIcon />}
                  label="Síndrome gripal"
                  onClick={handleClick}
                  onDelete={handleDelete}
                />
                <Chip
                  clickable
                  label="Coriza"
                  onClick={handleClick}
                />
                <Chip
                  clickable
                  color="primary"
                  icon={<DoneIcon />}
                  label="Síndrome gripal"
                  onClick={handleClick}
                  onDelete={handleDelete}
                />
                <Chip
                  clickable
                  label="Coriza"
                  onClick={handleClick}
                />
                <Chip
                  clickable
                  color="primary"
                  icon={<DoneIcon />}
                  label="Síndrome gripal"
                  onClick={handleClick}
                  onDelete={handleDelete}
                />
                <Chip
                  clickable
                  label="Coriza"
                  onClick={handleClick}
                />
              </div>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel
                className={classes.label}
                component="legend"
              >Data do início dos sintomas</FormLabel>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="Início dos sintomas"
                name="data_sintomas"
                type="date"
              />
            </FormControl>
          </Paper>

        </Grid>
      </Grid>

    </div >
  );
}

export default InitialSymptoms;
