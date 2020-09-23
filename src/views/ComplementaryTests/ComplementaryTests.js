import React, { useState, useEffect, useCallback } from 'react';
import { usePatient } from 'context/PatientContext';
import useStyles from './styles';

import {
  CustomBreadcrumbs,
  // FormikErroObserver,
} from 'components';

import {
  CircularProgress,
  FormControl,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';

import { Formik, Form } from 'formik';
import schema from './schema';
import PatientInfo from 'components/PatientInfo';
import SelectComplementaryTestType from './components/SelectComplementaryTestType';
import TestComplementaryList from './components/TestComplementaryList';
import api from 'services/api';
import { useToast } from 'hooks/toast';
import { useHistory } from 'react-router-dom';

function getExamesPorTipo(exames) {
  return exames.reduce((acc, curr) => {
    var key = curr.tipo_exame_id;
    acc[key] = acc[key] || [];
    acc[key].push(curr);
    return acc;
  }, []);
}

function ComplementaryTests() {
  const { patient } = usePatient();

  const { id } = patient;

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [examesComplementares, setExamesComplementares] = useState([]);

  const [examesCompPorTipo, setExamesCompPorTipo] = useState([]);

  const [types, setTypes] = useState([]);

  const { addToast } = useToast();

  const history = useHistory();

  // carregando os tipos e os exames complementares do paciente já cadastrados
  const handleComplementaryTests = useCallback(
    async id => {
      try {
        setLoading(true);

        // carregando os tipos de exames
        const responseTiposExames = await api.get(
          '/tipos-exames-complementares',
        );
        setTypes(tipos => [...tipos, ...responseTiposExames.data]);

        // carregando os exames complementares já cadastrados
        const responseExames = await api.get(
          `/pacientes/${id}/exames-complementares`,
        );

        // os exames podem não existir
        if (responseExames.data.length) {
          setExamesComplementares(exames => [
            ...exames,
            ...responseExames.data,
          ]);
        }
      } catch (err) {
        // caso aconteça algum erro, mostra a mensagem de erro e volta a página.
        addToast({
          type: 'error',
          message: 'Erro ao tentar carregar as informações',
        });
        history.goBack();
      } finally {
        setLoading(false);
      }
    },
    [addToast, history],
  );

  useEffect(() => {
    handleComplementaryTests(id);
  }, [handleComplementaryTests, id]);

  useEffect(() => {
    setExamesCompPorTipo(getExamesPorTipo(examesComplementares));
  }, [examesComplementares]);

  const handleSubmit = async values => {
    try {
      const { newComplementaryTests } = values;

      // sanitizando os dados antes do envio.
      const newComplementaryTestsSanitized = newComplementaryTests.map(
        test => ({
          tipo_exames_complementares_id: test.tipo_exames_complementares_id,
          data: test.data,
          resultado: test.resultado,
        }),
      );

      // tentando salvar mas sem nada para enviar
      if (newComplementaryTestsSanitized.length === 0) {
        addToast({
          type: 'warning',
          message: 'Nada para salvar.',
        });
        return;
      }

      // enviando
      await api.post(`/pacientes/${id}/exames-complementares`, {
        examescomplementares: newComplementaryTestsSanitized,
      });

      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso.',
      });

      window.location.reload();
    } catch (err) {
      addToast({
        type: 'error',
        message: 'Algo de errado aconteceu',
      });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustomBreadcrumbs
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
              initialValues={{
                newComplementaryTests: [],
                tipoNewTesteSelected: '',
              }}
              onSubmit={handleSubmit}
              validateOnMount
              validationSchema={schema}
            >
              {({ isSubmitting }) => (
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

                  <SelectComplementaryTestType types={types} />

                  {/* TODO: colocar depois do primeiro MVP */}
                  {/* <FormikErroObserver /> */}

                  {types &&
                    types.length !== 0 &&
                    types.map((tipo, index) => (
                      <TestComplementaryList
                        descricao={tipo.descricao}
                        key={index}
                        testes={examesCompPorTipo[tipo.id]}
                      />
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

export default ComplementaryTests;
