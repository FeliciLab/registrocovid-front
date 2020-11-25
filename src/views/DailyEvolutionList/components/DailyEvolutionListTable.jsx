import React from 'react';
import {
  TableContainer,
  Paper,
  Table,
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useHistory } from 'react-router-dom';
import palette from 'theme/palette';
import PropTypes from 'prop-types';
import formatDate from 'helpers/formatDate';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rigthWrapper: {
    display: 'flex',
  },
  tableCellHead: {},
  tableRowExamDate: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: palette.secondary.light,
    },
  },
}));

const DailyEvolutionListTable = props => {
  const { data } = props;

  const classes = useStyles();

  const history = useHistory();

  if (!data) return null;

  return (
    <TableContainer
      component={Paper}
      elevation={2}
      style={{ marginTop: 10 }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Data de Evolução</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(exam => (
            <TableRow
              className={classes.tableRowExamDate}
              key={exam.id}
              onClick={() =>
                history.push(`/categorias/exame-fisico/${exam.id}`)
              }
            >
              <TableCell
                component="th"
                scope="row"
              >
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
  );
};

DailyEvolutionListTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      paciente_id: PropTypes.number.isRequired,
      data_evolucao: PropTypes.string.isRequired,
      temperatura: PropTypes.string.isRequired,
      frequencia_respiratoria: PropTypes.number.isRequired,
      peso: PropTypes.string.isRequired,
      altura: PropTypes.number.isRequired,
      pressao_sistolica: PropTypes.number.isRequired,
      pressao_diastolica: PropTypes.number.isRequired,
      frequencia_cardiaca: PropTypes.number.isRequired,
      ascultura_pulmonar: PropTypes.string,
      oximetria: PropTypes.string.isRequired,
      escala_glasgow: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default DailyEvolutionListTable;
