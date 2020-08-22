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

import { Field, useFormikContext } from 'formik';
import useStyles from './styles';

const TesteRapidoForm = props => {
  const classes = useStyles();

  const { index } = props;

  const { values, handleChange, setFieldValue } = useFormikContext();

  const handleDeleteForm = () => {
    console.log('handleDeleteForm', `index: ${index}`);
    let aux = values.newsTestsRapidos;
    aux.splice(index, 1);
    setFieldValue('newsTestsRapidos', aux);
  };

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
          onClick={() => handleDeleteForm()}
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

          <Field
            as={RadioGroup}
            className={classes.radioGroup}
            name={`newsTestsRapidos[${index}].resultado`}
            onChange={handleChange}
            row
            value={values.newsTestsRapidos[index].resultado}
          >
            <FormControlLabel
              control={<Radio />}
              label="Regagente"
              value="true"
            />

            <FormControlLabel
              control={<Radio />}
              label="Não regagente"
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
            label="Data da coleta do teste rápido"
            name={`newsTestsRapidos[${index}].data_realizacao`}
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
