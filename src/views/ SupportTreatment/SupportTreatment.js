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
  Card,
} from '@material-ui/core';

import { Formik, Form } from 'formik';
import schema from './schema';
import PatientInfo from 'components/PatientInfo';
import ButtonAddOcorrencia from './components/ButtonAddOcorrencia';
import SupportTreatmentList from './components/SupportTreatmentList';
import { useToast } from 'hooks/toast';
import api from 'services/api';

// Valores iniciais
const initialValues = {
  newSupportTreatments: [],
};

function SupportTreatment() {
  const classes = useStyles();

  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);

  const [tratamentos, setTratamentos] = useState([]);

  const {
    patient: { id },
  } = usePatient();

  const handleSupportTreatments = useCallback(async id => {
    try {
      setLoading(true);
      const response = await api.get(`/pacientes/${id}/tratamentos-suportes/`);
      setTratamentos(old => [...old, ...response.data.tratamentos_suportes]);
    } catch(error) {
      // TODO: tratar os erros aqui
      console.log(error);
    }finally {
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

        await api.post(`/pacientes/${id}/tratamentos-suportes/`, newSupportTreatments);

        addToast({
          type: 'success',
          message: 'Dados salvos com sucesso.',
        });

        window.location.reload();
      } catch (error) {
        console.log(error);
        // addToast({
        //   type: 'error',
        //   message: 'Algo de errado aconteceu',
        // });
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
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                      >
                        Salvar
                      </Button>
                    </Grid>
                  </div>
                  <Grid
                    className={classes.supportTreatmentContainer}
                    component={Card}
                    container
                    item
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
