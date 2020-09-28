import React, { useImperativeHandle, forwardRef } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Typography,
  Card,
  CardContent,
  Grid,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  FormGroup,
  FormHelperText,
  TextField,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';

import api from 'services/api';

import useStyles from '../styles';

const schema = Yup.object().shape({
  data_evolucao: Yup.date().required('Campo Obrigatório'),
  frequencia_respiratoria: Yup.number().integer('Valor deve ser inteiro'),
  pressao_sistolica: Yup.number().integer('Valor deve ser inteiro'),
  pressao_diastolica: Yup.number().integer('Valor deve ser inteiro'),
  frequencia_cardiaca: Yup.number().integer('Valor deve ser inteiro'),
  altura: Yup.number()
    .integer('Altura deve ser dada em centimetros')
    .positive('Altura deve ser positiva'),
  ascultura_pulmonar: Yup.string().max(191, 'Tamanho máximo é 120'),
});

const Form = forwardRef((props, ref) => {
  const { physicalExam, shouldDisableButton } = props;
  const classes = useStyles();
  const history = useHistory();
  const { addToast } = useToast();
  const { patient } = usePatient();

  const handleSubmit = async values => {
    try {
      const jsonToSend = {
        data_evolucao: values.data_evolucao,
        temperatura: values.temperatura || undefined,
        frequencia_respiratoria: values.frequencia_respiratoria || undefined,
        peso: values.peso || undefined,
        altura: values.altura || undefined,
        pressao_sistolica: values.pressao_sistolica || undefined,
        pressao_diastolica: values.pressao_diastolica || undefined,
        frequencia_cardiaca: values.frequencia_cardiaca || undefined,
        ascultura_pulmonar: values.ascultura_pulmonar || undefined,
        oximetria: values.oximetria || undefined,
        escala_glasgow: values.escala_glasgow || undefined,
      };

      shouldDisableButton(true);
      await api.post(`/pacientes/${patient.id}/evolucoes-diarias`, jsonToSend);
      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso',
      });

      history.push('/categorias/lista-exame-fisico');
    } catch {
      addToast({
        type: 'error',
        message: 'Erro ao tentar registrar exame físico, tente novamente',
      });
      shouldDisableButton(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      data_evolucao: physicalExam.data_evolucao || '',
      temperatura: physicalExam.temperatura || '',
      frequencia_respiratoria: physicalExam.frequencia_respiratoria || '',
      peso: physicalExam.peso || '',
      altura: physicalExam.altura || '',
      pressao_sistolica: physicalExam.pressao_sistolica || '',
      pressao_diastolica: physicalExam.pressao_diastolica || '',
      frequencia_cardiaca: physicalExam.frequencia_cardiaca || '',
      ascultura_pulmonar: physicalExam.ascultura_pulmonar || '',
      oximetria: physicalExam.oximetria || '',
      escala_glasgow: physicalExam.escala_glasgow || 0,
    },
    onSubmit: handleSubmit,
    validationSchema: schema,
    validateOnMount: true,
    abortEarly: false,
  });

  useImperativeHandle(
    ref,
    () => {
      return {
        submit: formik.handleSubmit,
      };
    },
    [formik.handleSubmit],
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.formContainer}>
        <Grid container>
          <Grid
            item
            lg={2}
          />
          <Grid
            item
            lg={8}
          >
            <Card>
              <CardContent>
                <FormGroup className={classes.formGroup}>
                  <FormLabel>
                    <Typography variant="h5">Data de evolução</Typography>
                  </FormLabel>
                  <TextField
                    className={classes.dateField}
                    error={
                      formik.errors.data_evolucao &&
                      formik.touched.data_evolucao
                    }
                    helperText={
                      formik.errors.data_evolucao &&
                      formik.touched.data_evolucao
                        ? formik.errors.data_evolucao
                        : null
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Data de evolução"
                    name="data_evolucao"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="date"
                    value={formik.values.data_evolucao}
                  />
                </FormGroup>

                <Grid
                  container
                  spacing={2}
                >
                  <Grid
                    item
                    lg={6}
                  >
                    <FormGroup className={classes.formGroup}>
                      <FormLabel>
                        <Typography variant="h5">
                          Temperatura (em graus)
                        </Typography>
                      </FormLabel>
                      <TextField
                        className={classes.dateField}
                        error={
                          formik.errors.temperatura &&
                          formik.touched.temperatura
                        }
                        helperText={
                          formik.errors.temperatura &&
                          formik.touched.temperatura
                            ? formik.errors.temperatura
                            : null
                        }
                        label="Temperatura"
                        name="temperatura"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.temperatura}
                        variant={'outlined'}
                      />
                    </FormGroup>
                  </Grid>

                  <Grid
                    item
                    lg={6}
                  >
                    <FormGroup className={classes.formGroup}>
                      <FormLabel>
                        <Typography variant="h5">
                          Frequência respiratória (irpm)
                        </Typography>
                      </FormLabel>
                      <TextField
                        className={classes.dateField}
                        error={
                          formik.errors.frequencia_respiratoria &&
                          formik.touched.frequencia_respiratoria
                        }
                        helperText={
                          formik.errors.frequencia_respiratoria &&
                          formik.touched.frequencia_respiratoria
                            ? formik.errors.frequencia_respiratoria
                            : null
                        }
                        label="Frequência respiratória"
                        name="frequencia_respiratoria"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.frequencia_respiratoria}
                        variant={'outlined'}
                      />
                    </FormGroup>
                  </Grid>

                  <Grid
                    item
                    lg={6}
                  >
                    <FormGroup className={classes.formGroup}>
                      <FormLabel>
                        <Typography variant="h5">Peso (em kg)</Typography>
                      </FormLabel>
                      <TextField
                        className={classes.dateField}
                        error={formik.errors.peso && formik.touched.peso}
                        helperText={
                          formik.errors.peso && formik.touched.peso
                            ? formik.errors.peso
                            : null
                        }
                        label="Peso"
                        name="peso"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.peso}
                        variant={'outlined'}
                      />
                    </FormGroup>
                  </Grid>

                  <Grid
                    item
                    lg={6}
                  >
                    <FormGroup className={classes.formGroup}>
                      <FormLabel>
                        <Typography variant="h5">Altura (em cm)</Typography>
                      </FormLabel>
                      <TextField
                        className={classes.dateField}
                        error={formik.errors.altura && formik.touched.altura}
                        helperText={
                          formik.errors.altura && formik.touched.altura
                            ? formik.errors.altura
                            : null
                        }
                        label="Altura"
                        name="altura"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.altura}
                        variant={'outlined'}
                      />
                    </FormGroup>
                  </Grid>

                  <Grid
                    item
                    lg={6}
                  >
                    <FormGroup className={classes.formGroup}>
                      <FormLabel>
                        <Typography variant="h5">
                          Pressão arterial sistólica (mmHg)
                        </Typography>
                      </FormLabel>
                      <TextField
                        className={classes.dateField}
                        error={
                          formik.errors.pressao_sistolica &&
                          formik.touched.pressao_sistolica
                        }
                        helperText={
                          formik.errors.pressao_sistolica &&
                          formik.touched.pressao_sistolica
                            ? formik.errors.pressao_sistolica
                            : null
                        }
                        label="Pressão arterial sistólica"
                        name="pressao_sistolica"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.pressao_sistolica}
                        variant={'outlined'}
                      />
                    </FormGroup>
                  </Grid>

                  <Grid
                    item
                    lg={6}
                  >
                    <FormGroup className={classes.formGroup}>
                      <FormLabel>
                        <Typography variant="h5">
                          Pressão arterial diastólica (mmHg)
                        </Typography>
                      </FormLabel>
                      <TextField
                        className={classes.dateField}
                        error={
                          formik.errors.pressao_diastolica &&
                          formik.touched.pressao_diastolica
                        }
                        helperText={
                          formik.errors.pressao_diastolica &&
                          formik.touched.pressao_diastolica
                            ? formik.errors.pressao_diastolica
                            : null
                        }
                        label="Pressão arterial diastólica"
                        name="pressao_diastolica"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.pressao_diastolica}
                        variant={'outlined'}
                      />
                    </FormGroup>
                  </Grid>

                  <Grid
                    item
                    lg={6}
                  >
                    <FormGroup className={classes.formGroup}>
                      <FormLabel>
                        <Typography variant="h5">
                          Frequência cardíaca
                        </Typography>
                      </FormLabel>
                      <TextField
                        className={classes.dateField}
                        error={
                          formik.errors.frequencia_cardiaca &&
                          formik.touched.frequencia_cardiaca
                        }
                        helperText={
                          formik.errors.frequencia_cardiaca &&
                          formik.touched.frequencia_cardiaca
                            ? formik.errors.frequencia_cardiaca
                            : null
                        }
                        label="Frequência cardíaca"
                        name="frequencia_cardiaca"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.frequencia_cardiaca}
                        variant={'outlined'}
                      />
                    </FormGroup>
                  </Grid>

                  <Grid
                    item
                    lg={6}
                  >
                    <FormGroup className={classes.formGroup}>
                      <FormLabel>
                        <Typography variant="h5">Ausculta pulmonar</Typography>
                      </FormLabel>
                      <TextField
                        className={classes.dateField}
                        error={
                          formik.errors.ascultura_pulmonar &&
                          formik.touched.ascultura_pulmonar
                        }
                        helperText={
                          formik.errors.ascultura_pulmonar &&
                          formik.touched.ascultura_pulmonar
                            ? formik.errors.ascultura_pulmonar
                            : null
                        }
                        label="Ausculta pulmonar"
                        name="ascultura_pulmonar"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.ascultura_pulmonar}
                        variant={'outlined'}
                      />
                    </FormGroup>
                  </Grid>

                  <Grid
                    item
                    lg={6}
                  >
                    <FormGroup className={classes.formGroup}>
                      <FormLabel>
                        <Typography variant="h5">
                          Oximetria de pulso (%)
                        </Typography>
                      </FormLabel>
                      <TextField
                        className={classes.dateField}
                        error={
                          formik.errors.oximetria && formik.touched.oximetria
                        }
                        helperText={
                          formik.errors.oximetria && formik.touched.oximetria
                            ? formik.errors.oximetria
                            : null
                        }
                        label="Oximetria"
                        name="oximetria"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.oximetria}
                        variant={'outlined'}
                      />
                    </FormGroup>
                  </Grid>

                  <Grid
                    item
                    lg={6}
                  >
                    <FormGroup className={classes.formGroup}>
                      <FormLabel>
                        <Typography variant="h5">Escala de Glasgow</Typography>
                      </FormLabel>
                      <FormControl variant={'outlined'}>
                        <Select
                          className={classes.dateField}
                          error={
                            formik.errors.escala_glasgow &&
                            formik.touched.escala_glasgow
                          }
                          helperText={
                            formik.errors.escala_glasgow &&
                            formik.touched.escala_glasgow
                              ? formik.errors.escala_glasgow
                              : null
                          }
                          name="escala_glasgow"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.escala_glasgow}
                        >
                          <MenuItem
                            disabled
                            value={0}
                          >
                            Escolher
                          </MenuItem>
                          {new Array(13).fill('').map((_, index) => (
                            <MenuItem
                              key={String(Math.random())}
                              value={3 + index}
                            >
                              {3 + index}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText error>
                          {formik.errors.escala_glasgow &&
                          formik.touched.escala_glasgow
                            ? formik.errors.escala_glasgow
                            : null}
                        </FormHelperText>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </form>
  );
});

export default Form;
