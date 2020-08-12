import React from 'react';

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
  TextField
} from '@material-ui/core';

import useStyles from './styles';
import CustonBreadcrumbs from 'components/CustonBreadcrumbs';
import PatientInfo from 'components/PatientInfo';

// Card, RadioButton, Field --> date, Chip, Grid para responsividade

const InitialSymptoms = () => {
  const classes = useStyles();

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

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
            disabled
            type="submit"
            variant="contained"
          >
                    Salvar
          </Button>
        </div>

      </div>
      
      <Paper>
        <FormControl component="fieldset">
          <FormLabel component="legend">Tipo caso à admissão</FormLabel>
          <RadioGroup
            aria-label="case-type"
            name="case"
          >
            <FormControlLabel
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

        <FormControl component="fieldset">
          <FormLabel component="legend">Selecione os sintomas que o paciente apresentou</FormLabel>
          <div className={classes.chipWrapper}>
            <Chip
              clickable
              color="primary"
              icon={<DoneIcon/>}
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
              icon={<DoneIcon/>}
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
              icon={<DoneIcon/>}
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
              icon={<DoneIcon/>}
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
              icon={<DoneIcon/>}
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
              icon={<DoneIcon/>}
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
              icon={<DoneIcon/>}
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
              icon={<DoneIcon/>}
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
              icon={<DoneIcon/>}
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
          <FormLabel component="legend">Data do início dos sintomas</FormLabel>
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

    </div >
  );
}

export default InitialSymptoms;
