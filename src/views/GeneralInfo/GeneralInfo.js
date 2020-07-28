import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles';

// Icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// Material-UI Components
import {
  Breadcrumbs,
  Typography,
  Button,
  Link as MuiLink,
} from '@material-ui/core';


const GeneralInfo = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        {/* TODO: vamos ter que realmente colocar isso num component a parte. */}
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={
            <NavigateNextIcon fontSize="small" />
          }
        >
          <MuiLink
            color="inherit"
            component={Link}
            to="/meus-pacientes"
          >
            Meus pacientes
          </MuiLink>
          <MuiLink
            color="inherit"
            component={Link}
            to="/meus-pacientes/categorias"
          >
            Categorias
          </MuiLink>
          <MuiLink
            color="textPrimary"
            component={Link}
            to="/meus-pacientes/categorias"
          >
            Informações gerais
          </MuiLink>

        </Breadcrumbs>
        <div className={classes.titleWrapper}>

          <Typography variant="h1">Informações Gerias</Typography>

          <Button
            className={classes.buttonAddPatient}
            color="secondary"
            variant="contained"
          >
            Cadastrar Paciente
          </Button>

        </div>
      </div>
    </div>
  );
}

export default GeneralInfo;
