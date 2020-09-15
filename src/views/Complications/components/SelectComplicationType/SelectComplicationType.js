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

const SelectComplicationType = ({ tiposComplicacoes }) => {
  const classes = useStyles();

  const { values, handleChange, setFieldValue } = useFormikContext();

  const handleAddTesteType = () => {
    if (values.tipo_new_complication.id === 1) {
      setFieldValue('newsComplicacoes', [
        {
          tipo_complicacao_id: values.tipo_new_complication.id,
          data: '',
          data_termino: '',
          descricao: '',
          menos_24h_uti: false,
          glasglow_admissao_uti: '',
        },
        ...values.newsComplicacoes,
      ]);
    } else if (values.tipo_new_complication.id === 13) {
      setFieldValue('newsComplicacoes', [
        {
          tipo_complicacao_id: values.tipo_new_complication.id,
          data: '',
          data_termino: '',
          descricao: '',
        },
        ...values.newsComplicacoes,
      ]);
    } else {
      setFieldValue('newsComplicacoes', [
        {
          tipo_complicacao_id: values.tipo_new_complication.id,
          tipo_complicacao_descricao: values.tipo_new_complication.descricao,
          data: '',
          data_termino: '',
        },
        ...values.newsComplicacoes,
      ]);
    }
  };

  return (
    <Grid item className={classes.wrapper}>
      <Grid className={classes.root} component={Card} item xs={8}>
        <Grid item>
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Escolher tipo de complicação</Typography>
            </FormLabel>
            <Grid className={classes.actionWrapper} item>
              <Field
                as={TextField}
                className={classes.textField}
                label="Escolher"
                name="tipo_new_complication"
                onChange={handleChange}
                select
                type="text"
                value={values.tipo_new_complication}
                variant="outlined">
                {tiposComplicacoes.map((elemen, index) => {
                  return (
                    <MenuItem value={elemen} key={index}>
                      {elemen.descricao}
                    </MenuItem>
                  );
                })}
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
    </Grid>
  );
};

export default SelectComplicationType;
