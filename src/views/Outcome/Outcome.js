import React, { useState, useEffect, useCallback } from 'react';
import { usePatient } from 'context/PatientContext';
import useStyles from './styles';
import { CustonBreadcrumbs, FormikErroObserver } from 'components';
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
import SelectOutcomeType from './components/SelectOutcomeType';
import OutcomeFormList from './components/OutcomeFormList';
import api from 'services/api';
import { useToast } from 'hooks/toast';
import OutcomeList from './components/OutcomeList';

const initialValues = {
  newDesfechos: [],
  tipoNewDesfechoSelected: '',
};

function Outcome() {
  const {
    patient: { id },
  } = usePatient();

  const classes = useStyles();

  const { addToast } = useToast();

  const { getTiposDesfecho } = useSeeds();

  const [desfechos, setDesfechos] = useState([]);

  const [tiposDesfecho, setTiposDesfecho] = useState([]);

  const [loading, setLoading] = useState(false);

  // Carrega as informações dos desfechos
  const handleOutcomo = useCallback(
    async id => {
      try {
        // TODO: implementar aqui o carregamento
        setLoading(true);

        await getTiposDesfecho().then(response => {
          setTiposDesfecho(response.data);
        });

        const response = await api.get(`/pacientes/${id}/desfecho`);
        setDesfechos(old => [...old, ...response.data.desfechos]);

        console.log('response.data.desfechos', response.data.desfechos);

        // TODO: remover no final.
        console.log(id);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [getTiposDesfecho],
  );

  const handleSubmit = useCallback(
    async values => {
      try {
        const { newDesfechos } = values;

        console.log('newDesfechos:', newDesfechos);

        // tentando salvar mas sem nada para enviar
        if (newDesfechos.length === 0) {
          addToast({
            type: 'warning',
            message: 'Nada para salvar.',
          });
          return;
        }

        // TODO: testando
        await api.post(`/pacientes/${id}/desfecho/`, newDesfechos);

        addToast({
          type: 'success',
          message: 'Dados salvos com sucesso.',
        });

        window.location.reload();
      } catch (error) {
        addToast({
          type: 'error',
          message: 'Erro ao tentar salvar as informações',
        });
      }
    },
    [id, addToast],
  );

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

                  <SelectOutcomeType tipos={tiposDesfecho} />

                  <OutcomeFormList />

                  {tiposDesfecho.map(tipo => (
                    <OutcomeList
                      desfechosList={desfechos
                        .filter(elem => elem.tipo_desfecho.id === tipo.id)
                        .sort((a, b) => {
                          var dateA = new Date(a.data),
                            dateB = new Date(b.data);
                          return dateA - dateB;
                        })}
                      key={tipo.id}
                    />
                  ))}

                  <FormikErroObserver />
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
