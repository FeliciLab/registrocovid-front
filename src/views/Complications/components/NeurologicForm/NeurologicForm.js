import React from 'react';
import {
  Grid,
  FormGroup,
  FormLabel,
  Typography,
  TextField,
  Card,
  IconButton,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import { Field, useFormikContext } from 'formik';
import useStyles from './styles';

const NeurologicForm = ({ complicationData, index, remove }) => {
  const classes = useStyles();
  const { values, handleChange, errors, touched } = useFormikContext();

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
    >
      <div className={classes.formLabel}>
        <Typography variant="h3">
          {complicationData && complicationData.tipo_complicacao_descricao
            ? complicationData.tipo_complicacao_descricao
            : ''}
        </Typography>
        <IconButton
          aria-label="delete"
          onClick={() => remove(index)}
        >
          <DeleteIcon
            fontSize="small"
          />
        </IconButton>
      </div>
      <Grid
        className={classes.fieldFormNeurologicFlex}
        item
        xs={12}
      >
        <FormGroup className={classes.neurologicFormGroup}>
          <FormLabel>
            <Typography variant="h4">Ocorrência</Typography>
          </FormLabel>
          <Field
            as={TextField}
            className={classes.dateField}
            error={
              errors.newsComplicacoes && 
              touched.newsComplicacoes &&
              errors.newsComplicacoes[index] &&
              errors.newsComplicacoes[index].data
                ? errors.newsComplicacoes[index].data
                : false
            }
            helperText={
              errors.newsComplicacoes &&
                touched.newsComplicacoes &&
                errors.newsComplicacoes[index] &&
                errors.newsComplicacoes[index].data
                ? errors.newsComplicacoes[index].data
                : ''
            }
            name={`newsComplicacoes[${index}].data`}

            onChange={handleChange}
            type="date"
            value={values.newsComplicacoes[index].data}
          />
        </FormGroup>
      </Grid>
      <Grid
        className={classes.fieldFormNeurologicFlex}
        item
        xs={12}
      >
        <FormGroup className={classes.neurologicFormGroup}>
          <FormLabel>
            <Typography variant="h4">
              Em caso afirmativo para {complicationData && complicationData.tipo_complicacao_descricao
                ? complicationData.tipo_complicacao_descricao.toLowerCase()
                : ''}, qual?
            </Typography>
          </FormLabel>
          <Field
            as={TextField}
            className={classes.textField}
            error={
              errors.newsComplicacoes && 
              touched.newsComplicacoes &&
              errors.newsComplicacoes[index] &&
              errors.newsComplicacoes[index].descricao
                ? errors.newsComplicacoes[index].descricao
                : false
            }
            helperText={
              errors.newsComplicacoes && 
              touched.newsComplicacoes &&
              errors.newsComplicacoes[index] &&
              errors.newsComplicacoes[index].descricao
                ? errors.newsComplicacoes[index].descricao
                : ''
            }
            name={`newsComplicacoes[${index}].descricao`}
            onChange={handleChange}
            placeholder="Local de complicação"
            type="text"
            value={values.newsComplicacoes[index].descricao || ''}
            variant="outlined"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default NeurologicForm;
