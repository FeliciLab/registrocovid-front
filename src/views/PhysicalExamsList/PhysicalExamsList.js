import React from 'react';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { useAxios } from 'hooks/axios';
import { usePatient } from 'context/PatientContext';
import PatientInfo from 'components/PatientInfo';
import CustomBreadcrumbs from 'components/CustomBreadcrumbs';
import formatDate from '../../helpers/formatDate';
import Placeholder from './components/index.js';

// Icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddIcon from '@material-ui/icons/Add';

// Material-UI Components
import {
  Typography,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  CircularProgress,
  Grid,
} from '@material-ui/core';

const PhysicalExamsList = () => {
  const { patient } = usePatient();

  const { data } = useAxios(`/pacientes/${patient.id}/evolucoes-diarias`, {
    transformResponse: [
      response => {
        const examData = JSON.parse(response);
        examData.sort((a, b) => {
          return a.data_evolucao > b.data_evolucao ? 1 : -1;
        });
        return examData;
      },
    ],
  });

  const history = useHistory();
  const classes = useStyles();

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
            {
              label: 'Lista de evoluções',
              route: '/categorias/lista-exame-fisico',
            },
          ]}
        />
      </div>
      <div className={classes.titleWrapper}>
        <Typography variant="h3">
          Exame físico (admissão e evolução diária)
        </Typography>

        <div className={classes.patientWrapper}>
          <PatientInfo />
          <Button
            className={classes.buttonSave}
            color="secondary"
            onClick={() => handleNavigate('/categorias/exame-fisico')}
            type="submit"
            variant="contained">
            <AddIcon fontSize="small" />
            INSERIR NOVA OCORRÊNCIA
          </Button>
        </div>
      </div>
      <div>
        {!data ? (
          <CircularProgress />
        ) : data.length === 0 ? (
          <>
            <Typography variant="h4">Lista de Evoluções</Typography>
            <Grid
              alignItems="center"
              className={classes.mainGrid}
              container
              justify="center">
              <Grid item>
                <Placeholder />
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Typography variant="h4">Ficha Inicial</Typography>
            <TableContainer
              component={Paper}
              elevation={2}
              style={{ marginTop: 10 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableCellHead} colSpan={2}>
                      Data de Evolução
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(exam => (
                    <TableRow
                      className={classes.tableRowExamDate}
                      key={exam.id}
                      onClick={() =>
                        handleNavigate(`/categorias/exame-fisico/${exam.id}`)
                      }>
                      <TableCell component="th" scope="row">
                        {formatDate(exam.data_evolucao)}
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
          </>
        )}
      </div>
    </div>
  );
};

export default PhysicalExamsList;
