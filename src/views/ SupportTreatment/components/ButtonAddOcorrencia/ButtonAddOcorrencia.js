import React from 'react';
import useStyles from './styles';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useFormikContext } from 'formik';

function ButtonAddOcorrencia() {
  const classes = useStyles();

  const { values, setFieldValue } = useFormikContext();

  const handleAddSupportTreatment = () => {
    setFieldValue('newSupportsTreatment', [
      ...values.newSupportsTreatment,
      {
        data_hemodialise: '',
        motivo_hemodialise: '',
        frequencia_hemodialise: '',
      },
    ]);

  };

  return (
    <Button
      className={classes.buttonAdd}
      color="secondary"
      onClick={() => handleAddSupportTreatment()}
      startIcon={<AddIcon />}
      variant="contained"
    >
      ADICIONAR OCORRÊNCIA
    </Button>
  );
}

export default ButtonAddOcorrencia;
