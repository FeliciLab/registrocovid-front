import React, { useState, useEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { Typography, Button, CircularProgress } from '@material-ui/core';

import { getPhysicalExam } from '../../services/physicalExam';
import CustomBreadcrumbs from 'components/CustomBreadcrumbs';
import PatientInfo from 'components/PatientInfo';
import Form from './components/Form';

import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';

import useStyles from './styles';

const PhysicalExam = () => {
  const classes = useStyles();
  const { params } = useRouteMatch();
  const { addToast } = useToast();
  const { patient } = usePatient();
  const [loading, setLoading] = useState(true);
  const formRef = useRef(null);
  const [physicalExam, setPhysicalExam] = useState({});
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (patient.id && params.examId) {
      getPhysicalExam(patient.id, params.examId)
        .then(response => {
          setPhysicalExam(response.data);
        })
        .catch(err => {
          addToast({
            type: 'error',
            message: err.message,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [addToast, params.examId, patient.id]);

  const handleSubmit = () => {
    formRef.current.submit();
  };

  const hasExam = Object.entries(physicalExam).length !== 0;
  const shouldDisableButton = disable => {
    setDisableButton(disable);
  };

  useEffect(() => {
    setDisableButton(loading || hasExam);
  }, [loading, hasExam]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustomBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'Lista de evoluções',
              route: '/categorias/lista-exame-fisico',
            },
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
              disabled={disableButton}
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
          <Form
            physicalExam={physicalExam}
            ref={formRef}
            shouldDisableButton={shouldDisableButton}
          />
        )}
      </div>
    </div>
  );
};

export default PhysicalExam;
