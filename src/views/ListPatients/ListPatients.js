import React from 'react';

import { makeStyles } from '@material-ui/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SearchIcon from '@material-ui/icons/Search';

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
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },

  fieldNumProntuario: {
    margin: theme.spacing(1),
    width: '300px'
  },
  table: {
    marginTop: theme.spacing(4)
  },
  functionalities: {
    alignItems: 'center'
  }
}));

const ListPatients = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
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

      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Número do prontuário</TableCell>
            <TableCell align="left">Data de internação</TableCell>
            <TableCell align="left">Data do cadastro</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left">#546546464</TableCell>
            <TableCell align="left">24/05/2020</TableCell>
            <TableCell align="left">13/07/2020</TableCell>
            <TableCell align="left">
              <Button color="primary">
                <VisibilityIcon />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">#546546464</TableCell>
            <TableCell align="left">24/05/2020</TableCell>
            <TableCell align="left">13/07/2020</TableCell>
            <TableCell align="left">
              <Button color="primary">
                <VisibilityIcon />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">#546546464</TableCell>
            <TableCell align="left">24/05/2020</TableCell>
            <TableCell align="left">13/07/2020</TableCell>
            <TableCell align="left">
              <Button color="primary">
                <VisibilityIcon />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">#546546464</TableCell>
            <TableCell align="left">24/05/2020</TableCell>
            <TableCell align="left">13/07/2020</TableCell>
            <TableCell align="left">
              <Button color="primary">
                <VisibilityIcon />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">#546546464</TableCell>
            <TableCell align="left">24/05/2020</TableCell>
            <TableCell align="left">13/07/2020</TableCell>
            <TableCell align="left">
              <Button color="primary">
                <VisibilityIcon />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">#546546464</TableCell>
            <TableCell align="left">24/05/2020</TableCell>
            <TableCell align="left">13/07/2020</TableCell>
            <TableCell align="left">
              <Button color="primary">
                <VisibilityIcon />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">#546546464</TableCell>
            <TableCell align="left">24/05/2020</TableCell>
            <TableCell align="left">13/07/2020</TableCell>
            <TableCell align="left">
              <Button color="primary">
                <VisibilityIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div >
  );
}

export default ListPatients;
