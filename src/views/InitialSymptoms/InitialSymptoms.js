import React, { useState, useEffect } from 'react';

import DoneIcon from '@material-ui/icons/Done';
import {
  Typography,
  Button,
  Paper,
  RadioGroup,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Chip,
  TextField,
  Grid
} from '@material-ui/core';

import { Formik, Form, Field } from 'formik';

import useStyles from './styles';
import CustonBreadcrumbs from 'components/CustonBreadcrumbs';
import PatientInfo from 'components/PatientInfo';

// Card, RadioButton, Field --> date, Chip, Grid para responsividade

const sintomasListagem = [
  {
    id: 1,
    name: 'Síndrome Gripal'
  },
  {
    id: 2,
    name: 'Coriza'
  },
  {
    id: 3,
    name: 'Tosse (seca ou produtiva)'
  },
  {
    id: 4,
    name: 'Calafrios'
  },
  {
    id: 5,
    name: 'Outros sintomas'
  }
];

const sintomasPaciente = [
  {
    id: 1,
    name: 'Síndrome Gripal'
  },
  {
    id: 5,
    name: 'Outros sintomas'
  }
];

const InitialSymptoms = () => {
  const classes = useStyles();
  const [selectedSintomas, setSelectedSintomas] = useState([]);

  useEffect(() => {
    const sintomasPacientesIds = sintomasPaciente.map(sintoma => sintoma.id);

    setSelectedSintomas(sintomasPacientesIds);
  }, []);

  const handleClickChip = (sintomaId) => {
    const exists = selectedSintomas.some((selectedSintomaId) => selectedSintomaId === sintomaId);

    if (exists) {
      const updatedSelectedSintomas = selectedSintomas.filter((selectedSintomaId) => selectedSintomaId !== sintomaId);

      setSelectedSintomas(updatedSelectedSintomas);

    } else {
      setSelectedSintomas([...selectedSintomas, sintomaId]);
    }
  }

  const handleSubmit = (values) => {
    console.info(values);
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
      <Formik
        initialValues={{
          caso: '',
          dataInicio: ''
        }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form component={FormControl}>
            <div className={classes.titleWrapper}>
              <Typography variant="h1">Sintomas Iniciais</Typography>

              <div className={classes.patientWrapper}>
                <PatientInfo />
                <Button
                  className={classes.buttonSave}
                  color="secondary"
                  onClick={handleSubmit}
                  type="submit"
                  variant="contained"
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
              />
              <Grid
                item
                lg={8}
              >
                <Paper className={classes.paper}>
                  <FormGroup
                    className={classes.control}
                    component="fieldset"
                  >
                    <FormLabel
                      className={classes.label}
                      component="legend"
                    >Tipo caso à admissão:</FormLabel>

                    <Field
                      as={RadioGroup}
                      name="caso"
                      onChange={handleChange}
                      value={values.caso}
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
                    </Field>
                  </FormGroup>

                  <FormGroup
                    className={classes.control} 
                    component="fieldset"
                  >
                    <FormLabel
                      className={classes.label}
                      component="legend"
                    >Selecione os sintomas que o paciente apresentou</FormLabel>
                    <div className={classes.chipWrapper}>
                      {sintomasListagem.map(sintomaListagem => (
                        selectedSintomas.some((idSintoma) => idSintoma === sintomaListagem.id)
                          ?
                          <Chip
                            clickable
                            color="primary"
                            icon={<DoneIcon />}
                            key={sintomaListagem.id}
                            label={sintomaListagem.name}
                            onClick={() => handleClickChip(sintomaListagem.id)}
                          />
                          :
                          <Chip
                            clickable
                            key={sintomaListagem.id}
                            label={sintomaListagem.name}
                            onClick={() => handleClickChip(sintomaListagem.id)}
                          />
                      ))}
                    </div>
                  </FormGroup>

                  <FormGroup
                    className={classes.fixWidthSize}
                    component="fieldset"
                  >
                    <FormLabel
                      className={classes.label}
                      component="legend"
                    >Data do início dos sintomas</FormLabel>
                    <Field
                      InputLabelProps={{
                        shrink: true,
                      }}
                      as={TextField}
                      label="Início dos sintomas"
                      name="dataInicio"
                      onChange={handleChange}
                      type="date"
                      value={values.dataInicio}
                    />
                    
                  </FormGroup>
                </Paper>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      

    </div >
  );
}

export default InitialSymptoms;
