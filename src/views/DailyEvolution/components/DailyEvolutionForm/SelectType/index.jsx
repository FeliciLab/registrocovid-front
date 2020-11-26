import React, { useCallback, useState, useEffect, memo } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Field, useFormikContext } from 'formik';
import {
  FormGroup,
  FormLabel,
  Button,
  Grid,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';

const SelectType = () => {
  // TOTO: buscar os tipos
  const [tipos, setTipos] = useState([{ id: 1, descricao: 'algum tipo' }]);

  const { values, handleChange, setFieldValue } = useFormikContext();

  const handleFetchTiposData = useCallback(() => {
    console.log('handleFetchTiposData');
  }, []);

  const handleAdd = useCallback(() => {
    console.log('handleAdd');
  }, []);

  useEffect(() => {
    handleFetchTiposData();
  }, [handleFetchTiposData]);

  return (
    <Grid
      container
      item
      spacing={2}
    >
      <Grid item>
        <FormGroup>
          <FormLabel>
            <Typography variant="h5">
              Escolher tipo de suporte ou procedimento:
            </Typography>
          </FormLabel>
          <Field
            component={TextField}
            name="tipo_suporte_selected"
            select
            type="number"
            variant="outlined"
          >
            <MenuItem
              disabled
              value={0}
            >
              Escolher
            </MenuItem>
            {tipos.map(tipo => (
              <MenuItem
                key={tipo.id}
                value={tipo.id}
              >
                {tipo.descricao}
              </MenuItem>
            ))}
          </Field>
        </FormGroup>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          disabled={values.tipo_suporte_selected === 0}
          onClick={() => handleAdd()}
          startIcon={<AddIcon />}
          variant="contained"
        >
            ADICIONAR OCORRÊNCIA
        </Button>
      </Grid>
    </Grid>
  );
};

export default memo(SelectType);
