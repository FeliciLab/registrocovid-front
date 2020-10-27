import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import DoneIcon from '@material-ui/icons/Done';
import Add from '@material-ui/icons/Add';
import {
  Typography,
  Button,
  FormControl,
  Paper,
  FormControlLabel,
  Radio,
  MenuItem,
  CircularProgress,
  Grid,
  InputLabel,
  Chip,
  TextField as MuiTextField,
  FormGroup,
  FormLabel,
} from '@material-ui/core';

import schema from './schema';

import api from 'services/api';

import PatientInfo from 'components/PatientInfo';
import useStyles from './styles';
import CustomBreadcrumbs from 'components/CustomBreadcrumbs';

import { usePatient } from 'context/PatientContext';
import { useToast } from 'hooks/toast';

import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField, RadioGroup, CheckboxWithLabel } from 'formik-material-ui';
import Diseases from './diseases';

const Comorbidities = () => {
  const classes = useStyles();
  const history = useHistory();

  const { patient } = usePatient();

  const { addToast } = useToast();

  const [tiposDoenca, setTiposDoenca] = useState([]);
  const [allDoencas, setAllDoencas] = useState([]);
  const [allCorticosteroides, setAllCorticosteroides] = useState([]);
  const [allOrgaos, setAllOrgaos] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [diseases, setDiseases] = useState([]);

  const [diabetes, setDiabetes] = useState(false);
  const [obesidade, setObesidade] = useState(false);
  const [hipertensao, setHipertensao] = useState(false);
  const [hiv, setHiv] = useState(false);
  const [tuberculose, setTuberculose] = useState(false);
  const [neoplasia, setNeoplasia] = useState(false);
  const [quimioterapia, setQuimioterapia] = useState('');
  const [apiValues, setInitialValues] = useState({});

  const [outrasCondicoes, setOutrasCondicoes] = useState([]);
  const [medicacoes, setMedicacoes] = useState([]);

  const [outraCondicao, setOutraCondicao] = useState('');
  const [medicacao, setMedicacao] = useState('');
  const [selectedField, setSelectedField] = useState({ id: '' });
  const [isSaving, setIsSaving] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [visualization, setVisualization] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    api
      .get('/tipos-doencas')
      .then(response => {
        setTiposDoenca(response.data);
      })
      .catch(() => {
        addToast({
          type: 'error',
          message:
            'Ocorreu um erro ao carregar os tipos de doenças, por favor tente novamente.',
        });
      });

    api
      .get('/corticosteroides')
      .then(response => {
        setAllCorticosteroides(response.data);
      })
      .catch(() => {
        addToast({
          type: 'error',
          message:
            'Ocorreu um erro ao carregar os corticosteroides, por favor tente novamente.',
        });
      });

    api
      .get('/orgaos')
      .then(response => {
        setAllOrgaos(response.data);
      })
      .catch(() => {
        addToast({
          type: 'error',
          message:
            'Ocorreu um erro ao carregar os orgaos, por favor tente novamente.',
        });
      });

    api
      .get('/doencas')
      .then(response => {
        setAllDoencas(response.data);
      })
      .catch(() => {
        addToast({
          type: 'error',
          message:
            'Ocorreu um erro ao carregar as doenças, por favor tente novamente.',
        });
      });

    api
      .get(`/pacientes/${patient.id}/comorbidades`)
      .then(response => {
        if (response.status === 204) {
          setVisualization(false);
          setIsLoading(false);
          return;
        } else {
          setVisualization(true);

          const apiData = response.data;

          //chips
          setDiabetes(apiData.diabetes);
          setObesidade(apiData.obesidade);
          setHipertensao(apiData.hipertensao);
          setHiv(apiData.HIV);
          setTuberculose(apiData.tuberculose);
          setNeoplasia(apiData.neoplasia);
          setQuimioterapia(apiData.quimioterapia);

          setInitialValues(apiData);
          setOutrasCondicoes(apiData.outras_condicoes);
          setMedicacoes(apiData.medicacoes);
        }
        setIsLoading(false);
      })
      .catch(() => {
        addToast({
          type: 'error',
          message:
            'Ocorreu um erro ao carregar suas informações, por favor tente novamente.',
        });
      });
  }, []);

  useEffect(() => {
    const tipoDoencas = tiposDoenca.filter(td =>
      apiValues.doencas.some(ad => ad.tipo_doenca_id === td.id),
    );
    const disease = tipoDoencas.map((td, index) => (
      <Diseases
        doencas={allDoencas.filter(d => d.tipo_doenca_id === td.id)}
        header={td.descricao}
        key={index}
      />
    ));
    setDiseases(disease);
  }, [apiValues, allDoencas, tiposDoenca]);

  const handleSubmit = async values => {
    if (visualization) {
      return;
    }

    const submitData = {
      diabetes,
      obesidade,
      hipertensao,
      neoplasia,
      quimioterapia,
      HIV: hiv,
      tuberculose,
      outras_condicoes: outrasCondicoes,
      medicacoes,
    };

    if (values.gestacao_semanas) {
      submitData.gestacao_semanas = values.gestacao_semanas;
    }
    if (values.puerperio_semanas) {
      submitData.puerperio_semanas = values.puerperio_semanas;
    }

    Object.entries(values).forEach(entrie => {
      if (Array.isArray(entrie[1])) {
        let array_values = [];
        entrie[1].forEach((v, index) =>
          v ? array_values.push(index + 1) : '',
        );
        submitData[`${entrie[0]}`] = array_values;
      } else if (typeof entrie[1] === 'string') {
        if (entrie[1]) submitData[`${entrie[0]}`] = entrie[1] === 'sim';
      }
    });

    selectedIds.forEach(id => {
      switch (id) {
        case 1:
          submitData.doenca_cardiaca = true;
          break;
        case 2:
          submitData.doenca_vascular_periferica = true;
          break;
        case 3:
          submitData.doenca_pulmonar_cronica = true;
          break;
        case 4:
          submitData.doenca_reumatologica = true;
          break;
        case 5:
          submitData.cancer = true;
          break;
        case 6:
          submitData.doenca_renal_cronica = true;
          break;
        case 7:
          submitData.doenca_hepatica_cronica = true;
          break;
        case 8:
          submitData.doenca_neurologica = true;
          break;
        case 9:
          submitData.doenca_tireoide = true;
          break;
        case 10:
          submitData.doenca_psiquiatrica = true;
          break;
        default:
          break;
      }
    });

    setIsSaving(true);
    try {
      await api.post(`/pacientes/${patient.id}/comorbidades`, submitData);

      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso',
      });
      setIsSaving(false);
      history.push('/categorias');
    } catch (err) {
      addToast({
        type: 'error',
        message:
          'Ocorreu um erro ao salvar os dados, por favor tente novamente',
      });
      setIsSaving(false);
    }
  };

  const handleAdd = () => {
    if (!selectedIds.includes(selectedField.id)) {
      const disease = (
        <Diseases
          doencas={allDoencas.filter(
            d => d.tipo_doenca_id === selectedField.id,
          )}
          header={selectedField.descricao}
        />
      );
      setDiseases(old => [disease, ...old]);
      setSelectedIds(old => [...old, selectedField.id]);
    }
  };
  const initialValues = {
    quimioterapia:
      apiValues.quimioterapia === true
        ? 'sim'
        : apiValues.quimioterapia === false
          ? 'nao'
          : '',
    transplantado:
      apiValues.transplantado === true
        ? 'sim'
        : apiValues.transplantado === false
          ? 'nao'
          : '',
    corticosteroide:
      apiValues.corticosteroide === true
        ? 'sim'
        : apiValues.corticosteroide === false
          ? 'nao'
          : '',
    gestacao:
      apiValues.gestacao === true
        ? 'sim'
        : apiValues.gestacao === false
          ? 'nao'
          : '',
    gestacao_semanas: apiValues.gestacao_semanas || '',
    puerperio_semanas: apiValues.puerperio_semanas || '',
    puerperio:
      apiValues.puerperio === true
        ? 'sim'
        : apiValues.puerperio === false
          ? 'nao'
          : '',

    orgaos: allOrgaos.map(ao =>
      apiValues.orgaos ? apiValues.orgaos.some(or => or.id === ao.id) : false,
    ),
    corticosteroides: allCorticosteroides.map(ac =>
      apiValues.corticosteroides
        ? apiValues.corticosteroides.some(co => co.id === ac.id)
        : false,
    ),
    doencas: allDoencas.map(ad =>
      apiValues.doencas
        ? apiValues.doencas.some(doenca => doenca.id === ad.id)
        : false,
    ),

    doenca_cardiaca:
      apiValues.doenca_cardiaca === true
        ? 'sim'
        : apiValues.doenca_cardiaca === false
          ? 'nao'
          : '',
    doenca_vascular_periferica:
      apiValues.doenca_vascular_periferica === true
        ? 'sim'
        : apiValues.doenca_vascular_periferica === false
          ? 'nao'
          : '',
    doenca_pulmonar_cronica:
      apiValues.doenca_pulmonar_cronica === true
        ? 'sim'
        : apiValues.doenca_pulmonar_cronica === false
          ? 'nao'
          : '',
    doenca_reumatologica:
      apiValues.doenca_reumatologica === true
        ? 'sim'
        : apiValues.doenca_reumatologica === false
          ? 'nao'
          : '',
    cancer:
      apiValues.cancer === true
        ? 'sim'
        : apiValues.cancer === false
          ? 'nao'
          : '',
    doenca_renal_cronica:
      apiValues.doenca_renal_cronica === true
        ? 'sim'
        : apiValues.doenca_renal_cronica === false
          ? 'nao'
          : '',
    doenca_hepatica_cronica:
      apiValues.doenca_hepatica_cronica === true
        ? 'sim'
        : apiValues.doenca_hepatica_cronica === false
          ? 'nao'
          : '',
    doenca_neurologica:
      apiValues.doenca_neurologica === true
        ? 'sim'
        : apiValues.doenca_neurologica === false
          ? 'nao'
          : '',
    doenca_tireoide:
      apiValues.doenca_tireoide === true
        ? 'sim'
        : apiValues.doenca_tireoide === false
          ? 'nao'
          : '',
    doenca_psiquiatrica:
      apiValues.doenca_psiquiatrica === true
        ? 'sim'
        : apiValues.doenca_psiquiatrica === false
          ? 'nao'
          : '',
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustomBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'Comorbidades / Condições clínicas de base',
              route: '/categorias/comorbidades',
            },
          ]}
        />
      </div>
      {isLoading ? (
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
            {({ isSubmitting, values }) => (
              <Form component={FormControl}>
                <Grid
                  className={classes.titleWrapper}
                  container
                >
                  <Grid
                    className={classes.actionSection}
                    item
                    xs={6}
                  >
                    <Typography variant="h3">
                      Comorbidades / Condições clínicas de base
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                  >
                    <PatientInfo />
                  </Grid>
                  <Grid
                    item
                    xs={3}
                  >
                    <Button
                      className={classes.buttonSave}
                      color="secondary"
                      disabled={
                        isSubmitting ||
                        isSaving ||
                        Object.keys(apiValues).length > 0
                      }
                      type="submit"
                      variant="contained"
                    >
                      Salvar
                    </Button>
                  </Grid>
                </Grid>

                <Grid
                  className={classes.paper}
                  component={Paper}
                  container
                  item
                  spacing={2}
                  xs={8}
                >
                  <Grid
                    item
                    xs={12}
                  >
                    <InputLabel
                      className={classes.label}
                      htmlFor="chips"
                    >
                      Selecione as doenças que o paciente apresenta
                    </InputLabel>
                    <div
                      className={classes.chipWrapper}
                      id="chips"
                    >
                      <Chip
                        clickable
                        color={diabetes ? 'primary' : 'default'}
                        icon={diabetes ? <DoneIcon /> : null}
                        label="Diabetes"
                        onClick={() => {
                          if (visualization) {
                            return;
                          }
                          setDiabetes(prevDiabetes => !prevDiabetes);
                        }}
                      />
                      <Chip
                        clickable
                        color={obesidade ? 'primary' : 'default'}
                        icon={obesidade ? <DoneIcon /> : null}
                        label="Obesidade"
                        onClick={() => {
                          if (visualization) {
                            return;
                          }
                          setObesidade(prevObesidade => !prevObesidade);
                        }}
                      />

                      <Chip
                        clickable
                        color={hipertensao ? 'primary' : 'default'}
                        icon={hipertensao ? <DoneIcon /> : null}
                        label="Hipertensão"
                        onClick={() => {
                          if (visualization) {
                            return;
                          }
                          setHipertensao(prevHipertensao => !prevHipertensao);
                        }}
                      />
                      <Chip
                        clickable
                        color={hiv ? 'primary' : 'default'}
                        icon={hiv ? <DoneIcon /> : null}
                        label="HIV Positivo"
                        onClick={() => {
                          if (visualization) {
                            return;
                          }
                          setHiv(prevHiv => !prevHiv);
                        }}
                      />
                      <Chip
                        clickable
                        color={tuberculose ? 'primary' : 'default'}
                        icon={tuberculose ? <DoneIcon /> : null}
                        label="Tuberculose"
                        onClick={() => {
                          if (visualization) {
                            return;
                          }
                          setTuberculose(prevTuberculose => !prevTuberculose);
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <InputLabel
                      className={classes.label}
                      htmlFor="diseaseTypeSelect"
                    >
                      Acrescente outras doenças que o paciente apresenta
                    </InputLabel>
                    <Grid
                      alignItems={'center'}
                      container
                    >
                      <Grid
                        item
                        xs={10}
                      >
                        <MuiTextField
                          className={classes.textFieldWithButton}
                          label="Escolher tipo de doença"
                          select
                          value={selectedField.id}
                          variant="filled"
                        >
                          {tiposDoenca.map(({ id, descricao }) => (
                            <MenuItem
                              key={id}
                              onClick={() => {
                                setSelectedField({ id, descricao });
                              }}
                              value={id}
                            >
                              {descricao}
                            </MenuItem>
                          ))}
                        </MuiTextField>
                      </Grid>
                      <Grid
                        item
                        xs={2}
                      >
                        <Button
                          className={classes.buttonAdd}
                          color="secondary"
                          disabled={
                            !selectedField.id ||
                            Object.keys(apiValues).length > 0
                          }
                          onClick={() => handleAdd()}
                          startIcon={<Add />}
                          type="button"
                          variant="contained"
                        >
                          Adicionar
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  {diseases}
                  <Grid
                    item
                    xs={12}
                  >
                    <InputLabel
                      className={classes.label}
                      htmlFor="quimioterapia"
                    >
                      Quimioterapia
                    </InputLabel>
                    <Field
                      component={RadioGroup}
                      id="quimioterapia"
                      name="quimioterapia"
                      row
                    >
                      <FormControlLabel
                        control={<Radio />}
                        disabled={isSubmitting}
                        label={'Sim'}
                        value={'sim'}
                      />
                      <FormControlLabel
                        control={<Radio />}
                        disabled={isSubmitting}
                        label={'Não'}
                        value={'nao'}
                      />
                    </Field>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <InputLabel
                      className={classes.label}
                      htmlFor="transplantado"
                    >
                      Transplantado
                    </InputLabel>
                    <Field
                      component={RadioGroup}
                      id="transplantado"
                      name="transplantado"
                      row
                    >
                      <FormControlLabel
                        control={<Radio />}
                        disabled={isSubmitting}
                        label={'Sim'}
                        value={'sim'}
                      />
                      <FormControlLabel
                        control={<Radio />}
                        disabled={isSubmitting}
                        label={'Não'}
                        value={'nao'}
                      />
                    </Field>
                  </Grid>
                  {values.transplantado === 'sim' && (
                    <Grid
                      item
                      xs={12}
                    >
                      <InputLabel
                        className={classes.label}
                        htmlFor="orgaos"
                      >
                        Quais órgãos?
                      </InputLabel>
                      <div id="orgaos">
                        <FieldArray
                          name={'orgaos'}
                          render={() =>
                            allOrgaos.map((orgao, index) => (
                              <Field
                                component={CheckboxWithLabel}
                                key={index}
                                Label={{ label: orgao.descricao }}
                                name={`orgaos.${orgao.id - 1}`}
                                type={'checkbox'}
                              />
                            ))
                          }
                        />
                      </div>
                    </Grid>
                  )}
                  <Grid
                    item
                    xs={12}
                  >
                    <InputLabel
                      className={classes.label}
                      htmlFor="corticosteroide"
                    >
                      Faz uso crônico de corticóides?
                    </InputLabel>
                    <Field
                      component={RadioGroup}
                      id="corticosteroide"
                      name="corticosteroide"
                      row
                    >
                      <FormControlLabel
                        control={<Radio />}
                        disabled={isSubmitting}
                        label={'Sim'}
                        value={'sim'}
                      />
                      <FormControlLabel
                        control={<Radio />}
                        disabled={isSubmitting}
                        label={'Não'}
                        value={'nao'}
                      />
                    </Field>
                  </Grid>
                  {values.corticosteroide === 'sim' && (
                    <Grid
                      item
                      xs={12}
                    >
                      <InputLabel
                        className={classes.label}
                        htmlFor="corticosteroides"
                      >
                        Quais corticosteroides?
                      </InputLabel>
                      <div id="corticosteroides">
                        <FieldArray
                          name={'corticosteroides'}
                          render={() =>
                            allCorticosteroides.map(
                              (corticosteroide, index) => (
                                <Field
                                  component={CheckboxWithLabel}
                                  key={index}
                                  Label={{ label: corticosteroide.descricao }}
                                  name={`corticosteroides.${corticosteroide.id -
                                    1}`}
                                  type={'checkbox'}
                                />
                              ),
                            )
                          }
                        />
                      </div>
                    </Grid>
                  )}
                  <Grid
                    item
                    xs={12}
                  >
                    <InputLabel
                      className={classes.label}
                      htmlFor="gestacao"
                    >
                      Gestação
                    </InputLabel>
                    <Field
                      component={RadioGroup}
                      id="gestacao"
                      name="gestacao"
                      row
                    >
                      <FormControlLabel
                        control={<Radio />}
                        disabled={isSubmitting}
                        label={'Sim'}
                        value={'sim'}
                      />
                      <FormControlLabel
                        control={<Radio />}
                        disabled={isSubmitting}
                        label={'Não'}
                        value={'nao'}
                      />
                    </Field>
                  </Grid>
                  {values.gestacao === 'sim' && (
                    <Grid
                      item
                      xs={12}
                    >
                      <InputLabel
                        className={classes.label}
                        htmlFor="gestacao_semanas"
                      >
                        Há quantas semanas?
                      </InputLabel>
                      <div id="gestacao_semanas">
                        <Field
                          component={TextField}
                          fullWidth
                          name={'gestacao_semanas'}
                          type={'number'}
                        />
                      </div>
                    </Grid>
                  )}

                  <Grid
                    item
                    xs={12}
                  >
                    <InputLabel
                      className={classes.label}
                      htmlFor="puerperio"
                    >
                      Puerpério
                    </InputLabel>
                    <Field
                      component={RadioGroup}
                      id="puerperio"
                      name="puerperio"
                      row
                    >
                      <FormControlLabel
                        control={<Radio />}
                        disabled={isSubmitting}
                        label={'Sim'}
                        value={'sim'}
                      />
                      <FormControlLabel
                        control={<Radio />}
                        disabled={isSubmitting}
                        label={'Não'}
                        value={'nao'}
                      />
                    </Field>
                  </Grid>
                  {values.puerperio === 'sim' && (
                    <Grid
                      item
                      xs={12}
                    >
                      <InputLabel
                        className={classes.label}
                        htmlFor="puerperio_semanas"
                      >
                        Há quantas semanas?
                      </InputLabel>
                      <div id="puerperio_semanas">
                        <Field
                          component={TextField}
                          fullWidth
                          name={'puerperio_semanas'}
                          type={'number'}
                        />
                      </div>
                    </Grid>
                  )}
                  <Grid
                    item
                    xs={12}
                  >
                    <FormGroup
                      className={classes.control}
                      component="fieldset"
                    >
                      <FormLabel
                        className={classes.label}
                        component="legend"
                      >
                        Outras condições
                      </FormLabel>
                      <div className={classes.buttonWrapper}>
                        <MuiTextField
                          className={classes.textFieldWithButton}
                          label="Outras condições"
                          onChange={event => {
                            setOutraCondicao(event.target.value);
                          }}
                          variant="filled"
                        />
                        <Button
                          className={classes.buttonAdd}
                          color="secondary"
                          disabled={visualization}
                          onClick={() => {
                            if (visualization || outraCondicao === '') {
                              return;
                            }

                            const exists = outrasCondicoes.some(
                              outraCondicao2 =>
                                outraCondicao2 === outraCondicao,
                            );

                            if (!exists) {
                              setOutrasCondicoes(prevOutrasCondicoes => [
                                ...prevOutrasCondicoes,
                                outraCondicao,
                              ]);
                            }
                          }}
                          startIcon={<Add />}
                          type="button"
                          variant="contained"
                        >
                          Adicionar
                        </Button>
                      </div>
                      <div className={classes.chipWrapper}>
                        {outrasCondicoes &&
                          outrasCondicoes.map((outraCondicao, index) => (
                            <Chip
                              color="primary"
                              key={index}
                              label={outraCondicao}
                              onDelete={() => {
                                setOutrasCondicoes(
                                  outrasCondicoes.filter(
                                    outraCondicao2 =>
                                      outraCondicao2 !== outraCondicao,
                                  ),
                                );
                              }}
                            />
                          ))}
                      </div>
                    </FormGroup>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <FormGroup component="fieldset">
                      <FormLabel
                        className={classes.label}
                        component="legend"
                      >
                        Medicações de uso contínuo
                      </FormLabel>
                      <div className={classes.buttonWrapper}>
                        <MuiTextField
                          className={classes.textFieldWithButton}
                          label="Medicações de uso contínuo"
                          onChange={event => {
                            setMedicacao(event.target.value);
                          }}
                          variant="filled"
                        />
                        <Button
                          className={classes.buttonAdd}
                          color="secondary"
                          disabled={visualization}
                          onClick={() => {
                            if (visualization || medicacao === '') {
                              return;
                            }
                            const exists = medicacoes.some(
                              medicacao2 => medicacao2 === medicacao,
                            );
                            if (!exists) {
                              setMedicacoes(prevMedicacoes => [
                                ...prevMedicacoes,
                                medicacao,
                              ]);
                            }
                          }}
                          startIcon={<Add />}
                          type="button"
                          variant="contained"
                        >
                          Adicionar
                        </Button>
                      </div>
                      <div className={classes.chipWrapper}>
                        {medicacoes &&
                          medicacoes.map((medicacao, index) => (
                            <Chip
                              color="primary"
                              key={index}
                              label={medicacao}
                              onDelete={() => {
                                setMedicacoes(
                                  medicacoes.filter(
                                    medicacao2 => medicacao2 !== medicacao,
                                  ),
                                );
                              }}
                            />
                          ))}
                      </div>
                    </FormGroup>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default withRouter(Comorbidities);
