import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
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
import { NavigateNextIcon } from 'icons';
import paths from 'paths';

const Categories = () => {
  const history = useHistory();
  const classes = useStyles();

  const initialForm = useMemo(() => {
    return [
      {
        id: 1,
        label: 'Informações gerais',
        url: paths.CATEGORIA_INFORMACOES_GERAIS,
      },
      {
        id: 2,
        label: 'Identificação do paciente',
        url: paths.CATEGORIA_IDENTIFICACAO_PACIENTE,
      },
      { id: 3, label: 'História pessoal', url: 'categorias/historia-pessoal' },
      {
        id: 4,
        label: 'Sintomas iniciais da COVID-19',
        url: paths.CATEGORIA_SINTOMAS_INICIAIS,
      },
      {
        id: 5,
        label: 'Comorbidades / Condições clínicas de base',
        url: paths.CATEGORIA_COMORBIDADES,
      },
    ];
  }, []);

  const secondaryForm = useMemo(() => {
    return [
      {
        id: 1,
        label: 'Evolução Diária',
        url: paths.CATEGORIA_EVOLUCAO_DIARIA_LIST,
      },
      {
        id: 2,
        label: 'Exames laboratoriais específicos COVID 19',
        url: paths.CATEGORIA_EXAMES_ESPECIFICOS,
      },
      {
        id: 3,
        label: 'Exames complementares',
        url: paths.CATEGORIA_EXAMES_COMPLEMENTARES,
      },
      { id: 4, label: 'Complicações', url: 'categorias/complicacoes/' },
      {
        id: 5,
        label: 'Complicações relacionadas à ventilação mecânica',
        url: paths.CATEGORIA_COMPLICACOES_VM,
      },
      {
        id: 6,
        label: 'Infecções relacionadas à assistência à saúde (IRAS)',
        url: paths.CATEGORIA_IRAS,
      },
      {
        id: 7,
        label: 'Hemodiálise',
        url: paths.CATEGORIA_HEMODIALISE,
      },
      { id: 8, label: 'Desfecho', url: paths.CATEGORIA_DESFECHO },
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
            { label: 'Meus pacientes', route: paths.MEUS_PACIENTES },
            { label: 'Categorias', route: paths.CATEGORIAS },
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
                  <TableCell component="th" scope="row">
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
        <Typography style={{ marginTop: 24 }} variant="h4">
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
                  <TableCell component="th" scope="row">
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
