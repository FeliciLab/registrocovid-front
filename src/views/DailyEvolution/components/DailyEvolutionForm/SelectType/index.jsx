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
import { buscarTiposSuporteRespiratorio } from 'services/requests/datasRequests';

const SelectType = () => {
  const [tipos, setTipos] = useState([{ id: 1, descricao: 'algum tipo' }]);

  const {
    values,
    // handleChange,
    setFieldValue,
  } = useFormikContext();

  const handleFetchTiposData = useCallback(async () => {
    try {
      const response = await buscarTiposSuporteRespiratorio();
      console.log(response);
      setTipos(response);
    } catch (error) {
      // TODO: melhorar isso aqui
      console.log(error);
    }
  }, []);

  const handleAdd = useCallback(() => {
    setFieldValue('newSuportesRespitatorios', [
      ...values.newSuportesRespitatorios,
      {
        tipo_suporte_id: values.tipo_suporte_selected,
        fluxo_o2: '',
        data_inicio: '',
        data_termino: '',
        menos_24h_vmi: '',
        concentracao_o2: '',
        fluxo_sangue: '',
        fluxo_gasoso: '',
        fio2: '',
        data_pronacao: '', // Pronacao
        quantidade_horas: '', // Pronacao
        data_inclusao_desmame: '', // Desmane
      },
    ]);
  }, [
    setFieldValue,
    values.newSuportesRespitatorios,
    values.tipo_suporte_selected,
  ]);

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
                {tipo.nome}
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
