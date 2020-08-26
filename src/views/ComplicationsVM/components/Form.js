import React, { useImperativeHandle, forwardRef, useEffect, useState } from 'react';

import mapValues from 'lodash/mapValues';

import {
  Grid,
} from '@material-ui/core';
import { useFormik, Formik } from 'formik';
import * as Yup from 'yup';

import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';

import api from 'services/api';

import useStyles from '../styles';
import { values } from 'underscore';

const schema = Yup.lazy(obj =>
  Yup.object(
    mapValues(obj, (value, key) => {
      // Transfusional
      if (key.includes('volumeTransfusional')) {
        return Yup.number().positive();
      }
      if (key.includes('dataTransfusional')) {
        return Yup.date().required('Campo Obrigatório');
      }
      // Extubacao
      if (key.includes('dataExtubacao')) {
        return Yup.date().required('Campo Obrigatório');
      }
      // Penumotorax
      if (key.includes('dataPneumotorax')) {
        return Yup.date().required('Campo Obrigatório');
      }
      // Hemorragia
      if (key.includes('localHemorragia')) {
        return Yup.string();
      }
      if (key.includes('dataHemorragia')) {
        return Yup.date().required('Campo Obrigatório');
      }
      // Outras
      if (key.includes('localOutros')) {
        return Yup.string().required();
      }
      if (key.includes('dataOutros')) {
        return Yup.date().required('Campo Obrigatório');
      }
    })
  )
)

export const formContext = React.createContext({})

const Form = forwardRef((props, ref) => {
  // const {  } = props;
  const classes = useStyles();
  const { addToast } = useToast();
  const { patient } = usePatient();
  const [initialValues, setInitialValues] = useState({});

  useEffect( () => {
    makeInitialValues();
  }, [props.children]);

  const handleSubmit = async (values) => {
    try {
      const jsonToSend = {

      };

      // await api.post(`/pacientes/${patient.id}/evolucoes-diarias`, jsonToSend);

      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso'
      });
      // window.location.reload();
    } catch {
      addToast({
        type: 'error',
        message: 'Erro ao tentar registrar complicações, tente novamente',
      });
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: schema,
    validateOnMount: true,
    abortEarly: false,
    enableReinitialize: true
  });

  useImperativeHandle(ref, () => {
    return {
      submit: formik.handleSubmit,
    }
  }, [formik.handleSubmit]);

  useEffect(() => {
    if (!formik.isValid)
      addToast({
        type: 'error',
        message: 'Erro ao tentar registrar complicações, por favor verifique os cartões',
      });
  }, [formik.isValidating]);

  const makeInitialValues = () => {
    const initialValues = {};
    props.children.forEach(children => {
      switch (children.props?.newComplication) {
        case 1:
          initialValues[`dataPneumotorax${children.props.id}`] = formik.values[`dataPneumotorax${children.props.id}`] || '';
          break;
        case 2:
          initialValues[`dataExtubacao${children.props.id}`] = formik.values[`dataExtubacao${children.props.id}`] || '';
          break;
        case 3:
          initialValues[`dataHemorragia${children.props.id}`] = formik.values[`dataHemorragia${children.props.id}`] || '';
          initialValues[`localHemorragia${children.props.id}`] = formik.values[`localHemorragia${children.props.id}`] || '';
          break;
        case 4:
          // initialValues[`tipo_transfusao_id${children.props.id}`] = formik.values[`tipo_transfusao_id${children.props.id}`] || '';
          initialValues[`dataTransfusional${children.props.id}`] = formik.values[`dataTransfusional${children.props.id}`] || '';
          initialValues[`volumeTransfusional${children.props.id}`] = formik.values[`volumeTransfusional${children.props.id}`] || '';
          break;
        case 5:
          initialValues[`dataOutros${children.props.id}`] = formik.values[`dataOutros${children.props.id}`] || '';
          initialValues[`localOutros${children.props.id}`] = formik.values[`localOutros${children.props.id}`] || '';
          break;
        default:
          break;
      }
    })
    return setInitialValues(initialValues);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        className={classes.formContainer}
        container
        justify={'center'}
      >
        <Grid
          item
          lg={12}
        >
          <formContext.Provider value={formik}>
            {props.children}
          </formContext.Provider>
        </Grid>
      </Grid>
    </form>
  )
});

export default Form;
