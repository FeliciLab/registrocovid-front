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

const NeurologicForm = ({ index, remove }) => {
  const classes = useStyles();

  const { values, handleChange, errors, touched } = useFormikContext();

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
    >
      <FormLabel className={classes.formLabel}>
        <Typography variant="h3">Complicação neurológica</Typography>
        <IconButton
          aria-label="delete"
          onClick={() => remove(index)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </FormLabel>
      <Grid
        className={classes.fieldFormNeurologicFlex}
        item
        xs={12}
      >
        <FormGroup className={classes.neurologicFormGroup}>
          <FormLabel>
            <Typography variant="h4">
              Em caso afirmativo para complicação neurológica, qual
            </Typography>
          </FormLabel>
          <Field
            as={TextField}
            className={classes.textField}
            error={
              errors.newsComplicacoes && touched.newsComplicacoes
                ? !!errors.newsComplicacoes[index]?.descricao
                : false
            }
            helperText={
              errors.newsComplicacoes &&
              touched.newsComplicacoes &&
              errors.newsComplicacoes[index]?.descricao
                ? errors.newsComplicacoes[index]?.descricao
                : ''
            }
            InputLabelProps={{
              shrink: true,
            }}
            name={`newsComplicacoes[${index}].descricao`}
            onChange={handleChange}
            placeholder="Local de complicação"
            type="text"
            value={values.newsComplicacoes[index].descricao}
            variant="outlined"
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
            <Typography variant="h4">Ocorrência</Typography>
          </FormLabel>
          <Field
            as={TextField}
            className={classes.dateField}
            error={
              errors.newsComplicacoes && touched.newsComplicacoes
                ? !!errors.newsComplicacoes[index]?.data
                : false
            }
            helperText={
              errors.newsComplicacoes &&
              touched.newsComplicacoes &&
              errors.newsComplicacoes[index]?.data
                ? errors.newsComplicacoes[index]?.data
                : ''
            }
            InputLabelProps={{
              shrink: true,
            }}
            name={`newsComplicacoes[${index}].data`}
            onChange={handleChange}
            type="date"
            value={values.newsComplicacoes[index].data}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default NeurologicForm;
