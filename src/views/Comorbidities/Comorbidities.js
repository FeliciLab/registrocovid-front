import React from 'react';
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
  MenuItem
} from '@material-ui/core';

import PatientInfo from 'components/PatientInfo';

import useStyles from './styles';
import CustonBreadcrumbs from 'components/CustonBreadcrumbs';

const tiposDoenca = [
  {
    id: 1,
    descricao: 'Doença cardíaca'
  },
  {
    id: 2,
    descricao: 'Doença pulmonar'
  },
];


const Comorbidities = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            { label: 'Comorbidades / condições iniciais', route: '/categorias/comorbidades' },
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
          >Salvar</Button>
        </div>
      </div>
      <Paper className={classes.paper}>
        <div className={classes.control}>
          <Typography
            className={classes.label}
            variant="h6"
          >Selecione as doenças que o paciente apresenta</Typography>
          <div className={classes.chipWrapper}>
            <Chip
              label="teste"
              onClick={() => {}}
            />
            <Chip
              clickable
              color="primary"
              icon={<DoneIcon />}
              label="teste"
              onClick={() => {}}
            />
          </div>
        </div>
        <div className={classes.control}>
          <Typography
            className={classes.label}
            variant="h6"
          >Acrescente outras doenças que o paciente apresenta</Typography>
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
                  value={id}
                >{descricao}</MenuItem>
              ))}
            </TextField>
            <Button
              className={classes.buttonAdd}
              color="secondary"
              startIcon={<Add/>}
              type="button"
              variant="contained"
            >Adicionar</Button>
          </div>
          
        </div>
        <FormGroup
          className={classes.control}
          component="fieldset"
        >
          <FormLabel
            className={classes.label}
            component="legend"
          >Outras condições</FormLabel>
          <div className={classes.buttonWrapper}>
            <TextField
              className={classes.textFieldWithButton}
              label="Outras condições"
              variant="filled"
            />
            <Button
              className={classes.buttonAdd}
              color="secondary"
              startIcon={<Add/>}
              type="button"
              variant="contained"
            >Adicionar</Button>
          </div>
        </FormGroup>

        <FormGroup
          component="fieldset"
        >
          <FormLabel
            className={classes.label}
            component="legend"
          >Medicações de uso contínuo</FormLabel>
          <div className={classes.buttonWrapper}>
            <TextField
              className={classes.textFieldWithButton}
              label="Medicações de uso contínuo"
              variant="filled"
            />
            <Button
              className={classes.buttonAdd}
              color="secondary"
              startIcon={<Add/>}
              type="button"
              variant="contained"
            >Adicionar</Button>
          </div>
        </FormGroup>
      </Paper>
    </div>
  );
};


export default withRouter(Comorbidities);
