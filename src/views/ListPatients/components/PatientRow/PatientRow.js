import { Button, TableCell, TableRow } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { usePatient } from 'context/PatientContext';
import formatDate from 'helpers/formatDate';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const PatientRow = props => {
  const { patient, ...rest } = props;

  const { addPatient } = usePatient();

  const classes = useStyles();

  const history = useHistory();

  const handleNavigate = patientProps => {
    addPatient(patientProps);
    history.push('/categorias');
  };

  return (
    <TableRow
      {...rest}
      className={classes.row}
      onClick={() => handleNavigate(patient)}
    >
      <TableCell align="left">
        <strong>#</strong> {patient.prontuario}
      </TableCell>
      <TableCell align="left">{formatDate(patient.data_internacao)}</TableCell>
      <TableCell align="left">{patient.created_at}</TableCell>
      <TableCell align="right">
        <Button color="inherit">
          <NavigateNextIcon fontSize="small" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

PatientRow.propTypes = {
  className: PropTypes.string,
  patient: PropTypes.shape({
    id: PropTypes.number,
    prontuario: PropTypes.string,
    data_internacao: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
};

export default memo(PatientRow);
