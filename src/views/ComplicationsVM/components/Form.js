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
      if (key.includes('data_complicacao')) {
        return Yup.date().required('Campo Obrigatório');
      }
      // Hemorragia
      if (key.includes('descricao')) {
        return Yup.string();
      }
      // Outras
      if (key.includes('descricaoOutros')) {
        return Yup.string().required();
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

  useEffect(() => {
    makeInitialValues();
  }, [props.children]);

  const handleSubmit = async (values) => {
    try {
      
      /** 
       * TODO Fazer envio da parte de Transfusão
       * TODO Fazer verificação do Yup para a descrição de outros e hemorragia
       * TODO Verificar se não está enviando novamente as complicações já salvas, adicionar complicação -> salvar -> "Espera reload" -> Repetir procedimento e verificar o que foi enviado
       */

      const teste = Object.entries(values).reduce((prev, curr) => {
        let index = curr[0].split('#');
        if (prev[index[1]]) {
          prev[index[1]][`${index[0]}`] = curr[1];
        } else {
          if (index[0] === 'tipo_transfusao_id') {
            prev[index[1]] = Object.fromEntries([[index[0], parseInt(curr[1])]]);
          } else {
            prev[index[1]] = Object.fromEntries([[ index[0], curr[1] ]]);
          }
        }
        return prev;
      }, {})

      const promisses = Object.values(teste).map( value => 
        api.post(`/pacientes/${patient.id}/ventilacao-mecanica`, value)
      )

      Promise.all(promisses).then(() => {
        addToast({
          type: 'success',
          message: 'Dados salvos com sucesso'
        });
        
        window.location.reload();
      });

      // await api.post(`/pacientes/${patient.id}/evolucoes-diarias`, jsonToSend);

    } catch (err) {
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

  const onDelete = (id) => {
    const values = formik.values;
    Object.keys(values).forEach(key => {
      if (key.includes(id)) {
        delete values[`${key}`];
      }
    })
  }
  useImperativeHandle(ref, () => {
    return {
      submit: formik.handleSubmit,
      setValues: onDelete,
    }
  }, [formik.handleSubmit, onDelete]);

  useEffect(() => {
    if (!formik.isValid)
      addToast({
        type: 'error',
        message: 'Erro ao tentar registrar complicações, por favor verifique os cartões',
      });
  }, [formik.isValidating]);

  const makeInitialValues = () => {
    let initialValues = {};
    props.children[0].forEach(children => {
      switch (children.props?.newComplication) {
        case 1:
          initialValues[`data_complicacao#${children.props.id}`] = formik.values[`data_complicacao#${children.props.id}`] || '';
          initialValues[`tipo_complicacao_id#${children.props.id}`] = 1;
          break;
        case 2:
          initialValues[`data_complicacao#${children.props.id}`] = formik.values[`data_complicacao#${children.props.id}`] || '';
          initialValues[`tipo_complicacao_id#${children.props.id}`] = 2;
          break;
        case 3:
          initialValues[`data_complicacao#${children.props.id}`] = formik.values[`data_complicacao#${children.props.id}`] || '';
          initialValues[`descricao#${children.props.id}`] = formik.values[`descricao#${children.props.id}`] || '';
          initialValues[`tipo_complicacao_id#${children.props.id}`] = 3;
          break;
        case 4:
          initialValues[`tipo_transfusao_id${children.props.id}`] = formik.values[`tipo_transfusao_id${children.props.id}`] || '';
          initialValues[`dataTransfusional${children.props.id}`] = formik.values[`dataTransfusional${children.props.id}`] || '';
          initialValues[`volumeTransfusional${children.props.id}`] = formik.values[`volumeTransfusional${children.props.id}`] || '';
          initialValues[`tipo_complicacao_id#${children.props.id}`] = 4;
          break;
        case 5:
          initialValues[`data_complicacao#${children.props.id}`] = formik.values[`data_complicacao#${children.props.id}`] || '';
          initialValues[`descricao#${children.props.id}`] = formik.values[`descricao#${children.props.id}`] || '';
          initialValues[`tipo_complicacao_id#${children.props.id}`] = 5;
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
