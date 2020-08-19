import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useHistory } from 'react-router-dom';

import {
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';

import CustonBreadcrumbs from 'components/CustonBreadcrumbs';
import PatientInfo from 'components/PatientInfo';
import Form from './components/Form';

import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';

import api from 'services/api';

import useStyles from './styles';

const PhysicalExam = () => {
  const classes = useStyles();
  const history = useHistory();
  const { addToast } = useToast();
  const { patient } = usePatient();

  const formRef = useRef(null);
  const buttonDisabled = useRef(false);

  const [loading, setLoading] = useState(false);
  const [physicalExam, setPhysicalExam] = useState({});

  const handleInfos = useCallback(async () => {
    try {
      setLoading(true);
<<<<<<< HEAD
=======
      //TODO Carregar informações apartir do history.params.examId ( Se vinher da Listagem )

      const response = await api.get(`/pacientes/${patient.id}/evolucoes-diarias/50`);
>>>>>>> 4eba20aedaceb830178855d0812edc1d9e1612b4

      const response = await api.get(`/pacientes/${patient.id}/evolucoes-diarias/8`);
      setPhysicalExam(response.data);

      if (response.status === 200) {
        buttonDisabled.current = true;
      }
    } catch (err) {
      if (err.response.status === 404) {
        return null;
      }

      addToast({
        type: 'error',
        message: 'Erro ao tentar carregar informações, tente novamente',
      });

      history.goBack();
    } finally {
      setLoading(false);
    }
  }, [addToast, history, patient.id]);

  useEffect(() => {
    handleInfos();
  }, [handleInfos]);

  const handleSubmit = () => {
    formRef.current.submit();
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            { label: 'Exame Físico', route: '/categorias/exame-fisico' },
          ]}
        />
      </div>

      <div>
        <div className={classes.titleWrapper}>
          <Typography variant="h1">Exame Físico</Typography>

          <div className={classes.rightContent}>
            <PatientInfo />

            <Button
              className={classes.buttonSave}
              color="secondary"
              disabled={buttonDisabled.current}
              onClick={handleSubmit}
              type="submit"
              variant="contained"
            >
              Salvar
            </Button>
          </div>
        </div>

        {loading ? <CircularProgress /> : (
          <Form
            physicalExam={physicalExam}
            ref={formRef}
          />
        )}
      </div>
    </div>
  );
}

export default PhysicalExam;
<<<<<<< HEAD
=======

