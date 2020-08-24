import React from 'react';
import {
  Grid,
  FormGroup,
  FormLabel,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Card,
  IconButton,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import { Field, useFormikContext, ErrorMessage } from 'formik';
import useStyles from './styles';

const TesteRapidoForm = props => {
  const classes = useStyles();

  // function para remover um form
  const { remove } = props;

  const { index } = props;

  const {
    values,
    handleChange,
    errors,
    touched,
  } = useFormikContext();

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
    >
      <FormLabel className={classes.formLabel}>
        <Typography variant="h3">Formulário do Teste RT-PCR</Typography>
        <IconButton
          aria-label="delete"
          onClick={() => remove(index)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </FormLabel>

      {/* resultado */}
      <Grid
        className={classes.fieldTesteRapido}
        item
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Resultado de teste rápido</Typography>
          </FormLabel>
          <ErrorMessage
            color="error"
            component={Typography}
            name={`newsTestsRapidos.${index}.resultado`}
            variant="caption"
          />
          <Field
            as={RadioGroup}
            className={classes.radioGroup}
            name={`newsTestsRapidos.${index}.resultado`}
            onChange={handleChange}
            row
            value={values.newsTestsRapidos[index].resultado}
          >
            <FormControlLabel
              control={<Radio />}
              label="Reagente"
              value="true"
            />
            <FormControlLabel
              control={<Radio />}
              label="Não reagente"
              value="false"
            />
          </Field>

        </FormGroup>
      </Grid>

      {/* data_realizacao */}
      <Grid
        className={classes.fieldTesteRapido}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Data de coleta da rápida </Typography>
          </FormLabel>
          <Field
            InputLabelProps={{
              shrink: true,
            }}
            as={TextField}
            className={classes.dateField}
            error={
              errors.newsTestsRapidos &&
              touched.newsTestsRapidos &&
              !!errors.newsTestsRapidos[index]?.data_realizacao
            }
            helperText={
              (errors.newsTestsRapidos &&
              touched.newsTestsRapidos &&
              errors.newsTestsRapidos[index]?.data_realizacao) ?
                errors.newsTestsRapidos[index]?.data_realizacao : null
            }
            label="Data da coleta do teste rápido"
            name={`newsTestsRapidos.${index}.data_realizacao`}
            onChange={handleChange}
            type="date"
            value={values.newsTestsRapidos[index].data_realizacao}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default TesteRapidoForm;
