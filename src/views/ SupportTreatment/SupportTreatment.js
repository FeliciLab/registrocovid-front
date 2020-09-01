import React, { useCallback, useState, useEffect } from 'react';
import useStyles from './styles';
import { usePatient } from 'context/PatientContext';
import {
  CustonBreadcrumbs,
  // FormikErroObserver
} from 'components';

import {
  CircularProgress,
  FormControl,
  Typography,
  Grid,
  Button,
  // Card,
} from '@material-ui/core';

import { Formik, Form } from 'formik';
import schema from './schema';
import PatientInfo from 'components/PatientInfo';
// import ButtonAddOcorrencia from './components/ButtonAddOcorrencia';
// import SupportTreatmentList from './components/SupportTreatmentList';
import { useToast } from 'hooks/toast';
import api from 'services/api';
import { useHistory } from 'react-router-dom';
import apiFake from 'services/apiFake';
import SupportTreatmentItem from './components/SupportTreatmentItem';
import SupportTreatmentForm from './components/SupportTreatmentForm';

// Valores iniciais
const initialValues = {
  newSupportTreatment: {
    data_inicio: '',
    data_termino: '',
    motivo_hemodialise: '',
    frequencia_hemodialise: '',
  },
};

function SupportTreatment() {
  const classes = useStyles();

  const { addToast } = useToast();

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [isPrevValue, setIsPrevValue] = useState(false);

  const [tratamento, setTratamento] = useState({});

  const {
    patient: { id },
  } = usePatient();

  const handleSupportTreatments = useCallback(async id => {
    try {
      console.log(id);
      setLoading(true);
      const response = await apiFake.get('/tratamento_suporte_2');
      if (Object.entries(response.data).length === 0) {
        setIsPrevValue(false);
      } else {
        setIsPrevValue(true);
      }
      console.log(response.data);
      setTratamento(response.data);
    } catch (error) {
      addToast({
        type: 'error',
        message: 'Erro ao tentar carregar informações, tente novamente',
      });
      history.goBack();
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(
    async values => {
      try {
        const { newSupportTreatments } = values;

        // tentando salvar mas sem nada para enviar
        if (newSupportTreatments.length === 0) {
          addToast({
            type: 'warning',
            message: 'Nada para salvar.',
          });
          return;
        }

        await api.post(
          `/pacientes/${id}/tratamentos-suportes/`,
          newSupportTreatments,
        );

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
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'Tratamento de Suporte',
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
                    <Typography variant="h2">Tratamento de suporte</Typography>
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
                  {isPrevValue ? (
                    <SupportTreatmentItem tratamento={tratamento} />
                  ) : (
                    <SupportTreatmentForm />
                  )}

                  {/* <Grid
                    className={classes.supportTreatmentContainer}
                    component={Card}
                    container
                    item
                    md={10}
                    sm={12}
                    spacing={2}
                  >
                    <Grid item>
                      <Typography variant="h3">
                        Adicionar tratamento de suporte (hemodiálise):
                      </Typography>
                    </Grid>
                    <Grid item>
                      <ButtonAddOcorrencia />
                    </Grid>
                    <Grid item>
                      <SupportTreatmentList tratamentos={tratamentos} />
                    </Grid>
                  </Grid> */}

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
