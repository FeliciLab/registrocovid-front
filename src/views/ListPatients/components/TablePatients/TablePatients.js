import React from 'react';
import PropTypes from 'prop-types';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
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

        {patients.map(({ numProntuario, dataCadastro, dataInternacao }, index) => (
          <TableRow key={index}>
            <TableCell align="left">{numProntuario}</TableCell>
            <TableCell align="left">{dataInternacao}</TableCell>
            <TableCell align="left">{dataCadastro}</TableCell>
            <TableCell align="right">
              <Button color="inherit">
                <NavigateNextIcon fontSize="small" />
              </Button>
            </TableCell>
          </TableRow>
        ))}

      </TableBody>
    </Table>
  );
}

TablePatients.propTypes = {
  className: PropTypes.string,
  patients: PropTypes.arrayOf({
    numProntuario: PropTypes.string,
    dataInternacao: PropTypes.string,
    dataCadastro: PropTypes.string,
  }).isRequired
};

export default TablePatients;
