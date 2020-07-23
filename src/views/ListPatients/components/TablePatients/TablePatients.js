import React from 'react';
import PropTypes from 'prop-types';
import PatientRow from '../PatientRow';

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';

const TablePatients = props => {

  const { patients, ...rest } = props;

  return (
    <Table {...rest} size="small" >
      <TableHead>
        <TableRow>
          <TableCell align="left">Número do prontuário</TableCell>
          <TableCell align="left">Data de internação</TableCell>
          <TableCell align="left">Data do cadastro</TableCell>
          <TableCell align="left"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

        {patients.map((patient, index) => (
          <PatientRow key={index} patient={patient} />
        ))}

      </TableBody>
    </Table>
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
