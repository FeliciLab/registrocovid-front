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

  const handleComplications = useCallback(
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
    [addToast, history, patient],
  );

  useEffect(() => {
    handleComplications(id);
  }, [handleComplications, id]);

  const handleSubmit = async ({ newsComplicacoes }) => {
    try {
      const newsComplicacoesSanitized = newsComplicacoes.map(complicacao => ({
        tipo_complicacao_id: complicacao.tipo_complicacao_id,
        data: complicacao.data,
        data_termino: complicacao.data_termino,
        descricao: 'Placeholder Descrição',
        glasglow_admissao_uti: complicacao.glasglow_admissao_uti,
        menos_24h_uti: complicacao.menos_24h_uti,
      }));

      console.log(newsComplicacoes);
      const newsComplicacoesPromises = api.post(
        `/pacientes/${id}/complicacoes`,
        newsComplicacoesSanitized,
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
              label: 'Complicações',
              route: `/categorias/complicacoes`,
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
                    <Typography variant="h2">Complicações</Typography>
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