const Form = forwardRef((props, ref) => {
  const { physicalExam } = props;
  const classes = useStyles();
  const history = useHistory();
  const { addToast } = useToast();
  const { patient } = usePatient();

  const handleSubmit = async (values) => {
    try {

      let jsonToSend = Object.fromEntries(
        Object.entries(values).filter( 
          ent => ent[1] || (ent[0] === 0 && ent[0] !== 'escala_glasgow' )
        )
      )

      await api.post(`/pacientes/${patient.id}/evolucoes-diarias`, jsonToSend);

      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso'
      });
      history.push('/categorias'); // TODO mudar para rota da listagem
    } catch {
      addToast({
        type: 'error',
        message: 'Erro ao tentar registrar história pessoal, tente novamente',
      });
    }
  };

  const formik = useFormik({
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
      escala_glasgow: physicalExam.escala_glasgow || 0
    },
    onSubmit: handleSubmit,
    validationSchema: schema,
    validateOnMount: true,
    abortEarly: true,
  });

  useImperativeHandle(ref, () => {
    return {
      submit: formik.handleSubmit,
      disableButton: formik.isSubmitting
    }
  }, [formik.handleSubmit]);

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
            <Card className={''}>
              <CardContent className={''}>
                <FormGroup className={classes.formGroup}>
                  <FormLabel>
                    <Typography variant="h5">Data de evolução</Typography>
                  </FormLabel>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.dateField}
                    error={(formik.errors.data_evolucao && formik.touched.data_evolucao)}
                    helperText={
                      (formik.errors.data_evolucao && formik.touched.data_evolucao) ? formik.errors.data_evolucao : null
                    }
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
                        <Typography variant="h5">Temperatura (em graus)</Typography>
                      </FormLabel>
                      <TextField
                        className={classes.dateField}
                        error={(formik.errors.temperatura && formik.touched.temperatura)}
                        helperText={
                          (formik.errors.temperatura && formik.touched.temperatura) ? formik.errors.temperatura : null
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
                        <Typography variant="h5">Frequência respiratória (irpm)</Typography>
                      </FormLabel>
                      <TextField
                        className={classes.dateField}
                        error={(formik.errors.frequencia_respiratoria && formik.touched.frequencia_respiratoria)}
                        helperText={
                          (formik.errors.frequencia_respiratoria && formik.touched.frequencia_respiratoria) ? 
                            formik.errors.frequencia_respiratoria : null
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
                        error={(formik.errors.peso && formik.touched.peso)}
                        helperText={
                          (formik.errors.peso && formik.touched.peso) ? 
                            formik.errors.peso : null
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
                        error={(formik.errors.altura && formik.touched.altura)}
                        helperText={
                          (formik.errors.altura && formik.touched.altura) ? 
                            formik.errors.altura : null
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
                        <Typography variant="h5">Pressão arterial sistólica (mmHg)</Typography>
                      </FormLabel>
                      <TextField
                        className={classes.dateField}
                        error={(formik.errors.pressao_sistolica && formik.touched.pressao_sistolica)}
                        helperText={
                          (formik.errors.pressao_sistolica && formik.touched.pressao_sistolica) ? 
                            formik.errors.pressao_sistolica : null
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
                        <Typography variant="h5">Pressão arterial diastólica (mmHg)</Typography>
                      </FormLabel>
                      <TextField
                        className={classes.dateField}
                        error={(formik.errors.pressao_diastolica && formik.touched.pressao_diastolica)}
                        helperText={
                          (formik.errors.pressao_diastolica && formik.touched.pressao_diastolica) ? 
                            formik.errors.pressao_diastolica : null
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
                        <Typography variant="h5">Frequência cardíaca</Typography>
                      </FormLabel>
                      <TextField
                        className={classes.dateField}
                        error={(formik.errors.frequencia_cardiaca && formik.touched.frequencia_cardiaca)}
                        helperText={
                          (formik.errors.frequencia_cardiaca && formik.touched.frequencia_cardiaca) ? 
                            formik.errors.frequencia_cardiaca : null
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
                        error={(formik.errors.ascultura_pulmonar && formik.touched.ascultura_pulmonar)}
                        helperText={
                          (formik.errors.ascultura_pulmonar && formik.touched.ascultura_pulmonar) ? 
                            formik.errors.ascultura_pulmonar : null
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
                        <Typography variant="h5">Oximetria de pulso (%)</Typography>
                      </FormLabel>
                      <TextField
                        className={classes.dateField}
                        error={(formik.errors.oximetria && formik.touched.oximetria)}
                        helperText={
                          (formik.errors.oximetria && formik.touched.oximetria) ? 
                            formik.errors.oximetria : null
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
                          error={(formik.errors.escala_glasgow && formik.touched.escala_glasgow)}
                          helperText={
                            (formik.errors.escala_glasgow && formik.touched.escala_glasgow) ? 
                              formik.errors.escala_glasgow : null
                          }
                          name="escala_glasgow"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.escala_glasgow}
                        >
                          <MenuItem
                            disabled
                            value={0}
                          >Escolher</MenuItem>
                          {new Array(13).fill('').map((_, index) => (
                            <MenuItem
                              key={String(Math.random())}
                              value={3 + index}
                            >
                              {3 + index}
                            </MenuItem>
                          )
                          )}
                        </Select>
                        <FormHelperText error>{
                          (formik.errors.escala_glasgow && formik.touched.escala_glasgow) ? 
                            formik.errors.escala_glasgow : null
                        }
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
  )
});

>>>>>>> 4eba20aedaceb830178855d0812edc1d9e1612b4
