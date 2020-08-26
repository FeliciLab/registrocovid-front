import React, { useState, useEffect, useCallback } from 'react';
import { usePatient } from 'context/PatientContext';
import useStyles from './styles';
import { CustonBreadcrumbs } from 'components';
import { CircularProgress, FormControl, Typography, Grid, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import schema from './schema';
import PatientInfo from 'components/PatientInfo';
import SelectComplementaryTestType from './componentes/SelectComplementaryTestType';

// Valores iniciais
const initialValues = {
  newsTestsTCTorax: [],
  newsTestsECG: [],
  tipo_new_teste: '',
};

function ComplementaryTests() {
  const { patient } = usePatient();

  const { id } = patient;

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const handleComplementaryTests = useCallback(async id => {
    try {
      setLoading(true);
      console.log(id);
    } catch (err) {
      // TODO: tratar os erros do carregamento aqui.
    } finally {
      setLoading(false);
    }
  }, []);

  // TODO: nada ainda
  const handleSubmit = values => {
    console.log('handleSubmit', values);
  };

  useEffect(() => {
    handleComplementaryTests(id);
  }, [handleComplementaryTests, id]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'Exames laboratoriais complementares',
              route: '/categorias/exames-complementares/',
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
                    <Typography variant="h2">
                      Exames laboratoriais complementares
                    </Typography>
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

                  <SelectComplementaryTestType />

                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplementaryTests;
