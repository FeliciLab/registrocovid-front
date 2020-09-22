import React from 'react';
import {
  Grid,
  FormGroup,
  FormLabel,
  Typography,
  FormControlLabel,
  Radio,
  Card,
  IconButton,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import { Field, ErrorMessage } from 'formik';
import useStyles from './styles';
import { TextField, RadioGroup } from 'formik-material-ui';

const TesteRapidoForm = props => {
  const classes = useStyles();

  const { index, remove } = props;

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
    >
      <div className={classes.formLabel}>
        <Typography variant="h3">Formulário do Teste Rápido</Typography>
        <IconButton
          aria-label="delete"
          onClick={() => remove(index)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>

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
            name={`newsTestes.${index}.resultado`}
            variant="caption"
          />
          <Field
            component={RadioGroup}
            name={`newsTestes.${index}.resultado`}
            row
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
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Data de coleta de teste rápido</Typography>
          </FormLabel>
          <Field
            component={TextField}
            name={`newsTestes.${index}.data_realizacao`}
            type="date"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default TesteRapidoForm;
