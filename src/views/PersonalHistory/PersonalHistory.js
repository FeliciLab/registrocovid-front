import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { useHistory } from 'react-router-dom';

import CloseIcon from '@material-ui/icons/Close';
import {
  Typography,
  Button,
  IconButton,
  Card,
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  CircularProgress,
  Checkbox,
  FormGroup,
} from '@material-ui/core';

import { useFormik } from 'formik';

import CustomBreadcrumbs from 'components/CustomBreadcrumbs';
import PatientInfo from 'components/PatientInfo';

import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';

import api from 'services/api';

import useStyles from './styles';
import { UnfoldLess } from '@material-ui/icons';

const PersonalHistory = () => {
  const classes = useStyles();
  const history = useHistory();
  const { addToast } = useToast();
  const { patient } = usePatient();

  const formRef = useRef(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [loading, setLoading] = useState(false);
  const [patientHistory, setPatientHistory] = useState({});
  const [usoDrogas, setUsoDrogas] = useState([]);
  const [drogas, setDrogas] = useState([]);

  const handleInfos = useCallback(async () => {
    try {
      setLoading(true);

      const responseUsoDrogas = await api.get('/situacao-uso-drogas');
      setUsoDrogas(responseUsoDrogas.data);

      const responseDrogas = await api.get('/drogas');
      setDrogas(responseDrogas.data);

      const responseHistory = await api.get(
        `/pacientes/${patient.id}/historico`,
      );
      setPatientHistory(responseHistory.data);

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
  };

  const handleChange = (bool) => {
    if(Object.keys(patientHistory).length === 0){
      setButtonDisabled(bool);
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustomBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'História Pessoal',
              route: '/categorias/historia-pessoal',
            },
          ]}
        />
      </div>

      <div>
        <div className={classes.titleWrapper}>
          <Typography variant="h1">História Pessoal</Typography>

          <div className={classes.rightContent}>
            <PatientInfo />

            <Button
              className={classes.buttonSave}
              color="secondary"
              disabled={buttonDisabled}
              onClick={handleSubmit}
              type="submit"
              variant="contained"
            >
              Salvar
            </Button>
          </div>
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <Form
            drogas={drogas}
            onChange={(bool) => handleChange(bool)}
            patientHistory={patientHistory}
            ref={formRef}
            usoDrogas={usoDrogas}
          />
        )}
      </div>
    </div>
  );
};

export default PersonalHistory;

