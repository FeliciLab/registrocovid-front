import React, { useState, useCallback, useEffect } from 'react';
import { usePatient } from 'context/PatientContext';
import useStyles from './styles';
import { CustonBreadcrumbs } from 'components';
import { CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';
import schema from './schema';

// TODO: nada por enquanto
const initialValues = {};

// Component da pgiande Infecções relacionadas à assistência à saúde (IRAS)
const RelatedInfections = () => {
  const {
    patient: { id },
  } = usePatient();

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const handleRelatedInfections = useCallback(async id => {
    try {
      setLoading(true);
      console.log(id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(async values => {
    try {
      // TODO: mudar isso depois
      console.log(values);
    } catch (error) {
      // TODO: melhorar o tratamento do erro aqui
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleRelatedInfections(id);
  }, [handleRelatedInfections, id]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'Infecções relacionadas à assistência à saúde (IRAS)',
              route: '/categorias/iras/',
            },
          ]}
        />
      </div>

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
          />
        </div>
      )}
    </div>
  );
};

export default RelatedInfections;
