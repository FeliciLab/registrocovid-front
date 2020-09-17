import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import DoneIcon from '@material-ui/icons/Done';
import Add from '@material-ui/icons/Add';
import {
  Typography,
  Button,
  Paper,
  Chip,
  FormGroup,
  FormLabel,
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from '@material-ui/core';

import api from 'services/api';

import CardComorbirdades from './CardComorbidades';
import PatientInfo from 'components/PatientInfo';
import useStyles from './styles';
import CustomBreadcrumbs from 'components/CustomBreadcrumbs';

import { useComorbidade } from 'context/ComorbidadesContext';
import { usePatient } from 'context/PatientContext';
import { useToast } from 'hooks/toast';

import CheckBoxCard from './CheckBoxCard';

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

  const [orgaosFromUser, setOrgaosFromUser] = useState([]);
  const [doencasFromUser, setDoencasFromUser] = useState([]);
  const [corticosteroidesFromUser, setCorticosteroidesFromUser] = useState([]);

  const [diabetes, setDiabetes] = useState(false);
  const [obesidade, setObesidade] = useState(false);
  const [hipertensao, setHipertensao] = useState(false);
  const [hiv, setHiv] = useState(false);
  const [tuberculose, setTuberculose] = useState(false);
  const [neoplasia, setNeoplasia] = useState(false);
  const [quimioterapia, setQuimioterapia] = useState(false);

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

  const [selectedField, setSelectedField] = useState({});

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
  }, []);

  const handleSubmit = async () => {
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

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustomBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'Comorbidades / condições iniciais',
              route: '/categorias/comorbidades',
            },
          ]}
        />
      </div>
      <div className={classes.titleWrapper}>
        <Typography variant="h1">Comorbidades / condições clínicas</Typography>
        <div className={classes.patientWrapper}>
          <PatientInfo />
          <Button
            className={classes.buttonSave}
            color="secondary"
            disabled={isSaving || visualization}
            onClick={handleSubmit}
            type="submit"
            variant="contained"
          >
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Paper className={classes.paper}>
          <div className={classes.control}>
            <Typography
              className={classes.label}
              variant="h6"
            >
              Selecione as doenças que o paciente apresenta
            </Typography>
            <div className={classes.chipWrapper}>
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
                color={neoplasia ? 'primary' : 'default'}
                icon={neoplasia ? <DoneIcon /> : null}
                label="Neoplasia"
                onClick={() => {
                  if (visualization) {
                    return;
                  }

                  setNeoplasia(prevNeoplasia => !prevNeoplasia);
                }}
              />
              <Chip
                clickable
                color={quimioterapia ? 'primary' : 'default'}
                icon={quimioterapia ? <DoneIcon /> : null}
                label="Quimioterapia"
                onClick={() => {
                  if (visualization) {
                    return;
                  }

                  setQuimioterapia(prevQuimioterapia => !prevQuimioterapia);
                }}
              />
              <Chip
                clickable
                color={hipertensao ? 'primary' : 'default'}
                icon={hipertensao ? <DoneIcon /> : null}
                label="Hipertensão (pressão arterial)"
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
          </div>

          {!visualization && (
            <div className={classes.control}>
              <Typography
                className={classes.label}
                variant="h6"
              >
                Acrescente outras doenças que o paciente apresenta
              </Typography>
              <div className={classes.buttonWrapper}>
                <TextField
                  className={classes.textFieldWithButton}
                  label="Escolher tipo de doença"
                  select
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
                </TextField>
                <Button
                  className={classes.buttonAdd}
                  color="secondary"
                  disabled={visualization}
                  onClick={() => {
                    if (visualization) {
                      return;
                    }

                    addCard(selectedField, allDoencas);
                  }}
                  startIcon={<Add />}
                  type="button"
                  variant="contained"
                >
                  Adicionar
                </Button>
              </div>
            </div>
          )}

          {cards.map(card => (
            <CardComorbirdades
              card={card}
              doencasFromUser={doencasFromUser}
              key={card.id}
            />
          ))}

          <FormGroup
            className={classes.control}
            component="fieldset"
          >
            <FormLabel
              className={classes.label}
              component="legend"
            >
              Transplantado
            </FormLabel>
            <RadioGroup
              aria-label="transplantado"
              name="transplantado"
              onChange={event => setTransplantado(event.target.value)}
              value={transplantado}
            >
              <div className={classes.radiosWrapper}>
                <FormControlLabel
                  control={<Radio />}
                  label="Sim"
                  value="sim"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Não"
                  onClick={removeOrgaos}
                  value="nao"
                />
              </div>
            </RadioGroup>
          </FormGroup>

          {transplantado === 'sim' && (
            <FormGroup
              className={classes.control}
              component="fieldset"
            >
              <FormLabel
                className={classes.label}
                component="legend"
              >
                Quais órgãos?
              </FormLabel>
              <div className={classes.orgaosWrapper}>
                {allOrgaos.map(orgao => (
                  <CheckBoxCard
                    alreadyExists={orgaosFromUser.some(
                      item => item.id === orgao.id,
                    )}
                    handleArray={handleOrgaoId}
                    id={orgao.id}
                    label={orgao.descricao}
                  />
                ))}
              </div>
            </FormGroup>
          )}

          <FormGroup
            className={classes.control}
            component="fieldset"
          >
            <FormLabel
              className={classes.label}
              component="legend"
            >
              Usou corticosteroides por mais de 15 dias?
            </FormLabel>
            <RadioGroup
              aria-label="corticosteroides"
              name="corticosteroides"
              onChange={event => setCorticosteroide(event.target.value)}
              value={corticosteroide}
            >
              <div className={classes.radiosWrapper}>
                <FormControlLabel
                  control={<Radio />}
                  label="Sim"
                  value="sim"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Não"
                  onClick={removeCorticosteroides}
                  value="nao"
                />
              </div>
            </RadioGroup>
          </FormGroup>

          {corticosteroide === 'sim' && (
            <FormGroup
              className={classes.control}
              component="fieldset"
            >
              <FormLabel
                className={classes.label}
                component="legend"
              >
                Quais corticosteroides?
              </FormLabel>
              <div className={classes.orgaosWrapper}>
                {allCorticosteroides.map(corticosteroide => (
                  <CheckBoxCard
                    alreadyExists={corticosteroidesFromUser.some(
                      item => item.id === corticosteroide.id,
                    )}
                    handleArray={handleCorticosteroideId}
                    id={corticosteroide.id}
                    key={corticosteroide.id}
                    label={corticosteroide.descricao}
                  />
                ))}
              </div>
            </FormGroup>
          )}

          <FormGroup
            className={classes.control}
            component="fieldset"
          >
            <FormLabel
              className={classes.label}
              component="legend"
            >
              Gestação
            </FormLabel>
            <RadioGroup
              aria-label="gestacao"
              name="gestacao"
              onChange={event => setGestacao(event.target.value)}
              value={gestacao}
            >
              <div className={classes.radiosWrapper}>
                <FormControlLabel
                  control={<Radio />}
                  label="Sim"
                  value="sim"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Não"
                  value="nao"
                />
              </div>
            </RadioGroup>
          </FormGroup>

          {gestacao === 'sim' && (
            <FormGroup
              className={classes.control}
              component="fieldset"
            >
              <FormLabel
                className={classes.label}
                component="legend"
              >
                Há quantas semanas?
              </FormLabel>
              <TextField
                onChange={event => setSemanasGestacao(event.target.value)}
                type="number"
                value={semanasGestacao}
              />
            </FormGroup>
          )}

          <FormGroup
            className={classes.control}
            component="fieldset"
          >
            <FormLabel
              className={classes.label}
              component="legend"
            >
              Puerpério
            </FormLabel>
            <RadioGroup
              aria-label="puerperio"
              name="puerperio"
              onChange={event => setPuerperio(event.target.value)}
              value={puerperio}
            >
              <div className={classes.radiosWrapper}>
                <FormControlLabel
                  control={<Radio />}
                  label="Sim"
                  value="sim"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Não"
                  onClick={() => setSemanasPuerperio(0)}
                  value="nao"
                />
              </div>
            </RadioGroup>
          </FormGroup>

          {puerperio === 'sim' && (
            <FormGroup
              className={classes.control}
              component="fieldset"
            >
              <FormLabel
                className={classes.label}
                component="legend"
              >
                Há quantas semanas?
              </FormLabel>
              <TextField
                onChange={event => setSemanasPuerperio(event.target.value)}
                type="number"
                value={semanasPuerperio}
              />
            </FormGroup>
          )}

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
              <TextField
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
                  if (visualization) {
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
                outrasCondicoes.map(outraCondicao => (
                  <Chip
                    color="primary"
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

          <FormGroup component="fieldset">
            <FormLabel
              className={classes.label}
              component="legend"
            >
              Medicações de uso contínuo
            </FormLabel>
            <div className={classes.buttonWrapper}>
              <TextField
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
                  if (visualization) {
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
                medicacoes.map(medicacao => (
                  <Chip
                    color="primary"
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
        </Paper>
      )}
    </div>
  );
};

export default withRouter(Comorbidities);
