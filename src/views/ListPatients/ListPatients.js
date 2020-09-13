import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TablePatients from './components/TablePatients';
import useStyles from './styles';

// Icons
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

// Material-UI Components
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';

import formatDate from '../../helpers/formatDate';

import { useAxios } from 'hooks/axios';
import { CustomBreadcrumbs } from 'components';

const ListPatients = () => {
  const history = useHistory();
  const classes = useStyles();

  const [filter, setFilter] = useState('');

  const { data } = useAxios(
    '/pacientes?fields=id,prontuario,data_internacao,created_at,data_inicio_sintomas,caso_confirmado',
    {
      transformResponse: [
        data => {
          const patienteRow = JSON.parse(data);

          return patienteRow.map(paciente => {
            paciente = {
              ...paciente,
              data_internacao: paciente.data_internacao
                .split('-')
                .reverse()
                .join('/'),
              created_at: formatDate(paciente.created_at),
            };

            return paciente;
          });
        },
      ],
    },
  );

  const handleNavigation = () => {
    history.push('/categorias/informacoes-gerais');
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustomBreadcrumbs
          links={[{ label: 'Meus pacientes', route: '/meus-pacientes' }]}
        />

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
              onClick={handleNavigation}
              startIcon={<AddIcon />}
              variant="contained">
              Cadastrar Paciente
            </Button>
          </div>
        </div>
      </div>

      {!data ? (
        <CircularProgress />
      ) : data.length === 0 ? (
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
            patients={data.filter(paciente =>
              paciente.prontuario.includes(filter),
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ListPatients;
