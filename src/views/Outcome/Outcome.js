import React, { useState, useEffect, useCallback } from 'react';
import { usePatient } from 'context/PatientContext';
import useStyles from './styles';
import { CustonBreadcrumbs } from 'components';
import {
  CircularProgress,
  Typography,
  FormControl,
  Button,
  Grid,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import schema from './schema';
import PatientInfo from 'components/PatientInfo';
import useSeeds from 'hooks/seeds';

// TODO: nada por enquanto
const initialValues = {};

function Outcome() {
  const {
    patient: { id },
  } = usePatient();

  const classes = useStyles();

  const { getTiposDesfecho } = useSeeds();

  const [tiposDesfecho, setTiposDesfecho] = useState([]);

  const [loading, setLoading] = useState(false);

  // Carrega as informações dos desfechos
  const handleOutcomo = useCallback(async id => {
    try {
      // TODO: implementar aqui o carregamento
      setLoading(true);

      await getTiposDesfecho().then(response => {
        console.log(response);
        setTiposDesfecho(response.data);
      });

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
              {({ isSubmitting }) => (
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

                  {/* TODO: testando */}
                  {tiposDesfecho.map(tipo => (
                    <span key={tipo.id}>{tipo.descricao}</span>
                  ))}
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
