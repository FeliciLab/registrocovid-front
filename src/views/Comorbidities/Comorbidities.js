import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
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
} from '@material-ui/core';

import CardComorbirdades from './CardComorbidades';
import PatientInfo from 'components/PatientInfo';
import useStyles from './styles';
import CustonBreadcrumbs from 'components/CustonBreadcrumbs';

const Comorbidities = () => {
  const classes = useStyles();

  const [diabetes, setDiabetesStatus] = useState(false);
  const [obesidade, setObesidadeStatus] = useState(false);
  const [hipertensao, setHipertensaoStatus] = useState(false);
  const [hiv, setHivStatus] = useState(false);
  const [tuberculose, setTuberculoseStatus] = useState(false);
  const [renal, setRenalStatus] = useState(false);
  
  const [selectedField, setSelectedField] = useState({});

  const [cards, setCards] = useState([]);

  const handleClickMenu = (id, descricao) => {
    setSelectedField({ id, descricao });
  };

  const handleClickFieldButton = () => {
    const { id, descricao } = selectedField;

    if (cards.some((card) => card.id === id)) {
      return;
    }

    const filteredDoencas = doencas.filter((doenca) => doenca.tipo_doenca_id === id);

    setCards((prevCards) => [...prevCards, { id, doencas: filteredDoencas, descricao }]);
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
            type="submit"
            variant="contained"
          >
            Salvar
          </Button>
        </div>
      </div>
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
                setDiabetesStatus(diabetes => !diabetes);
              }}
            />
            <Chip
              clickable
              color={obesidade ? 'primary' : 'default'}
              icon={obesidade ? <DoneIcon /> : null}
              label="Obesidade"
              onClick={() => {
                setObesidadeStatus(obesidade => !obesidade);
              }}
            />
            <Chip
              clickable
              color={hipertensao ? 'primary' : 'default'}
              icon={hipertensao ? <DoneIcon /> : null}
              label="hipertensao"
              onClick={() => {
                setHipertensaoStatus(hipertensao => !hipertensao);
              }}
            />
            <Chip
              clickable
              color={hiv ? 'primary' : 'default'}
              icon={hiv ? <DoneIcon /> : null}
              label="hiv"
              onClick={() => {
                setHivStatus(hiv => !hiv);
              }}
            />
            <Chip
              clickable
              color={tuberculose ? 'primary' : 'default'}
              icon={tuberculose ? <DoneIcon /> : null}
              label="tuberculose"
              onClick={() => {
                setTuberculoseStatus(tuberculose => !tuberculose);
              }}
            />
            <Chip
              clickable
              color={renal ? 'primary' : 'default'}
              icon={renal ? <DoneIcon /> : null}
              label="renal"
              onClick={() => {
                setRenalStatus(renal => !renal);
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
                  onClick={() => handleClickMenu(id, descricao)}
                  value={id}
                >
                  {descricao}
                </MenuItem>
              ))}
            </TextField>
            <Button
              className={classes.buttonAdd}
              color="secondary"
              onClick={handleClickFieldButton}
              startIcon={<Add />}
              type="button"
              variant="contained"
            >
              Adicionar
            </Button>
          </div>
        </div>

        {cards.map((card) => (
          <CardComorbirdades
            doencas={card.doencas}
            key={card.id}
            tipoDoenca={card.descricao}
          />
        )
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
              variant="filled"
            />
            <Button
              className={classes.buttonAdd}
              color="secondary"
              startIcon={<Add />}
              type="button"
              variant="contained"
            >
              Adicionar
            </Button>
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
              variant="filled"
            />
            <Button
              className={classes.buttonAdd}
              color="secondary"
              startIcon={<Add />}
              type="button"
              variant="contained"
            >
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
    'id': 1,
    'descricao': 'Doença cardíaca'
  },
  {
    'id': 2,
    'descricao': 'Doença vascular periférica'
  },
  {
    'id': 3,
    'descricao': 'Doença pulmonar'
  },
  {
    'id': 4,
    'descricao': 'Doença reumatológica'
  },
  {
    'id': 5,
    'descricao': 'Neoplasia'
  },
  {
    'id': 6,
    'descricao': 'Doença autoimune'
  },
  {
    'id': 7,
    'descricao': 'Doença renal crônica'
  },
  {
    'id': 8,
    'descricao': 'Doença hepática crônica'
  },
  {
    'id': 9,
    'descricao': 'Doença neurológica'
  },
  {
    'id': 10,
    'descricao': 'Doença psiquiátrica'
  }
];

const doencas = [
  {
    'id': 1,
    'tipo_doenca_id': 1,
    'descricao': 'Doença arterial coronariana'
  },
  {
    'id': 2,
    'tipo_doenca_id': 1,
    'descricao': 'Insuficiência cardíaca congestiva'
  },
  {
    'id': 3,
    'tipo_doenca_id': 1,
    'descricao': 'Arritmia cardíaca'
  },
  {
    'id': 4,
    'tipo_doenca_id': 1,
    'descricao': 'Cardiopatia não-especificada'
  },
  {
    'id': 5,
    'tipo_doenca_id': 2,
    'descricao': 'Insuficiencia venosa'
  },
  {
    'id': 7,
    'tipo_doenca_id': 3,
    'descricao': 'Doença pulmonar obstrutiva crônica'
  },
  {
    'id': 8,
    'tipo_doenca_id': 3,
    'descricao': 'Asma'
  }
];

