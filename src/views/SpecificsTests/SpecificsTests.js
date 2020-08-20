import React, { useState, useCallback, useEffect } from 'react';

import useStyles from './styles';
import { CustonBreadcrumbs } from 'components';
import { useParams } from 'react-router-dom';
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
import api from 'services/api';
import TesteRTPCRForm from './components/TesteRTPCRForm';

// Valores iniciais
const initialValues = {
  newsTestsRTCPRs: [],
  newsTestsRapidos: [],
  tipo_new_teste: '',
};

const SpecificsTests = () => {
  const { id } = useParams();

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [examesPCR, setexamesPCR] = useState([]);

  const [examesTesteRapido, setExamesTesteRapido] = useState([]);

  // trata de carregar as informações
  const handleSpecificsTests = useCallback(async id => {
    try {
      setLoading(true);

      const response = await api.get(`pacientes/${id}/exames-laboratoriais`);
      const { exames_pcr, exames_teste_rapido } = response.data;

      setexamesPCR(exames => [...exames, ...exames_pcr]);
      setExamesTesteRapido(exames => [...exames, ...exames_teste_rapido]);
    } catch (err) {
      // TODO: tratamento dos erros aqui.
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleSpecificsTests(id);
  }, [handleSpecificsTests, id]);

  const handleSubmit = values => {
    // TODO: Provalvemente teremos que enviar cada exame em requests separadas.
    console.log(values);
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
              validationSchema={schema}
            >
              {({ values, isSubmitting }) => (
                <Form component={FormControl}>
                  <div className={classes.titleWrapper}>
                    <Typography variant="h1">
                      Exames laboratoriais específicos COVID 19
                    </Typography>
                    <Grid
                      className={classes.actionSection}
                      item
                    >
                      {/* patient info
                        <section className={classes.patienteInfo}>
                          <PatientInfo patient={patient} />
                        </section */}
                      <Button
                        className={classes.buttonSave}
                        color="secondary"
                        disabled={isSubmitting || values.isPrevSaved}
                        type="submit"
                        variant="contained"
                      >
                        Salvar
                      </Button>
                    </Grid>
                  </div>

                  <SelectTestType />

                  <TestRTCPRList testes={examesPCR} />

                  <TestRapidoList testes={examesTesteRapido} />

                  <TesteRTPCRForm />
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificsTests;