const Form = forwardRef((props, ref) => {
  const { patientHistory, usoDrogas, drogas, onChange } = props;
  const classes = useStyles();
  const history = useHistory();
  const { addToast } = useToast();
  const { patient } = usePatient();

  const handleSubmit = async values => {
    try {
      const historico = {};
      values.situacao_uso_drogas_id
        ? (historico.situacao_uso_drogas_id = Number(
          values.situacao_uso_drogas_id,
        ))
        : (historico.situacao_uso_drogas_id = undefined);
      values.drogas
        ? (historico.drogas = values.drogas)
        : (historico.drogas = undefined);
      values.tabagismo
        ? values.tabagismo === 'true'
          ? (historico.tabagismo = true)
          : (historico.tabagismo = false)
        : (historico.tabagismo = undefined);
      values.etilismo
        ? values.etilismo === 'true'
          ? (historico.vetilismo = true)
          : (historico.etilismo = false)
        : (historico.etilismo = undefined);

      await api.post(`/pacientes/${patient.id}/historico`, historico);

      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso',
      });
      history.push('/categorias');
    } catch (err) {
      console.log(err);
      addToast({
        type: 'error',
        message: 'Erro ao tentar registrar história pessoal, tente novamente',
      });
    }
  };



  const formik = useFormik({
    initialValues: {
      tabagismo: patientHistory.tabagismo || '',
      situacao_uso_drogas_id: patientHistory.situacao_uso_drogas_id || '',
      drogas: patientHistory.drogas?.map(droga => droga.id),
      etilismo: patientHistory.etilismo || '',
    },
    onSubmit: handleSubmit,
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

  function shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }

    return true;
  }

  useEffect(() => {
    onChange(shallowEqual(formik.values, formik.initialValues));
  }, [formik.values])


  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.formContainer}>
        <Card className={classes.form}>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              sm={12}
            >
              <CardInfo
                items={[
                  {
                    label: 'Fumante Diário:',
                    description: '1 cigarro ao dia por no mínimo 1 mês',
                  },
                  {
                    label: 'Fumante ocasional:',
                    description:
                      'menos de 1 cigarro por dia por no mínimo 1 mês',
                  },
                  {
                    label: 'Ex-fumante:',
                    description: 'parou de fumar há pelo menos 1 mês',
                  },
                  {
                    label: 'Não fumante:',
                    description: 'nunca fumaram ou fumam há menos de 1 mês',
                  },
                ]}
                title="Classificação do tabagismo segundo OMS:"
              />
            </Grid>
            <Grid
              item
              sm={12}
            >
              <FormControl
                className={classes.formGroup}
                component="fieldset"
              >
                <FormLabel>
                  <Typography variant="h4">Tabagismo</Typography>
                </FormLabel>

                <RadioGroup
                  name="tabagismo"
                  value={formik.values.tabagismo}
                >
                  <FormControlLabel
                    control={
                      <Radio
                        onChange={formik.handleChange}
                        value="true"
                      />
                    }
                    label="Sim"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        onChange={formik.handleChange}
                        value="false"
                      />
                    }
                    label="Não"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid
              item
              sm={12}
            >
              <FormControl
                className={classes.formGroup}
                component="fieldset"
              >
                <FormLabel>
                  <Typography variant="h4">
                    Em relação ao uso de drogas ilícitas, em que opção você se
                    enquadra?
                  </Typography>
                </FormLabel>

                <RadioGroup
                  name="situacao_uso_drogas_id"
                  value={formik.values.situacao_uso_drogas_id}
                >
                  {usoDrogas.map(item => (
                    <FormControlLabel
                      control={
                        <Radio
                          onChange={formik.handleChange}
                          value={String(item.id)}
                        />
                      }
                      key={String(item.id)}
                      label={item.descricao}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid
              item
              sm={12}
            >
              <FormControl
                className={classes.formGroup}
                component="fieldset"
              >
                <FormLabel>
                  <Typography variant="h4">
                    Em caso de uso de drogas (atual ou ex-usuário), descrever
                    quais drogas
                  </Typography>
                </FormLabel>

                <FormGroup
                  name="drogas"
                  value={formik.values.drogas}
                >
                  {drogas.map(item => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formik.initialValues.drogas?.includes(
                            item.id,
                          )}
                          onChange={formik.handleChange}
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
            </Grid>

            <Grid
              item
              sm={12}
            >
              <CardInfo
                items={[
                  {
                    label: 'Etilista:',
                    description:
                      'consumo de pelo menos 1 unidade (ver abaixo) de qualquer bebida alcoólica por dia no último ano',
                  },
                  {
                    label: 'Ex-etilista:',
                    description:
                      'já consumiu bebida alcoólica, mas parou de consumir no último ano',
                  },
                  {
                    label: 'Não etilista:',
                    description:
                      'nunca consumiu bebida alcoólica na frequência de etilista',
                  },
                ]}
                title="Classificação do etilismo segundo OMS:"
              />
            </Grid>
            <Grid
              item
              sm={12}
            >
              <FormControl
                className={classes.formGroup}
                component="fieldset"
              >
                <FormLabel>
                  <Typography variant="h4">Etilismo</Typography>
                </FormLabel>

                <RadioGroup
                  name="etilismo"
                  value={formik.values.etilismo}
                >
                  <FormControlLabel
                    control={
                      <Radio
                        onChange={formik.handleChange}
                        value="true"
                      />
                    }
                    label="Etilista / Ex- etilista"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        onChange={formik.handleChange}
                        value="false"
                      />
                    }
                    label="Não etilista"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Card>
      </div>
    </form>
  );
});

function CardInfo({ title, items }) {
  const classes = useStyles();

  const [showCard, setShowCard] = useState(true);

  if (!showCard) {
    return null;
  }

  return (
    <Card className={classes.cardInfo}>
      <div className={classes.titleContainer}>
        <Typography
          className={classes.title}
          variant="subtitle1"
        >
          {title}
        </Typography>

        <IconButton
          aria-label="delete"
          onClick={() => setShowCard(state => !state)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>

      {items.map(item => (
        <div
          key={String(Math.random())}
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <Typography
            className={classes.label}
            variant="subtitle1"
          >
            {item.label}
          </Typography>
          <Typography
            className={classes.description}
            variant="subtitle1"
          >
            {item.description}
          </Typography>
        </div>
      ))}
    </Card>
  );
}
