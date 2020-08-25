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
        return Yup.string().required();
      }
      if (key.includes('dataTransfusional')) {
        return Yup.date().required();
      }
      // Extubacao
      if (key.includes('dataExtubacao')) {
        return Yup.date().required();
      }
      // Penumotorax
      if (key.includes('dataPneumotorax')) {
        return Yup.date().required();
      }
      // Hemorragia
      if (key.includes('localHemorragia')) {
        return Yup.string().required();
      }
      if (key.includes('dataHemorragia')) {
        return Yup.date().required();
      }
      // Outras
      if (key.includes('localOutros')) {
        return Yup.string().required();
      }
      if (key.includes('dataOutros')) {
        return Yup.date().required();
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
  }, [props.children])

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
    enableReinitialize:true
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
    props.children.forEach( children => {
      switch (children.props.newComplication.complication) {
        case 1:
          initialValues[`dataExtubacao${children.props.newComplication.id}`] = formik.values[`dataExtubacao${children.props.newComplication.id}`] || '';
          break;
        case 2:
          initialValues[`dataPneumotorax${children.props.newComplication.id}`] = formik.values[`dataPneumotorax${children.props.newComplication.id}`] || '';
          break;
        case 3:
          initialValues[`dataHemorragia${children.props.newComplication.id}`] = formik.values[`dataHemorragia${children.props.newComplication.id}`] || '';
          initialValues[`localHemorragia${children.props.newComplication.id}`] = formik.values[`localHemorragia${children.props.newComplication.id}`] || '';
          break;
        case 4:
          initialValues[`dataTransfusional${children.props.newComplication.id}`] = formik.values[`dataTransfusional${children.props.newComplication.id}`] || '';
          initialValues[`volumeTransfusional${children.props.newComplication.id}`] = formik.values[`volumeTransfusional${children.props.newComplication.id}`] || '';
          break;
        case 5:
          initialValues[`dataOutros${children.props.newComplication.id}`] = formik.values[`dataOutros${children.props.newComplication.id}`] || '';
          initialValues[`localOutros${children.props.newComplication.id}`] = formik.values[`localOutros${children.props.newComplication.id}`] || '';
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
