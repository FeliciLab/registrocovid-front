import React, { useImperativeHandle, forwardRef } from 'react';

import {
  Grid,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';

import api from 'services/api';

import useStyles from '../styles';

const schema = Yup.object().shape({

});

const Form = forwardRef((props, ref) => {
  // const {  } = props;
  const classes = useStyles();
  const { addToast } = useToast();
  const { patient } = usePatient();

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const jsonToSend = {

      };

      await api.post(`/pacientes/${patient.id}/evolucoes-diarias`, jsonToSend);

      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso'
      });
      window.location.reload();
    } catch {
      addToast({
        type: 'error',
        message: 'Erro ao tentar registrar complicações, tente novamente',
      });
    }
  };

  const formik = useFormik({
    initialValues: {

    },
    onSubmit: handleSubmit,
    validationSchema: schema,
    validateOnMount: true,
    abortEarly: false,
  });

  useImperativeHandle(ref, () => {
    return {
      submit: formik.handleSubmit,
    }
  }, [formik.handleSubmit]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.formContainer}>
        <Grid container />
      </div>
    </form>
  )
});

export default Form;
