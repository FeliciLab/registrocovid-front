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
        label: 'Informações gerais',
        url: 'categorias/informacoes-gerais',
      },
      {
        label: 'Identificação do paciente',
        url: 'categorias/identificacao-paciente',
      },
      { label: 'História pessoal', url: 'categorias/historia-pessoal' },
      {
        label: 'Sintomas iniciais da COVID-19',
        url: 'categorias/sintomas-iniciais',
      },
      {
        label: 'Comorbidades / Condições clínicas de base',
        url: 'categorias/comorbidades',
      },
    ];
  }, []);

  const secondaryForm = useMemo(() => {
    return [
      {
        label: 'Evolução Diária',
        url: 'categorias/evolucao-diaria-list',
      },
      {
        label: 'Exames laboratoriais específicos COVID 19',
        url: 'categorias/exames-especificos/',
      },
      {
        label: 'Exames complementares',
        url: 'categorias/exames-complementares/',
      },
      { label: 'Complicações', url: 'categorias/complicacoes/' },
      {
        label: 'Complicações relacionadas à ventilação mecânica',
        url: 'categorias/complicacoes-vm',
      },
      {
        label: 'Infecções relacionadas à assistência à saúde (IRAS)',
        url: '/categorias/iras/',
      },
      {
        label: 'Hemodiálise',
        url: 'categorias/hemodialise/',
      },
      { label: 'Desfecho', url: 'categorias/desfecho/' },
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
              {initialForm.map((form, index) => (
                <TableRow
                  key={index + 1}
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
              {secondaryForm.map((form, index) => (
                <TableRow
                  key={index + 1}
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
