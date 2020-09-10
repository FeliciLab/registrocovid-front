import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useCallback
} from 'react';

import { Grid } from '@material-ui/core';
import { useFormik } from 'formik';

import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';

import api from 'services/api';

import schema from '../schema';

import useStyles from '../styles';

export const formContext = React.createContext({})

const Form = forwardRef((props, ref) => {
  const classes = useStyles();
  const { addToast } = useToast();
  const { patient } = usePatient();

  const [initialValues, setInitialValues] = useState({});

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      if (Object.keys(values).length === 0) {
        addToast({
          type: 'warning',
          message: 'Nenhum registro para ser salvo',
        });
        return;
      }

      const jsonToSend = Object.entries(values).reduce((prev, curr) => {
        let index = curr[0].split('#');

        if (prev[index[1]]) {
          prev[index[1]][`${index[0]}`] = curr[1];
        } else {
          prev[index[1]] = Object.fromEntries([[ index[0], curr[1] ]]);
        }
        return prev;
      }, {});

      await api.post(`/pacientes/${patient.id}/suportes-respiratorios`, Object.values(jsonToSend));

      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso'
      });

      window.location.reload();
    } catch {
      addToast({
        type: 'error',
        message: 'Erro ao salvar, tente novamente',
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

  const makeInitialValues = useCallback(() => {
    let initialValues = {};
    props.children[0].forEach(children => {
      switch (children.props?.newRecord) {
        case 1:
          initialValues[`tipo_suporte_id#${children.props.id}`] = 1;
          initialValues[`data_inicio#${children.props.id}`] = formik.values[`data_inicio#${children.props.id}`] || '';
          initialValues[`data_termino#${children.props.id}`] = formik.values[`data_termino#${children.props.id}`] || '';
          initialValues[`parametro#${children.props.id}`] = formik.values[`parametro#${children.props.id}`] || undefined;
          break;
        case 2:
          initialValues[`tipo_suporte_id#${children.props.id}`] = 2;
          initialValues[`data_inicio#${children.props.id}`] = formik.values[`data_inicio#${children.props.id}`] || '';
          initialValues[`data_termino#${children.props.id}`] = formik.values[`data_termino#${children.props.id}`] || '';
          initialValues[`parametro#${children.props.id}`] = formik.values[`parametro#${children.props.id}`] || undefined;
          break;
        case 3:
          initialValues[`tipo_suporte_id#${children.props.id}`] = 3;
          initialValues[`data_inicio#${children.props.id}`] = formik.values[`data_inicio#${children.props.id}`] || '';
          initialValues[`data_termino#${children.props.id}`] = formik.values[`data_termino#${children.props.id}`] || '';
          initialValues[`menos_24h_vmi#${children.props.id}`] = formik.values[`menos_24h_vmi#${children.props.id}`] || undefined;
          break;
        case 4:
          initialValues[`tipo_suporte_id#${children.props.id}`] = 4;
          initialValues[`data_inicio#${children.props.id}`] = formik.values[`data_inicio#${children.props.id}`] || '';
          initialValues[`data_termino#${children.props.id}`] = formik.values[`data_termino#${children.props.id}`] || '';
          break;
        case 5:
          initialValues[`tipo_suporte_id#${children.props.id}`] = 5;
          initialValues[`data_inicio#${children.props.id}`] = formik.values[`data_inicio#${children.props.id}`] || '';
          initialValues[`data_termino#${children.props.id}`] = formik.values[`data_termino#${children.props.id}`] || '';
          break;
        case 6:
          initialValues[`tipo_suporte_id#${children.props.id}`] = 6;
          initialValues[`data_inicio#${children.props.id}`] = formik.values[`data_inicio#${children.props.id}`] || '';
          initialValues[`data_termino#${children.props.id}`] = formik.values[`data_termino#${children.props.id}`] || '';
          initialValues[`parametro#${children.props.id}`] = formik.values[`parametro#${children.props.id}`] || undefined;
          break;
        case 7:
          initialValues[`tipo_suporte_id#${children.props.id}`] = 7;
          initialValues[`data_pronacao#${children.props.id}`] = formik.values[`data_pronacao#${children.props.id}`] || '';
          initialValues[`quantidade_horas#${children.props.id}`] = formik.values[`quantidade_horas#${children.props.id}`] || undefined;
          break;
        case 8:
          initialValues[`tipo_suporte_id#${children.props.id}`] = 8;
          initialValues[`data_inclusao_desmame#${children.props.id}`] = formik.values[`data_inclusao_desmame#${children.props.id}`] || '';
          break;
        default:
          break;
      }
    });
    return setInitialValues(initialValues);
  }, [formik.values, props.children]);

  useEffect(() => {
    makeInitialValues();
  }, [props.children, makeInitialValues]);

  const onDelete = useCallback((id) => {
    const values = formik.values;
    Object.keys(values).forEach(key => {
      if (key.includes(id)) {
        delete values[`${key}`];
      }
    })
  }, [formik.values]);

  useImperativeHandle(ref, () => {
    return {
      submit: formik.handleSubmit,
      setValues: onDelete,
    }
  }, [formik.handleSubmit, onDelete]);

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
