import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

import {
  Typography,
  Button,
  Card,
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  CircularProgress,
  Checkbox,
  FormGroup
} from '@material-ui/core';
import { Formik, Form } from 'formik';

import CustonBreadcrumbs from 'components/CustonBreadcrumbs';
import PatientInfo from 'components/PatientInfo';

import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';

import api from 'services/api';

const PersonalHistory = () => {
  const classes = useStyles();
  const history = useHistory();
  const { addToast } = useToast();
  const { patient } = usePatient();

  const [loading, setLoading] = useState(false);
  const [usoDrogas, setUsoDrogas] = useState([]);
  const [drogas, setDrogas] = useState([]);

  const handleInfos = useCallback(async () => {
    try {
      setLoading(true);

      const responseUsoDrogas = await api.get('/situacao-uso-drogas');
      setUsoDrogas(responseUsoDrogas.data);

      const responseDrogas = await api.get('/drogas');
      setDrogas(responseDrogas.data);
    } catch {
      addToast({
        type: 'error',
        message: 'Erro ao tentar carregar informações, tente novamente',
      });

      history.goBack();
    } finally {
      setLoading(false);
    }
  }, [addToast, history]);

  useEffect(() => {
    handleInfos();
  }, [handleInfos]);


  const handleSubmit = async (values) => {
    try {
      const historico = {
        situacao_uso_drogas_id: Number(values.situacao_uso_drogas_id),
        drogas: values.drogas,
        tabagismo: values.tabagismo === 'true' ? true : false,
        etilismo: values.etilismo === 'true' ? true : false
      };

      await api.post(`/pacientes/${patient.id}/historico`, historico);

      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso'
      });
      history.push('/categorias');
    } catch(err) {
      addToast({
        type: 'error',
        message: 'Erro ao tentar registrar história pessoal, tente novamente',
      });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            { label: 'História Pessoal', route: '/categorias/historia-pessoal' },
          ]}
        />
      </div>

      <div>
        <Formik
          initialValues={{

          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <div className={classes.titleWrapper}>
                <Typography variant="h1">História Pessoal</Typography>

                <div className={classes.rightContent}>
                  <PatientInfo />

                  <Button
                    className={classes.buttonSave}
                    color="secondary"
                    disable={isSubmitting}
                    type="submit"
                    variant="contained"
                  >
                  Salvar
                  </Button>
                </div>
              </div>

              {loading ? (<CircularProgress />) : (
                <div className={classes.formContainer}>
                  <Grid
                    container
                    item
                    lg={8}
                    spacing={2}
                  >
                    <Card className={classes.form}>
                      <FormControl
                        className={classes.formGroup}
                        component="fieldset"
                      >
                        <FormLabel>
                          <Typography variant="h4">Tabagismo</Typography>
                        </FormLabel>

                        <RadioGroup
                          aria-label="tabagismo"
                          name="tabagismo"
                          onChange={handleChange}
                          value={values.tabagismo}
                        >
                          <FormControlLabel
                            control={<Radio />}
                            label="Sim"
                            value="true"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Não"
                            value="false"
                          />
                        </RadioGroup>
                      </FormControl>

                      <FormControl
                        className={classes.formGroup}
                        component="fieldset"
                      >
                        <FormLabel>
                          <Typography variant="h4">
                            Em relação ao uso de drogas ilícitas, em que opção você se enquadra?
                          </Typography>
                        </FormLabel>

                        <RadioGroup
                          aria-label="situacao_uso_drogas_id"
                          name="situacao_uso_drogas_id"
                          onChange={handleChange}
                          value={values.situacao_uso_drogas_id}
                        >
                          {usoDrogas.map(item => (
                            <FormControlLabel
                              control={<Radio />}
                              key={String(item.id)}
                              label={item.descricao}
                              value={String(item.id)}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>

                      <FormControl
                        className={classes.formGroup}
                        component="fieldset"
                      >
                        <FormLabel>
                          <Typography variant="h4">
                            Em caso de uso de drogas (atual ou ex-usuário), descrever quais drogas
                          </Typography>
                        </FormLabel>

                        <FormGroup>
                          {drogas.map(item => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={handleChange}
                                  value={item.id}
                                />
                              }
                              key={String(item.id)}
                              label={item.descricao}
                              name="drogas"
                            />
                          ))}
                        </FormGroup>
                      </FormControl>

                      <FormControl
                        className={classes.formGroup}
                        component="fieldset"
                      >
                        <FormLabel>
                          <Typography variant="h4">Etilismo</Typography>
                        </FormLabel>

                        <RadioGroup
                          aria-label="etilismo"
                          name="etilismo"
                          onChange={handleChange}
                          value={values.etilismo}
                        >
                          <FormControlLabel
                            control={<Radio />}
                            label="Etilista / Ex- etilista"
                            value="1"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Não etilista"
                            value="0"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Card>
                  </Grid>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PersonalHistory;
