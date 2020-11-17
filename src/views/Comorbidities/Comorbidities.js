import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import FormComorbidade from './Form/FormComorbidade'
import ComorbidadesBreadcrumbs from './ComorbidadesBreadcrumbs';
import useStyles from './styles';
import ComorbidadeModel from 'models/comorbidades/ComorbidadeModel'
import { usePatient } from 'context/PatientContext';
import DatasRequests from 'services/requests/datasRequests'
import ComorbidadeService from 'models/comorbidades/ComorbidadeService'

const Comorbidities = () => {
  const classes = useStyles();
  const { patient } = usePatient();
  const [initValues, setInitValues] = useState({...ComorbidadeModel.model, ...{ paciente_id: patient.id }});
  const [loading, setLoading] = useState(true);

  const buscarPacienteComorbidades = () => {
    DatasRequests.buscarComorbidade(patient.id)
      .then((result) => {
        if (result) {
          setInitValues(
            ComorbidadeService.converterRequisicaoParaModelo({
              ...ComorbidadeModel.model,
              ...{ paciente_id: patient.id },
              ...result
            })
          )
        }
        setLoading(false)
      })
  }

  useEffect(buscarPacienteComorbidades, [patient.id])

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <ComorbidadesBreadcrumbs />
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={classes.formWrapper}>
          <FormComorbidade initValues={initValues} />
        </div>
      )}
    </div>
  );
};

export default withRouter(Comorbidities);
