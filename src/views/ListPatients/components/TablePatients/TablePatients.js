import React from 'react';
import PropTypes from 'prop-types';
import PatientRow from '../PatientRow';

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from '@material-ui/core';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const TablePatients = props => {

  const { patients, ...rest } = props;

  return (

    <TableContainer component={Paper} elevation={2}>

      <Table {...rest} size="small" >
        <TableHead>
          <TableRow>
            <TableCell align="left">Número do prontuário</TableCell>
            <TableCell align="left">Data de internação</TableCell>
            <TableCell align="left">Data do cadastro</TableCell>
            <TableCell align="right">
              <NavigateNextIcon color="disabled" fontSize="small" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {patients.map((patient) => (
            <PatientRow key={patient.id} patient={patient} />
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}
// id,prontuario,data_internacao,created_at
TablePatients.propTypes = {
  className: PropTypes.string,
  patients: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      prontuario: PropTypes.string,
      data_internacao: PropTypes.string,
      created_at: PropTypes.string,
    })
  ).isRequired
};

export default TablePatients;
