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
  Grid,
  CircularProgress
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
  const [selectedSintomasHasChanged, setSelectedSintomasHasChanged] = useState(false);
  const [sintomasListagem, setSintomasListagem] = useState([{}]);

  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    try {
      api.get('/sintomas').then((response) => {

        setSintomasListagem(response.data);
      });

      setSelectedSintomas(patient.sintomas?.map(sintoma => sintoma.id) || []);
      setIsFetching(false);
    } catch (err) {
      addToast({
        type: 'error',
        message: 'Ocorreu um erro ao carregar os sintomas, por favor tente novamente'
      });
      setIsFetching(false);
    }
  }, []);


  // Checando se os sintomas selecionados são o mesmo do que o paciente já possui
  useEffect(() => {
    if (patient.sintomas.length !== selectedSintomas.length) {
      setSelectedSintomasHasChanged(true);
    } else {
      const checkHasNotChanged = selectedSintomas.every((sintomaId) => {
        const index = patient.sintomas.findIndex((sintoma) => sintoma.id === sintomaId);

        return index > -1;
      });

      setSelectedSintomasHasChanged(!checkHasNotChanged);
    }


  }, [selectedSintomas]);

  const handleClickChip = async (sintomaId) => {
    const exists = selectedSintomas.some((selectedSintomaId) => selectedSintomaId === sintomaId);

    if (exists) {
      const updatedSelectedSintomas = selectedSintomas.filter((selectedSintomaId) => selectedSintomaId !== sintomaId);

      setSelectedSintomas(updatedSelectedSintomas);

    } else {

      setSelectedSintomas([...selectedSintomas, sintomaId]);
    }
  }

  const handleSubmit = async (values, dirty) => {
    try {
      if ((!dirty && !selectedSintomasHasChanged) || isSaving) {
        return;
      }

      const patientSubmitData = {
        sintomas: selectedSintomas,
        caso_confirmado: values.caso_confirmado === 'confirmed',
        data_inicio_sintomas: values.data_inicio_sintomas
      }

      let response = await api.patch(`/pacientes/${patient.id}`, patientSubmitData);

      addPatient({
        ...patient,
        sintomas: response.data.sintomas,
        caso_confirmado: values.caso_confirmado === 'confirmed',
        data_inicio_sintomas: values.data_inicio_sintomas
      });


      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso'
      });

      setIsSaving(false);
    } catch (err) {
      addToast({
        type: 'error',
        message: 'Ocorreu um erro ao salvar os dados, por favor, tente novamente'
      });
      setIsSaving(false);
    }
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
          caso_confirmado: patient.caso_confirmado ? 'confirmed' : 'suspect',
          data_inicio_sintomas: patient.data_inicio_sintomas
        }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, dirty }) => (
          <Form component={FormControl}>
            <div className={classes.titleWrapper}>
              <Typography variant="h1">Sintomas Iniciais</Typography>

              <div className={classes.patientWrapper}>
                <PatientInfo />
                <Button
                  className={classes.buttonSave}
                  color="secondary"
                  disabled={(!dirty && !selectedSintomasHasChanged) || isSaving}
                  type="submit"
                  variant="contained"
                >
                  {isSaving ? 'Salvando...' : 'Salvar'}
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
                      value={values.caso_confirmado}
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
                      {isFetching ? <CircularProgress /> :
                        sintomasListagem?.map(sintomaListagem => (
                          selectedSintomas?.some((idSintoma) => idSintoma === sintomaListagem.id)
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
