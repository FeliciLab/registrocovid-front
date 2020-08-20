import React from 'react';
import useStyles from './styles';
import { Link, useHistory } from 'react-router-dom';
import { useAxios } from 'hooks/axios'

// Icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddIcon from '@material-ui/icons/Add';

import { usePatient } from 'context/PatientContext';

// Material-UI Components
import {
    Typography,
    Breadcrumbs,
    Link as MuiLink,
    Button,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Paper,
    CircularProgress
} from '@material-ui/core';

import PatientInfo from 'components/PatientInfo';

const PhysicalExamsList = () => {

    const { patient } = usePatient();

    const { data } = useAxios(`/pacientes/${patient.id}/evolucoes-diarias`, {
        allExamsData: [
          examData => {
            return JSON.parse(examData);
            // return data;
            // return data.map(exam => {
            //     exam = {
            //       ...paciente,
            //       data_internacao: paciente.data_internacao.split('-').reverse().join('/'),
            //       created_at: formatDate(paciente.created_at)
            //     }
            //     return exam;
            // })
          }
        ],
      });

    const history = useHistory();
    const classes = useStyles();

    const handleNavigate = (url) => {
        history.push(url);
    };

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Breadcrumbs
                    aria-label="breadcrumb"
                    separator={
                        <NavigateNextIcon fontSize="small" />
                    }>
                    <MuiLink
                        color="textPrimary"
                        component={Link}
                        to="/meus-pacientes">
                        Meus pacientes
                    </MuiLink>
                    <MuiLink
                        color="textPrimary"
                        component={Link}
                        to="/categorias">
                        Categorias
                    </MuiLink>
                    <MuiLink
                        color="textPrimary"
                        component={Link}
                        to="/categorias/exame-fisico">
                        Exame físico
                    </MuiLink>
                </Breadcrumbs>
            </div>
            <div className={classes.titleWrapper}>
                <Typography variant="h1">Exame físico (admissão e evolução diária)</Typography>

                <div className={classes.patientWrapper}>
                    <PatientInfo />
                    <Button
                        className={classes.buttonSave}
                        type="submit"
                        variant="contained"
                        color="secondary">
                        <AddIcon fontSize="small" />
                        INSERIR NOVA OCORRÊNCIA
                    </Button>
                </div> 
            </div>
            <div>
                <Typography variant="h4">Ficha Inicial</Typography>

                {!data ? (
                    <CircularProgress />
                ) : (
                    (data.length === 0) ? 'Nenhum Exame Encontrado':
                (<TableContainer
                    component={Paper}
                    elevation={2}
                    style={{ marginTop: 10 }}>
                    <Table
                        size="small">
                        <TableBody>
                            {data.map(exam => (
                                <TableRow
                                    key={exam.id}
                                    onClick={() => handleNavigate(`/exame-fisico/${exam.id}`)}>
                                    <TableCell
                                        component="th"
                                        scope="row">
                                        {exam.data_evolucao}
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
                </TableContainer>)

                )}
            </div>
        </div>
    );
};

export default PhysicalExamsList;