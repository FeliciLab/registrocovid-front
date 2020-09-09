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
import SelectTestType from './components/SelectTestType';
import TestRTCPRList from './components/TestRTCPRList';
import TestRapidoList from './components/TestRapidoList';
import ComplicationsList from './components/ComplicationsList';
import api from 'services/api';
import { useToast } from 'hooks/toast';
import PatientInfo from 'components/PatientInfo';
import { usePatient } from 'context/PatientContext';

// Valores iniciais
const initialValues = {
  newsTestsRTCPRs: [],
  newsTestsRapidos: [],
  newsComplicacoes: [],
  tipo_new_teste: '',
};

const Complications = () => {
  let { id } = useParams();

  const { patient } = usePatient();

  id = id ? id : patient.id;

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [examesPCR, setexamesPCR] = useState([]);

  const [complicacoes, setComplicacoes] = useState([]);
  const [tipoComplicacoes, setTipoComplicacoes] = useState([]);

  const [examesTesteRapido, setExamesTesteRapido] = useState([]);

  const history = useHistory();

  const { addToast } = useToast();

  // trata de carregar as informações
  const handleComplications = useCallback(
    async id => {
      try {
        setLoading(true);

        const response = await api.get(`pacientes/${id}/exames-laboratoriais`);
        const { exames_pcr, exames_teste_rapido } = response.data;

        setexamesPCR(exames => [...exames, ...exames_pcr]);
        setExamesTesteRapido(exames => [...exames, ...exames_teste_rapido]);
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
    handleComplications(id);
  }, [handleComplications, id]);

  useEffect(() => {
    handleComplicationsFull(id);
  }, [handleComplicationsFull, id]);

  const handleSubmit = async ({ newsTestsRTCPRs, newsTestsRapidos }) => {
    try {
      // sanitizando os dasos de newsTestsRTCPRs para o envio dos testes novos
      const newsTestsRTCPRsSanitized = newsTestsRTCPRs.map(test => ({
        data_coleta: test.data_coleta,
        sitio_tipo_id: test.sitio_tipo,
        data_resultado: test.data_resultado,
        rt_pcr_resultado_id: test.rt_pcr_resultado,
      }));

      // sanitizando os dasos de newsTestsRapidos para o envio dos testes novos
      const newsTestsRapidosSanitized = newsTestsRapidos.map(test => ({
        data_realizacao: test.data_realizacao,
        resultado: test.resultado === 'true' ? true : false,
      }));

      // criando as promises
      const newsTestsRTCPRsPromises = newsTestsRTCPRsSanitized.map(test =>
        api.post(`/pacientes/${id}/exames-laboratoriais`, test),
      );

      const newsTestsRapidosPromises = newsTestsRapidosSanitized.map(test =>
        api.post(`/pacientes/${id}/exames-laboratoriais`, test),
      );

      // tentando salvar mas sem nada para enviar.
      if (
        newsTestsRapidosPromises.length === 0 &&
        newsTestsRTCPRsPromises.length === 0
      ) {
        addToast({
          type: 'warning',
          message: 'Nada para salvar.',
        });
        return;
      }

      // enviando todas as requests juntas.
      await Promise.all([
        ...newsTestsRTCPRsPromises,
        ...newsTestsRapidosPromises,
      ]);

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

                  <SelectTestType tiposComplicacoes={tipoComplicacoes} />

                  <TestRTCPRList testes={examesPCR} />

                  <TestRapidoList testes={examesTesteRapido} />

                  <ComplicationsList complicacoes={complicacoes} />
                  {/* <FormikErroObserver /> */}
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
