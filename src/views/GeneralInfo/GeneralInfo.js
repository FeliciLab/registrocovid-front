import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import { Formik } from 'formik';
import CustomBreadcrumbs from 'components/CustomBreadcrumbs';
import { CircularProgress } from '@material-ui/core';
import schema from './schema';
import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';
import api from 'services/api';
import {
  loadInitialValues,
  postGeneralInfo,
} from 'models/generalInfo/GeneralInfoService';
import GeneralInfoForm from './components/GeneralInfoForm';

const GeneralInfo = () => {
  const { addToast } = useToast();

  const { patient, addPatient } = usePatient();

  const history = useHistory();

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [instituicoes, setInstituicoes] = useState([]);

  const [tiposSuporteRespiratorio, setTiposSuporteRespiratorio] = useState([]);

  const handleInfos = useCallback(async () => {
    try {
      setLoading(true);

      const responseInstituicoes = await api.get('/instituicoes');
      setInstituicoes(responseInstituicoes.data);

      const responseSuportesRespiratorio = await api.get(
        '/suportes-respiratorios',
      );
      setTiposSuporteRespiratorio(
        responseSuportesRespiratorio.data.filter(tipo =>
          [1, 2, 3, 4, 7].some(id => id === tipo.id),
        ),
      );
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

  const handleSubmit = async values => {
    try {
      const complementaryResponsePatient = await postGeneralInfo(values);
      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso',
      });
      addPatient(complementaryResponsePatient);
      history.push('/categorias');
    } catch (err) {
      if (err.response.data.message === 'The given data was invalid.') {
        addToast({
          type: 'info',
          message: `Número de prontuário ${values.prontuario} já está cadastrado`,
        });
      } else {
        addToast({
          type: 'error',
          message: 'Erro ao tentar inserir novo paciente, tente novamente',
        });
      }
    }
  };

  useEffect(() => {
    handleInfos();
  }, [handleInfos]);

  const links = patient.id
    ? [
      { label: 'Meus pacientes', route: '/meus-pacientes' },
      { label: 'Categorias', route: '/categorias' },
      {
        label: 'Informações gerais',
        route: '/categorias/informacoes-gerais',
      },
    ]
    : [
      { label: 'Meus pacientes', route: '/meus-pacientes' },
      {
        label: 'Informações gerais',
        route: '/categorias/informacoes-gerais',
      },
    ];

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustomBreadcrumbs links={links} />
      </div>
      <div className={classes.formWrapper}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Formik
            initialValues={loadInitialValues(patient)}
            onSubmit={handleSubmit}
            validateOnMount
            validationSchema={schema}
          >
            <GeneralInfoForm
              instituicoes={instituicoes}
              patient={patient}
              tiposSuporteRespiratorio={tiposSuporteRespiratorio}
            />
          </Formik>
        )}
      </div>
    </div>
  );
};

export default GeneralInfo;
