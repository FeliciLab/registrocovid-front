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
  CircularProgress,
} from '@material-ui/core';

import formatDate from '../../helpers/formatDate';

// TODO: acho que seria interesante mudar o nome desse arquivo de 'axios' para 'useAxios'
import { useAxios } from 'hooks/axios'

const ListPatients = () => {

  const classes = useStyles();

  const { data } = useAxios('/pacientes?fields=id,prontuario,data_internacao,created_at', {
    transformResponse: [
      data => {
        const patienteRow = JSON.parse(data);

        return patienteRow.map(paciente => {
          paciente = {
            ...paciente,
            data_internacao: paciente.data_internacao.split('-').reverse().join('/'),
            created_at: formatDate(paciente.created_at)
          }

          return paciente;
        });
      }
    ],
  });

  const [filter, setFilter] = useState('');

  return (
    <div className={classes.root}>

      {!data ? (
        <CircularProgress />
      ) : (
        <>
          <div className={classes.header}>
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={
                <NavigateNextIcon fontSize="small" />
              }
            >
              <MuiLink
                color="textPrimary"
                component={Link}
                to="/meus-pacientes"
              >
                  Meus pacientes
              </MuiLink>
            </Breadcrumbs>

            <div className={classes.titleWrapper}>

              <Typography variant="h1">Meus pacientes</Typography>

              <div className={classes.actionsWrapper}>

                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  className={classes.fieldNumProntuario}
                  id="num-prontuario"
                  label="Buscar por número de prontuário"
                  onChange={e => setFilter(e.target.value)}
                  variant="outlined"
                />

                <Button
                  className={classes.buttonAddPatient}
                  color="secondary"
                  startIcon={<AddIcon />}
                  variant="contained"
                >
                    Cadastrar Paciente
                </Button>

              </div>
            </div>
          </div>

          {(data.length === 0) ? (
            <div className={classes.notPatients}>
              <img
                alt="nenhum paciente cadastrado"
                className={classes.logoImg}
                src="/images/not_patients.svg"
              />
            </div>
          ) : (
            <div className={classes.tableWrapper}>
              <TablePatients
                patients={data.filter((paciente => paciente.prontuario.includes(filter)))}
              />
            </div>
          )}
        </>
      )}

    </div >
  );
}

export default ListPatients;
