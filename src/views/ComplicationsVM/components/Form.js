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
    try {

      /**
       * TODO Fazer envio da parte de Transfusão
       * TODO Fazer verificação do Yup para a descrição de outros e hemorragia
       * TODO Verificar se não está enviando novamente as complicações já salvas, adicionar complicação -> salvar -> "Espera reload" -> Repetir procedimento e verificar o que foi enviado
       */

      const jsonToSend = Object.entries(values).reduce((prev, curr) => {
        let index = curr[0].split('#');
        console.log(curr);

        if (prev[index[1]]) {
          if (index[0] === 'tipo_transfusao_id') {
            prev[index[1]][`${index[0]}`] = curr[1];
          } else {
            prev[index[1]][`${index[0]}`] = curr[1];
          }

          if (index[0] === 'descricao_outros') {
            prev[index[1]]['descricao'] = curr[1];
          }
        } else {
          if (index[0] === 'tipo_transfusao_id') {
            prev[index[1]] = Object.fromEntries([[index[0], parseInt(curr[1])]]);

          } else {
            prev[index[1]] = Object.fromEntries([[ index[0], curr[1] ]]);
          }

          if (index[0] === 'descricao_outros') {
            prev[index[1]] = Object.fromEntries([[ 'descricao', curr[1] ]]);
          }
        }
        return prev;
      }, {})

      const promisses = Object.values(jsonToSend).map(value =>
        api.post(`/pacientes/${patient.id}/ventilacao-mecanica`, value)
      );

      await Promise.all(promisses);

      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso'
      });

      // window.location.reload();
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

  const makeInitialValues = useCallback(() => {
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
          initialValues[`tipo_transfusao_id#${children.props.id}`] = formik.values[`tipo_transfusao_id#${children.props.id}`] || undefined;
          initialValues[`volume_transfusao#${children.props.id}`] = formik.values[`volume_transfusao#${children.props.id}`] || undefined;
          initialValues[`data_transfusao#${children.props.id}`] = formik.values[`data_transfusao#${children.props.id}`] || '';
          break;
        case 5:
          initialValues[`data_complicacao#${children.props.id}`] = formik.values[`data_complicacao#${children.props.id}`] || '';
          initialValues[`descricao_outros#${children.props.id}`] = formik.values[`descricao_outros#${children.props.id}`] || '';
          initialValues[`tipo_complicacao_id#${children.props.id}`] = 5;
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

  // useEffect(() => {
  //   if (!formik.isValid)
  //     addToast({
  //       type: 'error',
  //       message: 'Erro ao tentar registrar complicações, por favor verifique os cartões',
  //     });
  // }, [addToast, formik.isValid]);

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
