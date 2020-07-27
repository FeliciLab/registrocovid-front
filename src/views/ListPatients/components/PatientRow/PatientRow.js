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
      prontuario,
      data_internacao,
      created_at
    },
    ...rest
  } = props;

  // TODO: encontrar e colocar um icon para o caractere '#'.

  return (
    <TableRow {...rest}>
      <TableCell align="left"><strong>#</strong> {prontuario}</TableCell>
      <TableCell align="left">{data_internacao}</TableCell>
      <TableCell align="left">{created_at}</TableCell>
      <TableCell align="right">
        <Button color="inherit">
          <NavigateNextIcon fontSize="small" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

// id,prontuario,data_internacao,created_at
PatientRow.propTypes = {
  className: PropTypes.string,
  patient: PropTypes.exact({
    id: PropTypes.number,
    prontuario: PropTypes.string,
    data_internacao: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired
};

export default memo(PatientRow);
