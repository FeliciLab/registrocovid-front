import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import DoneIcon from '@material-ui/icons/Done';
import Add from '@material-ui/icons/Add';
import api from 'services/api';
import {
  Typography,
  Button,
  Paper,
  Chip,
  FormGroup,
  FormLabel,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import PatientInfo from 'components/PatientInfo';
import useStyles from './styles';
import CustonBreadcrumbs from 'components/CustonBreadcrumbs';
import { usePatient } from 'context/PatientContext';

const Comorbidities = () => {
  const classes = useStyles();
  useEffect(() => {
    // setIsFetching(true);
    try {
      getPacientes();
    } catch (err) {
      console.log('error');
      // addToast({
      //   type: 'error',
      //   message:
      //     'Ocorreu um erro ao carregar os sintomas, por favor tente novamente',
      // });
      // setIsFetching(false);
    }
  }, []);

  async function getPacientes() {
    // const response = await api.get(`/pacientes/${patient.id}/comorbidades`);
    // return response;
  }

  const { patient, addPatient } = usePatient();

  const [diabetes, setDiabetesStatus] = useState(false);
  const [obesidade, setObesidadeStatus] = useState(false);
  const [hipertensao, setHipertensaoStatus] = useState(false);
  const [hiv, setHivStatus] = useState(false);
  const [tuberculose, setTuberculoseStatus] = useState(false);
  const [renal, setRenalStatus] = useState(false);

  function CardComorbirdades() {
    return (
      <Paper style={{ padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>
            Doenças cardiacas
          </Typography>
        </div>

        <Typography style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>
          Selecione a(s) doença(s) que o paciente apresenta
        </Typography>
        <CheckBoxComorbirdades label="teste" />
      </Paper>
    );
  }

  function CheckBoxComorbirdades({ label }) {
    const [checked, setChecked] = useState(false);
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            inputProps={checked ? 'aria-label' : 'primary checkbox'}
            onChange={() => setChecked(checked => !checked)}
          />
        }
        label={label}
      />
    );
  }

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
            type="submit"
            variant="contained">
            Salvar
          </Button>
        </div>
      </div>
      <Paper className={classes.paper}>
        <div className={classes.control}>
          <Typography className={classes.label} variant="h6">
            Selecione as doenças que o paciente apresenta
          </Typography>
          <div className={classes.chipWrapper}>
            <Chip
              clickable
              color={diabetes ? 'primary' : ''}
              icon={diabetes ? <DoneIcon /> : ''}
              label="Diabetes"
              onClick={() => {
                setDiabetesStatus(diabetes => !diabetes);
              }}
            />
            <Chip
              clickable
              color={obesidade ? 'primary' : ''}
              icon={obesidade ? <DoneIcon /> : ''}
              label="Obesidade"
              onClick={() => {
                setObesidadeStatus(obesidade => !obesidade);
              }}
            />
            <Chip
              clickable
              color={hipertensao ? 'primary' : ''}
              icon={hipertensao ? <DoneIcon /> : ''}
              label="hipertensao"
              onClick={() => {
                setHipertensaoStatus(hipertensao => !hipertensao);
              }}
            />
            <Chip
              clickable
              color={hiv ? 'primary' : ''}
              icon={hiv ? <DoneIcon /> : ''}
              label="hiv"
              onClick={() => {
                setHivStatus(hiv => !hiv);
              }}
            />
            <Chip
              clickable
              color={tuberculose ? 'primary' : ''}
              icon={tuberculose ? <DoneIcon /> : ''}
              label="tuberculose"
              onClick={() => {
                setTuberculoseStatus(tuberculose => !tuberculose);
              }}
            />
            <Chip
              clickable
              color={renal ? 'primary' : ''}
              icon={renal ? <DoneIcon /> : ''}
              label="renal"
              onClick={() => {
                setRenalStatus(renal => !renal);
              }}
            />
          </div>
        </div>

        <div className={classes.control}>
          <Typography className={classes.label} variant="h6">
            Acrescente outras doenças que o paciente apresenta
          </Typography>
          <div className={classes.buttonWrapper}>
            <TextField
              className={classes.textFieldWithButton}
              label="Escolher tipo de doença"
              select
              variant="filled">
              {tiposDoenca.map(({ id, descricao }) => (
                <MenuItem key={id} value={id}>
                  {descricao}
                </MenuItem>
              ))}
            </TextField>
            <Button
              className={classes.buttonAdd}
              color="secondary"
              startIcon={<Add />}
              type="button"
              variant="contained">
              Adicionar
            </Button>
          </div>
        </div>

        <CardComorbirdades />

        <FormGroup className={classes.control} component="fieldset">
          <FormLabel className={classes.label} component="legend">
            Outras condições
          </FormLabel>
          <div className={classes.buttonWrapper}>
            <TextField
              className={classes.textFieldWithButton}
              label="Outras condições"
              variant="filled"
            />
            <Button
              className={classes.buttonAdd}
              color="secondary"
              startIcon={<Add />}
              type="button"
              variant="contained">
              Adicionar
            </Button>
          </div>
        </FormGroup>

        <FormGroup component="fieldset">
          <FormLabel className={classes.label} component="legend">
            Medicações de uso contínuo
          </FormLabel>
          <div className={classes.buttonWrapper}>
            <TextField
              className={classes.textFieldWithButton}
              label="Medicações de uso contínuo"
              variant="filled"
            />
            <Button
              className={classes.buttonAdd}
              color="secondary"
              startIcon={<Add />}
              type="button"
              variant="contained">
              Adicionar
            </Button>
          </div>
        </FormGroup>
      </Paper>
    </div>
  );
};

