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
  FormLabel

} from '@material-ui/core';

import schema from './schema';

import api from 'services/api';

import PatientInfo from 'components/PatientInfo';
import useStyles from './styles';
import CustomBreadcrumbs from 'components/CustomBreadcrumbs';

import { useComorbidade } from 'context/ComorbidadesContext';
import { usePatient } from 'context/PatientContext';
import { useToast } from 'hooks/toast';

import OutrasDoencasItem from './OutrasDoencasItem';

import { Formik, Form, Field, FieldArray } from 'formik'
import {
  TextField,
  RadioGroup,
  CheckboxWithLabel,
} from 'formik-material-ui';
import Diseases from './diseases';

const Comorbidities = () => {
  const classes = useStyles();
  const history = useHistory();



  const {
    doencas,
    orgaos,
    corticosteroides,
    addCard,
    cards,
    handleOrgaoId,
    handleCorticosteroideId,
    removeOrgaos,
    removeCorticosteroides,
    fetchDoencasAPI,
  } = useComorbidade();

  const { patient } = usePatient();

  const { addToast } = useToast();

  const [tiposDoenca, setTiposDoenca] = useState([]);
  const [allDoencas, setAllDoencas] = useState([]);
  const [allCorticosteroides, setAllCorticosteroides] = useState([]);
  const [allOrgaos, setAllOrgaos] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [diseases, setDiseases] = useState([]);

  const [orgaosFromUser, setOrgaosFromUser] = useState([]);
  const [doencasFromUser, setDoencasFromUser] = useState([]);
  const [corticosteroidesFromUser, setCorticosteroidesFromUser] = useState([]);

  const [diabetes, setDiabetes] = useState(false);
  const [obesidade, setObesidade] = useState(false);
  const [hipertensao, setHipertensao] = useState(false);
  const [hiv, setHiv] = useState(false);
  const [tuberculose, setTuberculose] = useState(false);
  const [neoplasia, setNeoplasia] = useState(false);
  const [quimioterapia, setQuimioterapia] = useState('');

  const [transplantado, setTransplantado] = useState('');
  const [corticosteroide, setCorticosteroide] = useState('');

  const [gestacao, setGestacao] = useState('');
  const [semanasGestacao, setSemanasGestacao] = useState(0);

  const [puerperio, setPuerperio] = useState('');
  const [semanasPuerperio, setSemanasPuerperio] = useState(0);

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

          setDoencasFromUser(apiData.doencas);
          setCorticosteroidesFromUser(apiData.corticosteroides);
          setOrgaosFromUser(apiData.orgaos);

          //chips
          setDiabetes(apiData.diabetes);
          setObesidade(apiData.obesidade);
          setHipertensao(apiData.hipertensao);
          setHiv(apiData.HIV);
          setTuberculose(apiData.tuberculose);
          setNeoplasia(apiData.neoplasia);
          setQuimioterapia(apiData.quimioterapia);

          setCorticosteroide(
            apiData.corticosteroide === null
              ? ''
              : apiData.corticosteroide
                ? 'sim'
                : 'nao',
          );
          setTransplantado(
            apiData.transplantado === null
              ? ''
              : apiData.transplantado
                ? 'sim'
                : 'nao',
          );
          setQuimioterapia(
            apiData.quimioterapia === null
              ? ''
              : apiData.quimioterapia
                ? 'sim'
                : 'nao',
          );
          setGestacao(
            apiData.gestacao === null ? '' : apiData.gestacao ? 'sim' : 'nao',
          );
          setSemanasGestacao(apiData.gestacao_semanas);
          setPuerperio(
            apiData.puerperio === null ? '' : apiData.puerperio ? 'sim' : 'nao',
          );
          setSemanasPuerperio(apiData.puerperio_semanas);

          setOutrasCondicoes(apiData.outras_condicoes);
          setMedicacoes(apiData.medicacoes);

          // arrays de ids
          fetchDoencasAPI(tiposDoenca, apiData.doencas, allDoencas);
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
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (values) => {

    console.log(values);
    console.log(allDoencas);
    return

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
      gestacao_semanas: semanasGestacao,
      puerperio_semanas: semanasPuerperio,
      doencas,
      orgaos,
      corticosteroides,
      outras_condicoes: outrasCondicoes,
      medicacoes,
    };

    if (quimioterapia) {
      submitData.quimioterapia = quimioterapia === 'sim';
    }

    if (transplantado) {
      submitData.transplantado = transplantado === 'sim';
    }

    if (gestacao) {
      submitData.gestacao = gestacao === 'sim';
    }

    if (puerperio) {
      submitData.puerperio = puerperio === 'sim';
    }

    if (corticosteroide) {
      submitData.corticosteroide = corticosteroide === 'sim';
    }

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
    console.log(selectedField, selectedIds)
    if (!selectedIds.includes(selectedField.id)) {
      const disease =
        <Diseases
          doencas={allDoencas.filter(d => d.tipo_doenca_id === selectedField.id)}
          header={selectedField.descricao}
        />
      setDiseases(old => [disease, ...old])
      setSelectedIds(old => [...old, selectedField.id])
    }
  }
  const initialValues = {
    quimioterapia: '',
    transplantado: '',
    corticoides: '',
    gestacao: '',
    puerperio: '',
    orgaos: allOrgaos.map(() => false),
    corticosteroides: allCorticosteroides.map(() => false),
    doencas: allDoencas.map(() => false)
  }

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
                    <Typography variant="h3">Comorbidades / Condições clínicas de base</Typography>
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
                      disabled={isSubmitting}
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
                    >Selecione as doenças que o paciente apresenta</InputLabel>
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
                    >Acrescente outras doenças que o paciente apresenta</InputLabel>
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
                          disabled={!selectedField.id}
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
                    >Quimioterapia</InputLabel>
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
                    >Transplantado</InputLabel>
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
                  {values.transplantado == 'sim' && (
                    <Grid
                      item
                      xs={12}
                    >
                      <InputLabel
                        className={classes.label}
                        htmlFor="orgaos"
                      >Quais órgãos?</InputLabel>
                      <div id="orgaos">
                        <FieldArray
                          name={'orgaos'}
                          render={() => (
                            allOrgaos.map((orgao, index) =>
                              (<Field
                                Label={{ label: orgao.descricao }}
                                component={CheckboxWithLabel}
                                key={index}
                                name={`orgaos.${orgao.id - 1}`}
                                type={'checkbox'}
                              />)
                            )
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
                      htmlFor="corticoides"
                    >Faz uso crônico de corticóides?</InputLabel>
                    <Field
                      component={RadioGroup}
                      id="corticoides"
                      name="corticoides"
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
                  {values.corticoides === 'sim' && (
                    <Grid
                      item
                      xs={12}
                    >
                      <InputLabel
                        className={classes.label}
                        htmlFor="corticosteroides"
                      >Quais corticosteroides?</InputLabel>
                      <div id="corticosteroides">
                        <FieldArray
                          name={'corticosteroides'}
                          render={() => (
                            allCorticosteroides.map((corticosteroide, index) =>
                              (<Field
                                Label={{ label: corticosteroide.descricao }}
                                component={CheckboxWithLabel}
                                key={index}
                                name={`corticosteroides.${corticosteroide.id - 1}`}
                                type={'checkbox'}
                              />)
                            )
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
                    >Gestação</InputLabel>
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
                        htmlFor="wGestacao"
                      >Há quantas semanas?</InputLabel>
                      <div id="wGestacao">
                        <Field
                          component={TextField}
                          fullWidth
                          name={'wGestacao'}
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
                    >Puerpério</InputLabel>
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
                        htmlFor="wPuerperio"
                      >Há quantas semanas?</InputLabel>
                      <div id="wPuerperio">
                        <Field
                          component={TextField}
                          fullWidth
                          name={'wPuerperio'}
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
                              outraCondicao2 => outraCondicao2 === outraCondicao,
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
                                      outraCondicao2 => outraCondicao2 !== outraCondicao,
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
