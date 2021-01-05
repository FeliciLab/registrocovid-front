import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Card, FormControl, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
// import { buscarTiposSuporteRespiratorio } from 'services/requests/datasRequests';
import RespiratorySuportFormList from './RespiratorySuportFormList';
import FieldsBlock from './FieldsBlock';
import schema from './schema';
import SelectType from './SelectType';
import useStyles from './styles';
import api from 'services/api';
import { usePatient } from 'context/PatientContext';
import { useToast } from 'hooks/toast';
import { useHistory } from 'react-router-dom';
import { getInitialValues } from 'models/evolucoesDiarias/EvolucaoDiariaService';

const DailyEvolutionForm = (props, ref) => {
  const { tiposSuportesRespiratorios, evolucaoDiaria } = props;

  const classes = useStyles();

  const { patient } = usePatient();

  const { addToast } = useToast();

  const history = useHistory();

  const formikRef = useRef(null);

  // TODO: implementar
  const handleSubmit = async values => {
    try {
      const jsonToSend = {
        data_evolucao: values.data_evolucao || undefined,
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

      await api.post(`/pacientes/${patient.id}/evolucoes-diarias`, jsonToSend);
      
      const promises = values.newSuportesRespitatorios.map(elem =>
        api.post(`/pacientes/${patient.id}/suportes-respiratorios`, elem),
      );
      await Promise.all(promises);
      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso',
      });
      history.push('/categorias/evolucao-diaria-list/');
    } catch {
      addToast({
        type: 'error',
        message: 'Erro ao tentar registrar exame físico, tente novamente',
      });
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit: formikRef.current.handleSubmit,
  }));

  return (
    <Formik
      enableReinitialize
      initialValues={getInitialValues(evolucaoDiaria)}
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
          <Grid item>
            <pre>{JSON.stringify(values.newSuportesRespitatorios, null, 2)}</pre>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default forwardRef(DailyEvolutionForm);
