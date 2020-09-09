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

const SelectTestType = ({ tiposComplicacoes }) => {
  const classes = useStyles();

  const { values, handleChange, setFieldValue } = useFormikContext();

  const handleAddTesteType = () => {
    if (values.tipo_new_complication == 1) {
      setFieldValue('newsComplicacoes', [
        ...values.newsComplicacoes,
        {
          tipo_complicacao: values.tipo_new_complication,
        },
      ]);
    } else if (values.tipo_new_complication == 13) {
      setFieldValue('newsComplicacoes', [
        ...values.newsComplicacoes,
        {
          tipo_complicacao: values.tipo_new_complication,
        },
      ]);
    } else if (values.tipo_new_complication === 'RTPCR') {
      setFieldValue('newsTestsRTCPRs', [
        ...values.newsTestsRTCPRs,
        {
          data_coleta: '',
          data_resultado: '',
          sitio_tipo: '',
          rt_pcr_resultado: '',
        },
      ]);
    } else if (values.tipo_new_complication === 'RAPIDO') {
      setFieldValue('newsTestsRapidos', [
        ...values.newsTestsRapidos,
        {
          data_realizacao: '',
          resultado: '',
        },
      ]);
    } else {
      setFieldValue('newsComplicacoes', [
        ...values.newsComplicacoes,
        {
          tipo_complicacao: values.tipo_new_complication,
        },
      ]);
    }
  };

  return (
    <Grid className={classes.root} component={Card} item xs={10}>
      <Grid item>
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Tipo teste</Typography>
          </FormLabel>
          <Grid className={classes.actionWrapper} item>
            <Field
              as={TextField}
              className={classes.textField}
              label="Tipo teste"
              name="tipo_new_complication"
              onChange={handleChange}
              select
              type="text"
              value={values.tipo_new_complication}
              variant="outlined">
              <MenuItem value="RTPCR">Teste RT-PCR</MenuItem>
              <MenuItem value="RAPIDO">Teste rápido</MenuItem>
              {tiposComplicacoes.map((elemen, index) => {
                return (
                  <MenuItem value={elemen.id} key={index}>
                    {elemen.descricao}
                  </MenuItem>
                );
              })}
              <MenuItem value="RAPIDO">Teste rápido</MenuItem>
            </Field>

            <Button
              className={classes.buttonAddType}
              color="secondary"
              disabled={values.tipo_new_complication === ''}
              onClick={() => handleAddTesteType()}
              startIcon={<AddIcon />}
              variant="contained">
              ADICIONAR OCORRÊNCIA
            </Button>
          </Grid>
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default SelectTestType;
