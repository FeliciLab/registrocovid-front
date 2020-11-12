import React from 'react';
import { Formik, Form } from 'formik';
import {
  FormControl
} from '@material-ui/core';
import FormHeaderComorbidade from 'views/Comorbidities/Form/FormHeaderComorbidade'
import FormBodyComorbidade from 'views/Comorbidities/Form/FormBodyComorbidade'
import { submitFormComorbidade } from 'models/comorbidades/ComorbidadeService'
import schema from '../schema';

const FormComorbidade = ({initValues}) => {
  return (
    <Formik
      enableReinitialize
      initialValues={initValues}
      onSubmit={submitFormComorbidade}
      validateOnMount
      validationSchema={schema}
    >
      <Form component={FormControl}>
        <FormHeaderComorbidade />
        <FormBodyComorbidade />
      </Form>
    </Formik>
  )
}

export default FormComorbidade;