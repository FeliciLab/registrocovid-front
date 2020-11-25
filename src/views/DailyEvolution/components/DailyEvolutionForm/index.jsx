import {
  Card,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
} from '@material-ui/core';
import { PrevJSON } from 'components';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { forwardRef, useImperativeHandle } from 'react';

const initialValues = {
  data_evolucao: '',
  temperatura: '',
  frequencia_respiratoria: '',
  peso: '',
  altura: '',
  pressao_sistolica: '',
  pressao_diastolica: '',
  frequencia_cardiaca: '',
  ausculta_pulmonar: '',
  oximetria: '',
  escala_glasgow: 0,
};

const DailyEvolutionForm = (props, ref) => {
  // TODO: implementar
  const handleSubmit = () => {
    console.log('DailyEvolutionForm.handleSubmit');
  };

  useImperativeHandle(ref, () => {
    return {
      handleSubmit,
    };
  });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnMount
      // validationSchema={schema}
    >
      {({ isSubmitting, values }) => (
        <Form component={FormControl}>
          {/* TODO: remover isso */}
          <PrevJSON
            data={values}
            name="Values"
          />
          <Grid
            component={Card}
            container
            spacing={2}
          >
            {/* data_evolucao */}
            <Grid
              item
              xs={12}
            >
              <FormGroup>
                <FormLabel>
                  <Typography variant="h4">Data de evolução*</Typography>
                </FormLabel>
                <Field
                  component={TextField}
                  name="data_evolucao"
                  type="date"
                />
              </FormGroup>
            </Grid>

            {/* temperatura */}
            <Grid
              item 
              xs={6}
            >
              <FormGroup>
                <FormLabel>
                  <Typography variant="h4">Data de evolução*</Typography>
                </FormLabel>
                <Field
                  component={TextField}
                  name="temperatura"
                  type="number"
                  variant="outlined"
                />
              </FormGroup>
            </Grid>

            {/* temperatura */}
            <Grid
              item 
              xs={6}
            >
              <FormGroup>
                <FormLabel>
                  <Typography variant="h4">Data de evolução*</Typography>
                </FormLabel>
                <Field
                  component={TextField}
                  name="temperatura"
                  type="number"
                  variant="outlined"
                />
              </FormGroup>
            </Grid>
          </Grid>
          
        </Form>
      )}
    </Formik>
  );
};

export default forwardRef(DailyEvolutionForm);
