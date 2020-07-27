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

          {patients.map((patient, index) => (
            <PatientRow key={index} patient={patient} />
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}

TablePatients.propTypes = {
  className: PropTypes.string,
  patients: PropTypes.arrayOf(
    PropTypes.exact({
      numProntuario: PropTypes.string,
      dataInternacao: PropTypes.string,
      dataCadastro: PropTypes.string,
    })
  ).isRequired
};

export default TablePatients;
