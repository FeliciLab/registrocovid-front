import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import CustomBreadcrumbs from 'components/CustomBreadcrumbs';
import PatientInfo from 'components/PatientInfo';
import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';
import useStyles from './styles';
import { customBreadcrumbsLinks } from './statics';
import PersonalHistoryForm from './components/PersonalHistoryForm';
import {
  buscarTiposSitucaoUsoDrogas,
  buscarDrogas,
  buscarHistoricoPaciente,
  buscarTiposSitucaoEtilismo,
  buscarTiposSitucaoTabagismo,
} from 'services/requests/datasRequests';

const PersonalHistory = () => {
  const classes = useStyles();

  const history = useHistory();

  const { addToast } = useToast();

  const { patient } = usePatient();

  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [patientHistory, setPatientHistory] = useState({});

  const [tiposSitucaoTabagismo, setTiposSitucaoTabagismo] = useState([]);
  const [tiposSitucaoEtilismo, setTiposSitucaoEtilismo] = useState([]);
  const [tiposSitucaoUsoDrogas, setTiposSitucaoUsoDrogas] = useState([]);
  const [drogas, setDrogas] = useState([]);

  const handleInfos = useCallback(async () => {
    setLoading(true);
    try {
      const responseTiposSitucaoTabagismo = await buscarTiposSitucaoTabagismo();
      setTiposSitucaoTabagismo(responseTiposSitucaoTabagismo);

      const responseTiposSitucaoEtilismo = await buscarTiposSitucaoEtilismo();
      setTiposSitucaoEtilismo(responseTiposSitucaoEtilismo);

      const responseTiposSitucaoUsoDrogas = await buscarTiposSitucaoUsoDrogas();
      setTiposSitucaoUsoDrogas(responseTiposSitucaoUsoDrogas);

      const responseDrogas = await buscarDrogas();
      setDrogas(responseDrogas);

      const responseHistory = await buscarHistoricoPaciente(patient.id);
      setPatientHistory(responseHistory);
    } catch (err) {
      if (err.response.status === 404) {
        setPatientHistory(null);
        return null;
      }
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

  // Puxando o submit do component filho (diretamente o Formik)
  const handleSubmit = () => {
    formRef.current.submit();
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustomBreadcrumbs links={customBreadcrumbsLinks} />
      </div>

      <div>
        <div className={classes.titleWrapper}>
          <Typography variant="h2">História Pessoal</Typography>

          <div className={classes.rightContent}>
            <PatientInfo />

            <Button
              className={classes.buttonSave}
              color="secondary"
              disabled={!!patientHistory}
              onClick={handleSubmit}
              type="submit"
              variant="contained"
            >
              Salvar
            </Button>
          </div>
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <PersonalHistoryForm
            drogas={drogas}
            editable={!!patientHistory} // passando o editável para o caso das informções já existirem
            patientHistory={patientHistory}
            ref={formRef}
            tiposSitucaoEtilismo={tiposSitucaoEtilismo}
            tiposSitucaoTabagismo={tiposSitucaoTabagismo}
            tiposSitucaoUsoDrogas={tiposSitucaoUsoDrogas}
          />
        )}
      </div>
    </div>
  );
};

export default PersonalHistory;
