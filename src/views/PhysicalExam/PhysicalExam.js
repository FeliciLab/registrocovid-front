import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import {
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';

import CustonBreadcrumbs from 'components/CustonBreadcrumbs';
import PatientInfo from 'components/PatientInfo';
import Form from './components/Form';

import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';

import api from 'services/api';

import useStyles from './styles';

const PhysicalExam = () => {
  const classes = useStyles();
  const history = useHistory();
  const { params } = useRouteMatch();
  const { addToast } = useToast();
  const { patient } = usePatient();

  const formRef = useRef(null);
  const buttonDisabled = useRef(false);

  const [loading, setLoading] = useState(false);
  const [physicalExam, setPhysicalExam] = useState({});

  const handleInfos = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get(`/pacientes/${patient.id}/evolucoes-diarias/${params.examId}`);

      if (response.status === 200) {
        setPhysicalExam(response.data);
        buttonDisabled.current = true;
      }
    } catch (err) {
      if (err.response.status === 404) {
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
  }, [addToast, history, patient.id, params.examId]);

  useEffect(() => {
    handleInfos();
  }, [handleInfos]);

  const handleSubmit = () => {
    formRef.current.submit();
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            { label: 'Lista de evoluções', route: '/categorias/lista-exame-fisico' },
            { label: 'Exame Físico', route: '/categorias/exame-fisico' },
          ]}
        />
      </div>

      <div>
        <div className={classes.titleWrapper}>
          <Typography variant="h1">Exame Físico</Typography>

          <div className={classes.rightContent}>
            <PatientInfo />

            <Button
              className={classes.buttonSave}
              color="secondary"
              disabled={buttonDisabled.current}
              onClick={handleSubmit}
              type="submit"
              variant="contained"
            >
              Salvar
            </Button>
          </div>
        </div>

        {loading ? <CircularProgress /> : (
          <Form
            physicalExam={physicalExam}
            ref={formRef}
          />
        )}
      </div>
    </div>
  );
}

export default PhysicalExam;
