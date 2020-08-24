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
import CustonBreadcrumbs from 'components/CustonBreadcrumbs';

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

  useEffect(() => {
    setLoading(true);
    // const response = getUserComorbidades();

    //chips
    setDiabetes(apiCompleta.diabetes);
    setObesidade(apiCompleta.obesidade);
    setHipertensao(apiCompleta.hipertensao);
    setHiv(apiCompleta.HIV);
    setTuberculose(apiCompleta.tuberculose);
    setNeoplasia(apiCompleta.neoplasia);
    setQuimioterapia(apiCompleta.quimioterapia);

    setCorticosteroide(apiCompleta.corticosteroide ? 'sim' : 'nao');

    setTransplantado(apiCompleta.transplantado ? 'sim' : 'nao');
    setGestacao(apiCompleta.gestacao ? 'sim' : 'nao');
    setSemanasGestacao(apiCompleta.gestacao_semanas);
    setPuerperio(apiCompleta.puerperio ? 'sim' : 'nao');
    setSemanasPuerperio(apiCompleta.puerperio_semanas);

    setOutrasCondicoes(apiCompleta.outras_condicoes);
    setMedicacoes(apiCompleta.medicacoes);

    fetchDoencasAPI(tiposDoenca, apiCompleta.doencas, doencasAPI);

    setLoading(false);
  }, []);

  const { patient } = usePatient();
  const { addToast } = useToast();

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

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const submitData = {
      diabetes,
      obesidade,
      hipertensao,
      neoplasia,
      quimioterapia,
      HIV: hiv,
      transplantado: transplantado === 'sim',
      tuberculose,
      gestacao: gestacao === 'sim',
      gestacao_semanas: semanasGestacao,
      puerperio: puerperio === 'sim',
      puerperio_semanas: semanasPuerperio,
      doencas,
      orgaos,
      corticosteroide: corticosteroide === 'sim',
      corticosteroides,
      outras_condicoes: outrasCondicoes,
      medicacoes,
    };

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
        <CustonBreadcrumbs
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
            disabled={isSaving}
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
                  setDiabetes(prevDiabetes => !prevDiabetes);
                }}
              />
              <Chip
                clickable
                color={obesidade ? 'primary' : 'default'}
                icon={obesidade ? <DoneIcon /> : null}
                label="Obesidade"
                onClick={() => {
                  setObesidade(prevObesidade => !prevObesidade);
                }}
              />
              <Chip
                clickable
                color={neoplasia ? 'primary' : 'default'}
                icon={neoplasia ? <DoneIcon /> : null}
                label="Neoplasia"
                onClick={() => {
                  setNeoplasia(prevNeoplasia => !prevNeoplasia);
                }}
              />
              <Chip
                clickable
                color={quimioterapia ? 'primary' : 'default'}
                icon={quimioterapia ? <DoneIcon /> : null}
                label="Quimioterapia"
                onClick={() => {
                  setQuimioterapia(prevQuimioterapia => !prevQuimioterapia);
                }}
              />
              <Chip
                clickable
                color={hipertensao ? 'primary' : 'default'}
                icon={hipertensao ? <DoneIcon /> : null}
                label="Hipertensão (pressão arterial)"
                onClick={() => {
                  setHipertensao(prevHipertensao => !prevHipertensao);
                }}
              />
              <Chip
                clickable
                color={hiv ? 'primary' : 'default'}
                icon={hiv ? <DoneIcon /> : null}
                label="HIV Positivo"
                onClick={() => {
                  setHiv(prevHiv => !prevHiv);
                }}
              />
              <Chip
                clickable
                color={tuberculose ? 'primary' : 'default'}
                icon={tuberculose ? <DoneIcon /> : null}
                label="Tuberculose"
                onClick={() => {
                  setTuberculose(prevTuberculose => !prevTuberculose);
                }}
              />
            </div>
          </div>

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
                    onClick={() => setSelectedField({ id, descricao })}
                    value={id}
                  >
                    {descricao}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                className={classes.buttonAdd}
                color="secondary"
                onClick={() => addCard(selectedField, doencasAPI)}
                startIcon={<Add />}
                type="button"
                variant="contained"
              >
                Adicionar
              </Button>
            </div>
          </div>

          {cards.map(card => (
            <CardComorbirdades
              card={card}
              doencas={apiCompleta.doencas}
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
                {orgaosAPI.map(orgao => (
                  <CheckBoxCard
                    alreadyExists={apiCompleta.orgaos.some(item => item.id === orgao.id)}
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
                {corticosteroidesAPI.map(corticosteroide => (
                  <CheckBoxCard
                    alreadyExists={apiCompleta.corticosteroides.some(item => item.id === corticosteroide.id)}
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
                onClick={() => {
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
                onClick={() => {
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

const orgaosAPI = [
  {
    id: 1,
    descricao: 'Coracao',
  },
  {
    id: 2,
    descricao: 'Estômago',
  },
  {
    id: 3,
    descricao: 'Fígado',
  },
];

const tiposDoenca = [
  {
    id: 1,
    descricao: 'Doença cardíaca',
  },
  {
    id: 2,
    descricao: 'Doença vascular periférica',
  },
  {
    id: 3,
    descricao: 'Doença pulmonar',
  },
  {
    id: 4,
    descricao: 'Doença reumatológica',
  },
  {
    id: 5,
    descricao: 'Neoplasia',
  },
  {
    id: 6,
    descricao: 'Doença autoimune',
  },
  {
    id: 7,
    descricao: 'Doença renal crônica',
  },
  {
    id: 8,
    descricao: 'Doença hepática crônica',
  },
  {
    id: 9,
    descricao: 'Doença neurológica',
  },
  {
    id: 10,
    descricao: 'Doença psiquiátrica',
  },
];

const doencasAPI = [
  {
    id: 1,
    tipo_doenca_id: 1,
    descricao: 'Doença arterial coronariana',
  },
  {
    id: 2,
    tipo_doenca_id: 1,
    descricao: 'Insuficiência cardíaca congestiva',
  },
  {
    id: 3,
    tipo_doenca_id: 1,
    descricao: 'Arritmia cardíaca',
  },
  {
    id: 4,
    tipo_doenca_id: 1,
    descricao: 'Cardiopatia não-especificada',
  },
  {
    id: 5,
    tipo_doenca_id: 2,
    descricao: 'Insuficiencia venosa',
  },
  {
    id: 7,
    tipo_doenca_id: 3,
    descricao: 'Doença pulmonar obstrutiva crônica',
  },
  {
    id: 8,
    tipo_doenca_id: 3,
    descricao: 'Asma',
  },
];

const corticosteroidesAPI = [
  {
    id: 1,
    descricao: 'Prednisona > 40 mg dia',
  },
  {
    id: 2,
    descricao: 'Hidrocortisona > 160 mg dia',
  },
  {
    id: 3,
    descricao: 'Metilprednisolona > 32 mg dia',
  },
  {
    id: 4,
    descricao: 'Dexametasona > 6 mg dia',
  },
];

const apiCompleta = {
  id: 2,
  paciente_id: 19,
  diabetes: true,
  obesidade: true,
  hipertensao: false,
  doenca_cardiaca: null,
  doenca_vascular_periferica: null,
  doenca_pulmonar_cronica: null,
  doenca_reumatologica: null,
  neoplasia: true,
  quimioterapia: false,
  HIV: false,
  transplantado: false,
  corticosteroide: true,
  doenca_autoimune: null,
  doenca_renal_cronica: null,
  doenca_hepatica_cronica: null,
  doenca_neurologica: null,
  tuberculose: false,
  gestacao: false,
  gestacao_semanas: 0,
  puerperio: true,
  puerperio_semanas: 2,
  outras_condicoes: ['Teste'],
  medicacoes: ['Teste1', 'Teste2'],
  created_at: '2020-08-21T20:28:26.000000Z',
  updated_at: '2020-08-21T20:28:26.000000Z',
  doencas: [
    {
      id: 1,
      tipo_doenca_id: 1,
      descricao: 'Doença arterial coronariana',
      pivot: {
        comorbidade_id: 2,
        doenca_id: 1,
      },
    },
  ],
  orgaos: [],
  corticosteroides: [
    {
      id: 1,
      descricao: 'Prednisona > 40 mg/dia',
      pivot: {
        comorbidade_id: 2,
        corticosteroide_id: 1,
      },
    },
    {
      id: 4,
      descricao: 'Dexametasona > 6 mg/dia',
      pivot: {
        comorbidade_id: 2,
        corticosteroide_id: 4,
      },
    },
  ],
};
