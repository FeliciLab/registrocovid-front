import React, { useState, useCallback, useEffect } from 'react';
import { usePatient } from 'context/PatientContext';
import useStyles from './styles';
import {
  CustomBreadcrumbs,
  // FormikErroObserver
} from 'components';

import {
  CircularProgress,
  Typography,
  Button,
  FormControl,
  Grid,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import schema from './schema';
import PatientInfo from 'components/PatientInfo';
import api from 'services/api';
import SelectIRASType from './components/SelectIRASType';
import IRASList from './components/IRASList';
import IRASFormList from './components/IRASFormList';
import { useToast } from 'hooks/toast';
import { useHistory } from 'react-router-dom';

const initialValues = {
  newIRASs: [],
  tipoIRASSelected: '',
};

// Component da página "Infecções relacionadas à assistência à saúde (IRAS)"
const RelatedInfections = () => {
  const {
    patient: { id },
  } = usePatient();

  const classes = useStyles();

  const { addToast } = useToast();

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [tiposIRAS, setTiposIRAS] = useState([]);

  // lista de IRAS previamente salvas
  const [iras, setIras] = useState([]);

  const handleRelatedInfections = useCallback(async id => {
    try {
      setLoading(true);

      // buscando os tipos de IRAS
      const responseTiposIRAS = await api.get('/tipos-iras');
      setTiposIRAS(old => [...old, ...responseTiposIRAS.data]);

      const responseIRAS = await api.get(`pacientes/${id}/iras`);
      setIras(old => [...old, ...responseIRAS.data.iras]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(
    async values => {
      try {
        const { newIRASs } = values;

        const newIRASsSanitized = newIRASs.map(iras => ({
          tipo_iras_id: iras.tipo_iras_id,
          data: iras.data,
          descricao: iras.descricao,
        }));

        // tentando salvar mas sem nada para enviar
        if (newIRASsSanitized.length === 0) {
          addToast({
            type: 'warning',
            message: 'Nada para salvar.',
          });
          return;
        }

        await api.post(`/pacientes/${id}/iras/`, { iras: newIRASsSanitized });

        addToast({
          type: 'success',
          message: 'Dados salvos com sucesso.',
        });

        window.location.reload();
      } catch (error) {
        // caso aconteça algum erro, mostra a mensagem de erro e volta a página.
        addToast({
          type: 'error',
          message: 'Erro ao tentar carregar as informações',
        });
        history.goBack();
      }
    },
    [id, addToast, history],
  );

  useEffect(() => {
    handleRelatedInfections(id);
  }, [handleRelatedInfections, id]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustomBreadcrumbs
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
          >
            {({ isSubmitting }) => (
              <Form component={FormControl}>
                <div className={classes.titleWrapper}>
                  <Typography variant="h3">
                    Infecções relacionadas à assistência à saúde (IRAS)
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

                <Grid
                  className={classes.content}
                  container
                  item
                  spacing={2}
                >
                  <SelectIRASType tipos={tiposIRAS} />

                  <IRASFormList />

                  {tiposIRAS.map(tipo => (
                    <IRASList
                      irasList={iras
                        .filter(elem => elem.tipo_iras_id === tipo.id)
                        .sort((a, b) => {
                          var dateA = new Date(a.data),
                            dateB = new Date(b.data);
                          return dateA - dateB;
                        })}
                      key={tipo.id}
                    />
                  ))}
                </Grid>

                {/* TODO: descomentar depois do primeiro MVP */}
                {/* <FormikErroObserver /> */}
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default RelatedInfections;
