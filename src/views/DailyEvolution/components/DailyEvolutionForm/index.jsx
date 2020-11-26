import { Card, FormControl, Grid } from '@material-ui/core';
import { PrevJSON } from 'components';
import { Form, Formik } from 'formik';
import React, { forwardRef, useImperativeHandle } from 'react';
import FieldsBlock from './FieldsBlock';
import schema from './schema';
import SelectType from './SelectType';

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
  escala_glasgow: 1,
  tipo_suporte_selected: 0,
  newSuportesRespitatorios: [],
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
      validationSchema={schema}
    >
      {({ isSubmitting, values }) => (
        <Form component={FormControl}>
          <Grid
            component={Card}
            container
            spacing={2}
          >
            <FieldsBlock />
            <SelectType />
          </Grid>
          {/* TODO: remover isso depois */}
          <PrevJSON
            data={values}
            name="Values"
          />
        </Form>
      )}
    </Formik>
  );
};

export default forwardRef(DailyEvolutionForm);
