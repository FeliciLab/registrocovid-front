import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Card, FormControl, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { buscarTiposSuporteRespiratorio } from 'services/requests/datasRequests';
import RespiratorySuportFormList from './RespiratorySuportFormList';
import FieldsBlock from './FieldsBlock';
import schema from './schema';
import SelectType from './SelectType';
import useStyles from './styles';
import api from 'services/api';
import { usePatient } from 'context/PatientContext';
import { useToast } from 'hooks/toast';
import { useHistory } from 'react-router-dom';

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
  escala_glasgow: 3,
  tipo_suporte_selected: 0,
  newSuportesRespitatorios: [],
};

const DailyEvolutionForm = (props, ref) => {
  const { tiposSuportesRespiratorios } = props;

  const classes = useStyles();

  const { patient } = usePatient();

  const { addToast } = useToast();

  const history = useHistory();

  const formikRef = useRef(null);

  // TODO: implementar
  const handleSubmit = async values => {
    const jsonToSend = {
      data_evolucao: values.data_evolucao,
      temperatura: values.temperatura || undefined,
      frequencia_respiratoria: values.frequencia_respiratoria || undefined,
      peso: values.peso || undefined,
      altura: values.altura || undefined,
      pressao_sistolica: values.pressao_sistolica || undefined,
      pressao_diastolica: values.pressao_diastolica || undefined,
      frequencia_cardiaca: values.frequencia_cardiaca || undefined,
      ausculta_pulmonar: values.ausculta_pulmonar || undefined,
      oximetria: values.oximetria || undefined,
      escala_glasgow: values.escala_glasgow || undefined,
    };
    const evolucoesDiariasPromose = api.post(
      `/pacientes/${patient.id}/evolucoes-diarias`,
      jsonToSend,
    );

    // try {
    //   await api.post(`/pacientes/${patient.id}/evolucoes-diarias`, jsonToSend);
    //   addToast({
    //     type: 'success',
    //     message: 'Dados salvos com sucesso',
    //   });

    //   history.push('/categorias/lista-exame-fisico');
    // } catch {
    //   addToast({
    //     type: 'error',
    //     message: 'Erro ao tentar registrar exame físico, tente novamente',
    //   });
    // }
    history.push('categorias/evolucao-diaria-list')''
  };

  useImperativeHandle(ref, () => ({
    handleSubmit: formikRef.current.handleSubmit,
  }));

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      innerRef={formikRef}
      onSubmit={handleSubmit}
      validateOnMount
      validationSchema={schema}
    >
      {({ isSubmitting, values }) => (
        <Form
          className={classes.form}
          component={FormControl}
        >
          <Grid
            className={classes.contentForm}
            component={Card}
            container
            spacing={2}
          >
            <FieldsBlock />
            <SelectType tipos={tiposSuportesRespiratorios} />
            <RespiratorySuportFormList tipos={tiposSuportesRespiratorios} />
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default forwardRef(DailyEvolutionForm);