export default withRouter(Comorbidities);

const tiposDoenca = [
  {
    id: 1,
    descricao: 'Doença cardíaca',
  },
  {
    id: 2,
    descricao: 'Doença pulmonar',
  },
];

const comorbirdades = {
  id: 1,
  paciente_id: 2,
  diabetes: false,
  obesidade: true,
  hipertensao: null,
  doenca_cardiaca: null,
  doenca_vascular_periferica: null,
  doenca_pulmonar_cronica: null,
  doenca_reumatologica: null,
  neoplasia: null,
  quimioterapia: null,
  HIV: null,
  transplantado: null,
  corticosteroide: null,
  doenca_autoimune: null,
  doenca_renal_cronica: null,
  doenca_hepatica_cronica: null,
  doenca_neurologica: null,
  tuberculose: null,
  gestacao: null,
  gestacao_semanas: null,
  puerperio: null,
  puerperio_semanas: null,
  outras_condicoes: ['Outra Comorbidade 1', 'Outra Comorbidade 2'],
  medicacoes: ['Medicacao 1', 'Medicacao 2'],
  created_at: '2020-08-18T19:46:42.000000Z',
  updated_at: '2020-08-18T19:46:42.000000Z',
  doencas: [
    {
      id: 1,
      tipo_doenca_id: 1,
      descricao: 'Doença arterial coronariana',
      pivot: {
        comorbidade_id: 1,
        doenca_id: 1,
      },
    },
    {
      id: 4,
      tipo_doenca_id: 1,
      descricao: 'Cardiopatia não-especificada',
      pivot: {
        comorbidade_id: 1,
        doenca_id: 4,
      },
    },
  ],
  orgaos: [
    {
      id: 2,
      descricao: 'Estômago',
      pivot: {
        comorbidade_id: 1,
        orgao_id: 2,
      },
    },
  ],
  corticosteroides: [
    {
      id: 1,
      descricao: 'Prednisona > 40 mg/dia',
      pivot: {
        comorbidade_id: 1,
        corticosteroide_id: 1,
      },
    },
    {
      id: 2,
      descricao: 'Hidrocortisona > 160 mg/dia',
      pivot: {
        comorbidade_id: 1,
        corticosteroide_id: 2,
      },
    },
    {
      id: 3,
      descricao: 'Metilprednisolona > 32 mg/dia',
      pivot: {
        comorbidade_id: 1,
        corticosteroide_id: 3,
      },
    },
  ],
};
