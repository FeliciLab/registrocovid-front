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

// TODO: acho que seria interesante mudar o nome desse arquivo de 'axios' para 'useAxios'
import { useAxios } from 'hooks/axios'

const ListPatients = () => {

  const classes = useStyles();

  const { data } = useAxios('/pacientes?fields=id,prontuario,data_internacao,created_at', {
    transformResponse: [
      data => {
        const aux = JSON.parse(data);

        // sort((a, b) => {
        //   const [diaA, mesA, anoA] = a.dataCadastro.split('/');
        //   const [diaB, mesB, anoB] = b.dataCadastro.split('/');

        //   const aDate = new Date(anoA, mesA - 1, diaA);
        //   const bDate = new Date(anoB, mesB - 1, diaB);

        //   if (aDate.getTime() < bDate.getTime()) {
        //     return 1;
        //   } else if (aDate.getTime() > bDate.getTime()) {
        //     return -1;
        //   } else {
        //     return 0;
        //   }
        // });
        return aux.map(paciente => {
          paciente = {
            ...paciente,
            data_internacao: new Date(paciente.data_internacao),
            created_at: new Date(paciente.created_at)
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
                    color="secondary"
                    variant="contained"
                    startIcon={<AddIcon />}
                  >
                    Cadastrar Paciente
                  </Button>

                </div>
              </div>
            </div>

            {(data.length === 0) ? (
              <div className={classes.notPatients}>
                <img className={classes.logoImg}
                  alt="nenhum paciente cadastrado"
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
