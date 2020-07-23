import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TablePatients from './components/TablePatients';
import useStyles from './styles';

// Icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

// Material-UI Components
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  Breadcrumbs,
  Link as MuiLink,
} from '@material-ui/core';

const ListPatients = () => {

  const classes = useStyles();

  const [filter, setFilter] = useState('');

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

      <div className={classes.header}>
        {/* TODO: Acho que esse component deve estar nos layouts básicos.
          Muito provavelmente, será um componente separado. */}
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={
            <NavigateNextIcon fontSize="small" />
          }
        >
          <MuiLink component={Link} color="textPrimary" to="/meus-pacientes" >
            Meus pacientes
          </MuiLink>
        </Breadcrumbs>

        <div className={classes.titleWrapper}>

          <Typography variant="h1">Meus pacientes</Typography>

          <div className={classes.actionsWrapper}>

            <TextField className={classes.fieldNumProntuario}
              id="num-prontuario"
              label="Buscar por número de prontuário"
              variant="outlined"
              onChange={e => setFilter(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              className={classes.buttonAddPatient}
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
            >
              Cadastrar Paciente
            </Button>

          </div>
        </div>
      </div>

      <TablePatients patients={patients} />

    </div >
  );
}

export default ListPatients;
