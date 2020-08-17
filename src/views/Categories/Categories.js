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
  Paper
} from '@material-ui/core';

import CustonBreadcrumbs from 'components/CustonBreadcrumbs';
import PatientInfo from 'components/PatientInfo';

const Categories = () => {
  const history = useHistory();
  const classes = useStyles();

  const initialForm = useMemo(() => {
    return [
      { id: 1, label: 'Informações gerais', url: 'categorias/informacoes-gerais' },
      { id: 2, label: 'Identificação do paciente' },
      { id: 3, label: 'História pessoal', url: 'categorias/historia-pessoal' },
      { id: 4, label: 'Sintomas iniciais da COVID-19' },
      { id: 5, label: 'Comorbidades / Condições clínicas da base' },
    ];
  }, []);

  const secondaryForm = useMemo(() => {
    return [
      { id: 1, label: 'Exame físico (admissão e evolução diária)', url: 'categorias/exame-fisico' },
      { id: 2, label: 'Complicações relacionadas à ventilação mecânica' },
      { id: 3, label: 'Exames laboratoriais exclusivos COVID 19' },
      { id: 4, label: 'Exames complementares' },
      { id: 5, label: 'Tratamento de Suporte' },
      { id: 6, label: 'Complicações' },
      { id: 7, label: 'Suporte respiratório' },
      { id: 8, label: 'Infecções relacionadas à assistência à saúde (IRAS)' },
      { id: 9, label: 'Desfecho' },
    ];
  }, []);

  const handleNavigate = (url) => {
    history.push(url);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
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
          <Table
            size="small"
          >
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
          <Table
            size="small"
          >
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
}

export default Categories;