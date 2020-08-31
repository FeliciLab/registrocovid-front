import React, { useCallback, useState, useEffect } from 'react';
import useStyles from './styles';
import { usePatient } from 'context/PatientContext';
import { CustonBreadcrumbs } from 'components';
import {
  CircularProgress,
  FormControl,
  Typography,
  Grid,
  Button,
  Card,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import schema from './schema';
import PatientInfo from 'components/PatientInfo';
import ButtonAddOcorrencia from './components/ButtonAddOcorrencia';
import apiFake from 'services/apiFake';
import SupportTreatmentList from './components/SupportTreatmentList';

const initialValues = {
  newSupportTreatments: [],
};

function SupportTreatment() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [tratamentos, setTratamentos] = useState([]);

  const {
    patient: { id },
  } = usePatient();

  // TODO: implementar carregamento dos exames
  const handleSupportTreatments = useCallback(async id => {
    console.log(id);
    try {
      setLoading(true);

      // TODO: usando a apiFake mas depois usar a api oficial
      const response = await apiFake.get('/tratamentos-suportes');
      setTratamentos(old => [...old, ...response.data]);

    } finally {
      setLoading(false);
    }
  }, []);

  // TODO: implementar o submit do button
  const handleSubmit = values => {
    console.log(values);
  };

  useEffect(() => {
    handleSupportTreatments(id);
  }, [id, handleSupportTreatments]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'Tratamento de Suporte',
              route: '/categorias/tratamento-suporte/',
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
                    <Typography variant="h2">Tratamento de suporte</Typography>
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
                  <Grid
                    className={classes.supportTreatmentContainer}
                    component={Card}
                    container
                    item
                    spacing={2}
                  >
                    <Typography variant="h3">
                      Adicionar tratamento de suporte (hemodiálise):
                    </Typography>

                    <ButtonAddOcorrencia />

                    <SupportTreatmentList tratamentos={tratamentos} />

                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupportTreatment;
