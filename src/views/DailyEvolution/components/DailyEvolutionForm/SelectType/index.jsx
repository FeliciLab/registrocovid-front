import React, { useCallback, memo } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { useFormikContext } from 'formik';
import { Button, Grid, MenuItem, Typography } from '@material-ui/core';
import useStyles from './styles';
import GenericSelectField from 'components/Forms/GenericSelectField';

const SelectType = porps => {
  const { tipos } = porps;

  const classes = useStyles();

  const { values, setFieldValue } = useFormikContext();

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

  return (
    <Grid
      alignItems="center" container item
      spacing={2}
    >
      <Grid component={Typography} item variant="h4">
        Escolher tipo de suporte ou procedimento:
      </Grid>
      <Grid
        alignItems="center" container item
        spacing={2}
      >
        <Grid item xs={7}>
          <GenericSelectField name="tipo_suporte_selected">
            <MenuItem disabled value={0}>
              Escolher
            </MenuItem>
            {tipos.map(tipo => (
              <MenuItem key={tipo.id} value={tipo.id}>
                {tipo.nome}
              </MenuItem>
            ))}
          </GenericSelectField>
        </Grid>
        <Grid item xs={5}>
          <Button
            className={classes.buttonAddType}
            color="secondary"
            disabled={values.tipo_suporte_selected === 0}
            fullWidth
            onClick={() => handleAdd()}
            startIcon={<AddIcon />}
            variant="contained"
          >
            ADICIONAR OCORRÊNCIA
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(SelectType);
