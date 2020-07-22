import React, { useState } from 'react';

import useStyles from './styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
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
  const [patientes, /* setPatientes */] = useState([
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

      {/* TODO: Separar essa tabela em um component separado. */}
      <Table className={classes.table} size="small" >
        <TableHead>
          <TableRow>
            <TableCell align="left">Número do prontuário</TableCell>
            <TableCell align="left">Data de internação</TableCell>
            <TableCell align="left">Data do cadastro</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {patientes.map(({ numProntuario, dataCadastro, dataInternacao }, index) => (
            <TableRow key={index}>
              <TableCell align="left">{numProntuario}</TableCell>
              <TableCell align="left">{dataInternacao}</TableCell>
              <TableCell align="left">{dataCadastro}</TableCell>
              <TableCell align="right">
                <Button color="inherit">
                  <NavigateNextIcon fontSize="small" />
                </Button>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </div >
  );
}

export default ListPatients;
