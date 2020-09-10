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
    <Grid className={classes.root} component={Card} item>
      <FormLabel className={classes.formLabel}>
        <Typography variant="h3">Complicação neurológica</Typography>
        <IconButton aria-label="delete" onClick={() => remove(index)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </FormLabel>
      <Grid className={classes.fieldFormNeurologicFlex} item sm={12}>
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">
              Em caso afirmativo para complicação neurológica, qual
            </Typography>
          </FormLabel>
          <Field
            InputLabelProps={{
              shrink: true,
            }}
            as={TextField}
            className={classes.dateField}
            name={`newsComplicacoes[${index}].descricao`}
            onChange={handleChange}
            value={values.newsComplicacoes[index].descricao}
            type="text"
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
          />
        </FormGroup>
      </Grid>
      <Grid className={classes.fieldFormNeurologicFlex} item sm={12}>
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Ocorrência</Typography>
          </FormLabel>
          <Field
            InputLabelProps={{
              shrink: true,
            }}
            as={TextField}
            className={classes.dateField}
            name={`newsComplicacoes[${index}].data`}
            onChange={handleChange}
            value={values.newsComplicacoes[index].data}
            type="date"
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
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default NeurologicForm;
