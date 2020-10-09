import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Typography,
  Button,
  CircularProgress,
  Grid,
  FormControl,
} from '@material-ui/core';

import CustomBreadcrumbs from 'components/CustomBreadcrumbs';
import PatientInfo from 'components/PatientInfo';

import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';

import api from 'services/api';

import useStyles from './styles';
import { Form, Formik } from 'formik';
import SelectRespiratorySuportType from './components/SelectRespiratorySuportType';
import RespiratorySuportFormList from './components/RespiratorySuportFormList';
import RespiratorySuportItemList from './components/RespiratorySuportItemList';

import schema from './schema';

const initialValues = {
  newSuportesRespitatorios: [],
  tipoNewSuporteRespiratorioSelected: '',
};

const RespiratorySupport = () => {
  const classes = useStyles();

  const history = useHistory();

  const { addToast } = useToast();

  const { patient } = usePatient();

  const [loading, setLoading] = useState(false);

  const [supportsTypes, setSupportsTypes] = useState([]);
  const [oldRecords, setOldRecords] = useState([]);
  const [pronacao, setPronacao] = useState([]);
  const [desmame, setDesmame] = useState([]);

  const handleInfos = useCallback(async () => {
    try {
      setLoading(true);

      const [supports, patientRecords] = await Promise.all([
        api.get('/suportes-respiratorios'),
        api.get(`pacientes/${patient.id}/suportes-respiratorios`),
      ]);

      setSupportsTypes(supports.data);

      const tratamentoRecords = orderByDate(
        patientRecords.data.suporte_respiratorio,
      );

      const pronacaoRecords = orderByDate(
        patientRecords.data.tratamento_pronacao,
      );

      const desmameRecords = orderByDate(
        patientRecords.data.tratamento_inclusao_desmame,
      );

      setOldRecords(tratamentoRecords);

      setPronacao(
        pronacaoRecords.map(item => {
          item.tipo_suporte_id = 10; // Pronacao
          return item;
        }),
      );

      setDesmame(
        desmameRecords.map(item => {
          item.tipo_suporte_id = 11; // Desmame
          return item;
        }),
      );
    } catch {
      addToast({
        type: 'error',
        message: 'Erro ao tentar carregar informações, tente novamente',
      });

      history.goBack();
    } finally {
      setLoading(false);
    }
  }, [addToast, history, patient.id]);

  useEffect(() => {
    handleInfos();
  }, [handleInfos]);

  const handleSubmit = useCallback(
    async values => {
      try {
        const { newSuportesRespitatorios } = values;

        const newSuportesRespitatoriosSanitazed = newSuportesRespitatorios.map(
          item => ({
            tipo_suporte_id: Number(item.tipo_suporte_id),
            fluxo_o2: item.fluxo_o2,
            data_inicio: item.data_inicio,
            data_termino: item.data_termino,
            menos_24h_vmi: item.menos_24h_vmi,
            concentracao_o2: item.concentracao_o2,
            fluxo_sangue: item.fluxo_sangue,
            fluxo_gasoso: item.fluxo_gasoso,
            fio2: item.fio2,
            data_pronacao: item.data_pronacao, // Pronacao
            quantidade_horas: item.quantidade_horas, // Pronacao
            data_inclusao_desmame: item.data_inclusao_desmame, // desmame
          }),
        );

        await api.post(
          `/pacientes/${patient.id}/suportes-respiratorios/`,
          newSuportesRespitatoriosSanitazed,
        );

        addToast({
          type: 'success',
          message: 'Dados salvos com sucesso.',
        });

        window.location.reload();
      } catch (error) {
        addToast({
          type: 'error',
          message: 'Erro ao tentar salvar as informações',
        });
      }
    },
    [patient.id, addToast],
  );

  const orderByDate = array => {
    if (!array) {
      return [];
    }

    return array.sort((a, b) => {
      if (
        a.data_inicio > b.data_inicio ||
        a.data_pronacao > b.data_pronacao ||
        a.data_inclusao_desmame > b.data_inclusao_desmame
      )
        return 1;
      if (
        a.data_inicio < b.data_inicio ||
        a.data_pronacao < b.data_pronacao ||
        a.data_inclusao_desmame < b.data_inclusao_desmame
      )
        return -1;
      return 0;
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustomBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'Suporte respiratório',
              route: '/categorias/suporte-respiratorio',
            },
          ]}
        />
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="container">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validateOnMount
            validationSchema={schema}
          >
            {({ isSubmitting, values }) => (
              <Form component={FormControl}>
                <div className={classes.titleWrapper}>
                  <Typography variant="h2">Suporte respiratório</Typography>

                  <div className={classes.rightContent}>
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
                  </div>
                </div>
                <Grid
                  alignContent="center"
                  alignItems="center"
                  container
                  direction="column"
                  item
                  spacing={2}
                >
                  <SelectRespiratorySuportType tipos={supportsTypes} />

                  <RespiratorySuportFormList tipos={supportsTypes} />

                  {supportsTypes.map((tipo, index) => (
                    <RespiratorySuportItemList
                      descricao={tipo.nome}
                      key={index}
                      list={orderByDate(oldRecords).filter(
                        item => tipo.id === item.tipo_suporte_id,
                      )}
                    />
                  ))}

                  <RespiratorySuportItemList
                    descricao={'Proncacao'}
                    list={orderByDate(pronacao)}
                  />

                  <RespiratorySuportItemList
                    descricao={'Inclusão em desmame da ventilação mecânica'}
                    list={orderByDate(desmame)}
                  />
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default RespiratorySupport;
