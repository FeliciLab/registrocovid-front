import React, { useState, useEffect, useCallback } from 'react';
import { usePatient } from 'context/PatientContext';
import useStyles from './styles';
import { CustonBreadcrumbs } from 'components';
import { CircularProgress, Typography, FormControl, Button, Grid } from '@material-ui/core';
import { Formik, Form } from 'formik';
import schema from './schema';
import PatientInfo from 'components/PatientInfo';

// TODO: nada por enquanto
const initialValues = {};

function Outcome() {
  const {
    patient: { id },
  } = usePatient();

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  // Carrega as informações dos desfechos
  const handleOutcomo = useCallback(async id => {
    try {
      // TODO: implementar aqui o carregamento
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
      // TODO: implementar o submit aqui
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleOutcomo(id);
  }, [id, handleOutcomo]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'Desfecho',
              route: '/categorias/desfecho/',
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
              {({isSubmitting}) => (
                <Form component={FormControl}>
                  <div className={classes.titleWrapper}>
                    <Typography variant="h2">Desfecho</Typography>
                    <Grid
                      className={classes.actionSection}
                      item
                    >
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
                    </Grid>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
}

export default Outcome;
