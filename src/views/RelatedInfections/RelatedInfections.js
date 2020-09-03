import React, { useState, useCallback, useEffect } from 'react';
import { usePatient } from 'context/PatientContext';
import useStyles from './styles';
import { CustonBreadcrumbs } from 'components';
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
import apiFake from 'services/apiFake';

const initialValues = {
  newIRASs: [],
  tipoIRASSelected: '',
};

function getIRASPorTipo(irasList) {
  return irasList.reduce((acc, curr) => {
    var key = curr.tipo_exame_id;
    acc[key] = acc[key] || [];
    acc[key].push(curr);
    return acc;
  }, []);
}

// Component da pgiande Infecções relacionadas à assistência à saúde (IRAS)
const RelatedInfections = () => {
  const {
    patient: { id },
  } = usePatient();

  const classes = useStyles();

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

      const responseIRAS = await apiFake.get('/iras');
      setIras(old => [...old, ...responseIRAS.data]);

      console.log(getIRASPorTipo(responseIRAS.data));

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

                {/* TODO: colocar aqui um contentWraper englobando tudo */}
                <SelectIRASType tipos={tiposIRAS} />

                {/* <IRASList irasList={iras} /> */}

                {tiposIRAS &&
                  tiposIRAS.length !== 0 &&
                  tiposIRAS.map((tipo, index) => (
                    <IRASList
                      // descricao={tipo.descricao}
                      irasList={getIRASPorTipo(iras)[tipo.id]}
                      key={index}
                    />
                  ))}
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default RelatedInfections;
