import React from 'react';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { useAxios } from 'hooks/axios';
import { usePatient } from 'context/PatientContext';
import PatientInfo from 'components/PatientInfo';
import CustomBreadcrumbs from 'components/CustomBreadcrumbs';
import formatDate from '../../helpers/formatDate';

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
        <Typography variant="h1">
          Exame físico (admissão e evolução diária)
        </Typography>

        <div className={classes.patientWrapper}>
          <PatientInfo />
          <Button
            className={classes.buttonSave}
            type="submit"
            variant="contained"
            color="secondary"
            onClick={() => handleNavigate(`/categorias/exame-fisico`)}>
            <AddIcon fontSize="small" />
            INSERIR NOVA OCORRÊNCIA
          </Button>
        </div>
      </div>
      <div>
        {!data ? (
          <CircularProgress />
        ) : data.length === 0 ? (
          <Typography variant="h4">Nenhum Exame Encontrado</Typography>
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
                    <TableCell colSpan={2} className={classes.tableCellHead}>
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
