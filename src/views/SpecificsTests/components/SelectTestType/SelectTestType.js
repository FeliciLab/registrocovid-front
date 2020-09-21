import React from 'react';
import {
  Card,
  Typography,
  Grid,
  FormGroup,
  FormLabel,
  TextField,
  MenuItem,
  Button,
} from '@material-ui/core';

import useStyles from './styles';

import AddIcon from '@material-ui/icons/Add';

import { Field, useFormikContext } from 'formik';


// Valores iniciais
// const initialValues = {
//   newsTestes: [],
//   tipo_new_teste: '',
// };

const SelectTestType = () => {
  const classes = useStyles();

  const { values, handleChange, setFieldValue } = useFormikContext();

  const handleAddTesteType = () => {
    setFieldValue('newsTestes', [
      ...values.newsTestes,
      {
        data_coleta: '',
        data_resultado: '',
        sitio_tipo: '',
        rt_pcr_resultado: '',
        resultado: '',
        data_realizacao: '',
        tipo_teste: values.tipo_new_teste
      },
    ]);
  };

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
    >
      <Grid item>
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Tipo teste</Typography>
          </FormLabel>
          <Grid
            className={classes.actionWrapper}
            item
          >
            <Field
              as={TextField}
              className={classes.textField}
              label="Tipo teste"
              name="tipo_new_teste"
              onChange={handleChange}
              select
              type="text"
              value={values.tipo_new_teste}
              variant="outlined"
            >
              <MenuItem value="RTPCR">Teste RT-PCR</MenuItem>
              <MenuItem value="RAPIDO">Teste rápido</MenuItem>
            </Field>

            <Button
              className={classes.buttonAddType}
              color="secondary"
              disabled={values.tipo_new_teste === ''}
              onClick={() => handleAddTesteType()}
              startIcon={<AddIcon />}
              variant="contained"
            >
              ADICIONAR OCORRÊNCIA
            </Button>
          </Grid>
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default SelectTestType;
