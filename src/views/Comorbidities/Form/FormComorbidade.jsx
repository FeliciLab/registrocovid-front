import React from 'react';
import { useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import {
  FormControl
} from '@material-ui/core';
import FormHeaderComorbidade from 'views/Comorbidities/Form/FormHeaderComorbidade'
import FormBodyComorbidade from 'views/Comorbidities/Form/FormBodyComorbidade'
import { submitFormComorbidade } from 'models/comorbidades/ComorbidadeService'
import validationSchema from 'views/Comorbidities/Form/validationSchema';
import { useToast } from 'hooks/toast';


const FormComorbidade = ({ initValues }) => {
  const history = useHistory()
  const { addToast } = useToast()

  const handleSubmit = async (values) => {
    try {
      await submitFormComorbidade(values)
      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso',
      })

      history.push('/categorias')
    } catch (e) {
      console.log(e)
      addToast({
        type: 'error',
        message:
          'Ocorreu um erro ao salvar os dados, por favor tente novamente',
      })
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initValues}
      onSubmit={handleSubmit}
      validateOnMount
      validationSchema={validationSchema}
    >
      <Form component={FormControl}>
        <FormHeaderComorbidade />
        <FormBodyComorbidade />
      </Form>
    </Formik>
  )
}

export default FormComorbidade;