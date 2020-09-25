import React, { useCallback, useState, useEffect } from 'react';
import useStyles from './styles';
import { usePatient } from 'context/PatientContext';
import {
  CustomBreadcrumbs,
  // FormikErroObserver
} from 'components';

import {
  CircularProgress,
  FormControl,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';

import { Formik, Form } from 'formik';
import schema from './schema';
import PatientInfo from 'components/PatientInfo';
import { useToast } from 'hooks/toast';
import { useHistory } from 'react-router-dom';
import SupportTreatmentItem from './components/SupportTreatmentItem';
import SupportTreatmentForm from './components/SupportTreatmentForm';
import api from 'services/api';

// Valores iniciais
const initialValues = {
  data_inicio: '',
  data_termino: '',
  motivo_hemodialise: '',
  frequencia_hemodialise: '',
};

function SupportTreatment() {
  const classes = useStyles();

  const { addToast } = useToast();

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  // Diz se foram o paciente tem infomções salvas previamente
  const [isPrevValue, setIsPrevValue] = useState(false);

  const [tratamento, setTratamento] = useState({});

  const {
    patient: { id },
  } = usePatient();

  // Buscando os dados no backend
  const handleSupportTreatments = useCallback(async id => {
    try {
      setLoading(true);

      const response = await api.get(`/pacientes/${id}/tratamento-suporte/`);

      // verifica se o objeto está vazio
      if (Object.entries(response.data.tratamento_suporte).length === 0)
        setIsPrevValue(false);
      else setIsPrevValue(true);

      setTratamento(response.data.tratamento_suporte);
    } catch (error) {
      addToast({
        type: 'error',
        message: 'Erro ao tentar carregar informações, tente novamente',
      });
      history.goBack();
    } finally {
      setLoading(false);
    }
  }, [addToast, history]);

  const handleSubmit = useCallback(
    async values => {
      try {
        await api.post(`/pacientes/${id}/tratamento-suporte/`, values);

        addToast({
          type: 'success',
          message: 'Dados salvos com sucesso.',
        });

        window.location.reload();
      } catch (error) {
        addToast({
          type: 'error',
          message: 'Algo de errado aconteceu',
        });
      }
    },
    [addToast, id],
  );

  useEffect(() => {
    handleSupportTreatments(id);
  }, [id, handleSupportTreatments]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustomBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'Hemodiálise',
              route: '/categorias/tratamento-suporte/',
            },
          ]}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <div className={classes.formWrapper}>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validateOnMount
              validationSchema={schema}
            >
              {({ isSubmitting }) => (
                <Form component={FormControl}>
                  <div className={classes.titleWrapper}>
                    <Typography variant="h2">Hemodiálise</Typography>
                    <Grid
                      className={classes.actionSection}
                      item
                    >
                      <PatientInfo />
                      <Button
                        className={classes.buttonSave}
                        color="secondary"
                        disabled={isSubmitting || isPrevValue}
                        type="submit"
                        variant="contained"
                      >
                        Salvar
                      </Button>
                    </Grid>
                  </div>

                  <Grid
                    className={classes.contentContainer}
                    container
                  >
                    {isPrevValue ? (
                      <SupportTreatmentItem tratamento={tratamento} />
                    ) : (
                      <SupportTreatmentForm />
                    )}
                  </Grid>

                  {/* TODO: colocar depois do primeiro MVP */}
                  {/* <FormikErroObserver /> */}
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupportTreatment;
