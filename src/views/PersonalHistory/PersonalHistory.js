import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import CustomBreadcrumbs from 'components/CustomBreadcrumbs';
import PatientInfo from 'components/PatientInfo';
import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';
import api from 'services/api';
import useStyles from './styles';
import { customBreadcrumbsLinks } from './statics';
import PersonalHistoryForm from './components/PersonalHistoryForm';

const PersonalHistory = () => {
  const classes = useStyles();

  const history = useHistory();

  const { addToast } = useToast();

  const { patient } = usePatient();

  const formRef = useRef(null);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [loading, setLoading] = useState(false);

  const [patientHistory, setPatientHistory] = useState({});

  const [usoDrogas, setUsoDrogas] = useState([]);

  const [drogas, setDrogas] = useState([]);

  const handleInfos = useCallback(async () => {
    try {
      setLoading(true);

      const responseUsoDrogas = await api.get('/situacao-uso-drogas');
      setUsoDrogas(responseUsoDrogas.data);

      const responseDrogas = await api.get('/drogas');
      setDrogas(responseDrogas.data);

      const responseHistory = await api.get(
        `/pacientes/${patient.id}/historico`,
      );

      setPatientHistory(responseHistory.data);
    } catch (err) {
      if (err.response.status === 404) return null;
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

  const handleSubmit = () => {
    formRef.current.submit();
  };

  const handleChange = bool => {
    if (Object.keys(patientHistory).length === 0) {
      setButtonDisabled(bool);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustomBreadcrumbs links={customBreadcrumbsLinks} />
      </div>

      <div>
        <div className={classes.titleWrapper}>
          <Typography variant="h1">História Pessoal</Typography>

          <div className={classes.rightContent}>
            <PatientInfo />

            <Button
              className={classes.buttonSave}
              color="secondary"
              disabled={buttonDisabled}
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
            onChange={bool => handleChange(bool)}
            patientHistory={patientHistory}
            ref={formRef}
            usoDrogas={usoDrogas}
          />
        )}
      </div>
    </div>
  );
};

export default PersonalHistory;
