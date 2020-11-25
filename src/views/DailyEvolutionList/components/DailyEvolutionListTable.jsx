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
    </TableContainer>
  );
};

export default DailyEvolutionListTable;
