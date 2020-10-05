import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

// Icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// Material-UI Components
import {
  Typography,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from '@material-ui/core';

import CustomBreadcrumbs from 'components/CustomBreadcrumbs';
import PatientInfo from 'components/PatientInfo';

const Categories = () => {
  const history = useHistory();
  const classes = useStyles();

  const initialForm = useMemo(() => {
    return [
      {
        id: 1,
        label: 'Informações gerais',
        url: 'categorias/informacoes-gerais',
      },
      {
        id: 2,
        label: 'Identificação do paciente',
        url: 'categorias/identificacao-paciente',
      },
      { id: 3, label: 'História pessoal', url: 'categorias/historia-pessoal' },
      {
        id: 4,
        label: 'Sintomas iniciais da COVID-19',
        url: 'categorias/sintomas-iniciais',
      },
      {
        id: 5,
        label: 'Comorbidades / Condições clínicas de base',
        url: 'categorias/comorbidades',
      },
    ];
  }, []);

  const secondaryForm = useMemo(() => {
    return [
      {
        id: 1,
        label: 'Exame físico (admissão e evolução diária)',
        url: 'categorias/lista-exame-fisico',
      },
      {
        id: 2,
        label: 'Exames laboratoriais específicos COVID 19',
        url: 'categorias/exames-especificos/',
      },
      {
        id: 3,
        label: 'Exames complementares',
        url: 'categorias/exames-complementares/',
      },
      {
        id: 4,
        label: 'Suporte respiratório',
        url: 'categorias/suporte-respiratorio',
      },
      { id: 5, label: 'Complicações', url: 'categorias/complicacoes/' },
      {
        id: 6,
        label: 'Complicações relacionadas à ventilação mecânica',
        url: 'categorias/complicacoes-vm',
      },
      {
        id: 7,
        label: 'Infecções relacionadas à assistência à saúde (IRAS)',
        url: '/categorias/iras/',
      },
      {
        id: 8,
        label: 'Hemodiálise',
        url: 'categorias/tratamento-suporte/',
      },
      { id: 9, label: 'Desfecho', url: 'categorias/desfecho/' },
    ];
  }, []);

  const handleNavigate = url => {
    history.push(url);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustomBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
          ]}
        />
      </div>
      <div className={classes.titleWrapper}>
        <Typography variant="h1">Categorias</Typography>

        <PatientInfo />
      </div>

      <div>
        <Typography variant="h4">Ficha Inicial</Typography>

        <TableContainer
          component={Paper}
          elevation={2}
          style={{ marginTop: 10 }}
        >
          <Table size="small">
            <TableBody>
              {initialForm.map(form => (
                <TableRow
                  key={form.id}
                  onClick={() => handleNavigate(form.url)}
                >
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    {form.label}
                  </TableCell>
                  <TableCell align="right">
                    <Button color="inherit">
                      <NavigateNextIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div>
        <Typography
          style={{ marginTop: 24 }}
          variant="h4"
        >
          Ficha de Prontuário
        </Typography>

        <TableContainer
          component={Paper}
          elevation={2}
          style={{ marginTop: 10 }}
        >
          <Table size="small">
            <TableBody>
              {secondaryForm.map(form => (
                <TableRow
                  key={form.id}
                  onClick={() => handleNavigate(form.url)}
                >
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    {form.label}
                  </TableCell>
                  <TableCell align="right">
                    <Button color="inherit">
                      <NavigateNextIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Categories;
