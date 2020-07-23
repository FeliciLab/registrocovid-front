import React, { memo } from 'react';
import PropTypes from 'prop-types';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import {
  TableRow,
  TableCell,
  Button
} from '@material-ui/core';

const PatientRow = props => {

  const {
    patient: {
      numProntuario,
      dataInternacao,
      dataCadastro
    },
    ...rest
  } = props;

  // TODO: encontrar e colocar im icon para o caractere '#'.

  return (
    <TableRow {...rest}>
      <TableCell align="left">{numProntuario}</TableCell>
      <TableCell align="left">{dataInternacao}</TableCell>
      <TableCell align="left">{dataCadastro}</TableCell>
      <TableCell align="right">
        <Button color="inherit">
          <NavigateNextIcon fontSize="small" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

PatientRow.propTypes = {
  className: PropTypes.string,
  patient: PropTypes.exact({
    numProntuario: PropTypes.string,
    dataInternacao: PropTypes.string,
    dataCadastro: PropTypes.string,
  }).isRequired
};

export default memo(PatientRow);
