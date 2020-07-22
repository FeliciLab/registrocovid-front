import React, { useState } from 'react';

import useStyles from './styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import TablePatients from './components/TablePatients';

import {
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Breadcrumbs,
  Link as MuiLink,
} from '@material-ui/core';

const ListPatients = () => {

  const classes = useStyles();

  // TODO: usar a api para popular essas informações.
  const [patients, /* setPatientes */] = useState([
    { numProntuario: '#546546464', dataInternacao: '24/05/2020', dataCadastro: '13/07/2020' },
    { numProntuario: '#546546464', dataInternacao: '24/05/2020', dataCadastro: '13/07/2020' },
    { numProntuario: '#546546464', dataInternacao: '24/05/2020', dataCadastro: '13/07/2020' },
    { numProntuario: '#546546464', dataInternacao: '24/05/2020', dataCadastro: '13/07/2020' },
    { numProntuario: '#546546464', dataInternacao: '24/05/2020', dataCadastro: '13/07/2020' },
    { numProntuario: '#546546464', dataInternacao: '24/05/2020', dataCadastro: '13/07/2020' },
  ]);

  return (
    <div className={classes.root}>

      {/*
        TODO: Acho que esse component deve estar nos layouts básicos.
        Muito provavelmente, será um componente separado.
      */}
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={
          <NavigateNextIcon fontSize="small" />
        }
      >
        <MuiLink component={Link} color="inherit" to="/meus-pacientes" >
          Meus pacientes
        </MuiLink>
        <MuiLink component={Link} color="textPrimary" to="/meus-pacientes" >
          Meus pacientes
        </MuiLink>
      </Breadcrumbs>

      {/* TODO: remover essa grid e colocar tudo em uma div com className */}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center" >

        <Typography variant="h2">Meus pacientes</Typography>

        <TextField className={classes.fieldNumProntuario}
          id="num-prontuario"
          label="Buscar por número de prontuário"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button color="primary" variant="contained">
          Cadastrar Paciente
        </Button>

      </Grid>

      <TablePatients patients={patients} />

    </div >
  );
}

export default ListPatients;
