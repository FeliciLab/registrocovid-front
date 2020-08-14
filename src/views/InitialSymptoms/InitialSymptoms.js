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

import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';

import api from 'services/api';

import useStyles from './styles';
import CustonBreadcrumbs from 'components/CustonBreadcrumbs';
import PatientInfo from 'components/PatientInfo';

// Card, RadioButton, Field --> date, Chip, Grid para responsividade

const InitialSymptoms = () => {
  const { patient, addPatient } = usePatient();

  const { addToast } = useToast();
  const classes = useStyles();
  const [selectedSintomas, setSelectedSintomas] = useState([]);
  const [sintomasListagem, setSintomasListagem] = useState([{}]);

  useEffect(() => {
    api.get('/sintomas').then((response) => {
      
      setSintomasListagem(response.data);
    });

    setSelectedSintomas(patient.sintomas.map(sintoma => sintoma.id));
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

  const handleSubmit = async (values) => {

    const patientSubmitData = {
      sintomas: selectedSintomas,
      caso_confirmado: values.caso_confirmado === 'confirmed',
      data_inicio_sintomas: values.data_inicio_sintomas
    }

    const response = await api.patch(`/pacientes/${patient.id}`, patientSubmitData);

    addPatient(response.data);

    addToast({
      type: 'success',
      message: 'teste'
    });

    
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
          caso_confirmado: patient.caso_confirmado,
          data_inicio_sintomas: patient.data_inicio_sintomas
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
                      name="caso_confirmado"
                      onChange={handleChange}
                      value={values.caso_confirmado ? 'confirmed' : 'suspect'}
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
                            label={sintomaListagem.nome}
                            onClick={() => handleClickChip(sintomaListagem.id)}
                          />
                          :
                          <Chip
                            clickable
                            key={sintomaListagem.id}
                            label={sintomaListagem.nome}
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
                      name="data_inicio_sintomas"
                      onChange={handleChange}
                      type="date"
                      value={values.data_inicio_sintomas}
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
