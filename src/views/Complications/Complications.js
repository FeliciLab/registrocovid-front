import React, { useState, useCallback, useEffect } from 'react';

import useStyles from './styles';
import { CustonBreadcrumbs } from 'components';
import { useParams, useHistory } from 'react-router-dom';
import {
  CircularProgress,
  FormControl,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import schema from './schema';
import SelectComplicationType from './components/SelectComplicationType';
import ComplicationsList from './components/ComplicationsList';
import api from 'services/api';
import { useToast } from 'hooks/toast';
import PatientInfo from 'components/PatientInfo';
import { usePatient } from 'context/PatientContext';

// Valores iniciais
const initialValues = {
  newsComplicacoes: [],
  tipo_new_complication: '',
};

const Complications = () => {
  let { id } = useParams();

  const { patient } = usePatient();

  id = id ? id : patient.id;

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [complicacoes, setComplicacoes] = useState([]);
  const [tipoComplicacoes, setTipoComplicacoes] = useState([]);
  const history = useHistory();

  const { addToast } = useToast();

  const handleComplicationsFull = useCallback(
    async id => {
      try {
        setLoading(true);

        const [complications, tipoComplications] = await Promise.all([
          api.get(`pacientes/${patient.id}/complicacoes`),
          api.get(`tipos-complicacoes`),
        ]);

        setComplicacoes(comp => [...comp, ...complications.data]);
        setTipoComplicacoes(comp => [...comp, ...tipoComplications.data]);
      } catch (err) {
        addToast({
          type: 'error',
          message: 'Algo inesperado aconteceu. Tente novamente.',
        });
        history.goBack();
      } finally {
        setLoading(false);
      }
    },
    [addToast, history],
  );

  useEffect(() => {
    handleComplicationsFull(id);
  }, [handleComplicationsFull, id]);

  const handleSubmit = async ({ newsComplicacoes }) => {
    try {
      // sanitizando os dasos de newsTestsRTCPRs para o envio dos testes novos
      const newsComplicacoesSanitized = newsComplicacoes.map(complicacao => ({
        tipo_complicacao_id: complicacao.tipo_complicacao_id,
      }));

      // criando as promises
      const newsComplicacoesPromises = newsComplicacoesSanitized.map(data =>
        api.post(`/pacientes/${id}/complicacoes`, data),
      );

      // tentando salvar mas sem nada para enviar.
      if (newsComplicacoesPromises.length === 0) {
        addToast({
          type: 'warning',
          message: 'Nada para salvar.',
        });
        return;
      }

      // enviando todas as requests juntas.
      await Promise.all([...newsComplicacoesPromises]);

      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso.',
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'Exames laboratoriais específicos COVID 19',
              route: `/categorias/exames-especificos/${id}`,
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
              validationSchema={schema}>
              {({ isSubmitting }) => (
                <Form component={FormControl}>
                  <div className={classes.titleWrapper}>
                    <Typography variant="h2">
                      Exames laboratoriais específicos COVID 19
                    </Typography>
                    <Grid className={classes.actionSection} item>
                      <PatientInfo />
                      <Button
                        className={classes.buttonSave}
                        color="secondary"
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained">
                        Salvar
                      </Button>
                    </Grid>
                  </div>

                  <SelectComplicationType
                    tiposComplicacoes={tipoComplicacoes}
                  />

                  <ComplicationsList complicacoes={complicacoes} />
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default Complications;
