import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Card, FormControl, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
// import RespiratorySuportFormList from './RespiratorySuportFormList';
import FieldsBlock from './FieldsBlock';
import schema from './schema';
import SelectType from './SelectType';
import useStyles from './styles';
import { usePatient } from 'context/PatientContext';
import { useToast } from 'hooks/toast';
import { useHistory } from 'react-router-dom';
import {
  getInitialValues,
  postEvolucaoDiaria,
} from 'models/evolucoesDiarias/EvolucaoDiariaService';
import ArrayOldSuportesRespiratorios from './ArrayOldSuportesRespiratorios';
import ArrayNewSuportesRespiratorios from './ArrayNewSuportesRespiratorios';

const DailyEvolutionForm = (props, ref) => {
  const {
    tiposSuportesRespiratorios,
    evolucaoDiaria,
    oldSuportesRespiratorios,
  } = props;

  const classes = useStyles();

  const { patient } = usePatient();

  const { addToast } = useToast();

  const history = useHistory();

  const formikRef = useRef(null);

  const handleSubmit = async values => {
    try {
      await postEvolucaoDiaria(values, patient);
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
      initialValues={getInitialValues(evolucaoDiaria, oldSuportesRespiratorios)}
      innerRef={formikRef}
      onSubmit={handleSubmit}
      validateOnMount
      validationSchema={schema}
    >
      {() => (
        <Form className={classes.form} component={FormControl}>
          <Grid
            className={classes.contentForm}
            component={Card}
            container
            spacing={2}
          >
            <FieldsBlock />
            <SelectType tipos={tiposSuportesRespiratorios} />
            {/* <RespiratorySuportFormList tipos={tiposSuportesRespiratorios} /> */}
            
            <ArrayNewSuportesRespiratorios tipos={tiposSuportesRespiratorios} />
            <ArrayOldSuportesRespiratorios tipos={tiposSuportesRespiratorios} />
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default forwardRef(DailyEvolutionForm);
