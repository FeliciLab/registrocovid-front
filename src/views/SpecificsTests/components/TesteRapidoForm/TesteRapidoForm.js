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
} from '@material-ui/core';
import { Field } from 'formik';
import useStyles from './styles';

const TesteRapidoForm = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
      sm={10}
    >
      <Typography variant="h3">Formulário do Teste Rápido</Typography>
      <Grid
        className={classes.fieldTesteRapido}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Resultado de teste rápido</Typography>
          </FormLabel>
          <Field
            as={RadioGroup}
            className={classes.radioGroup}
            name="cor_id"
            row
            // onChange={handleChange}
            // value={values.cor_id}
          >
            <FormControlLabel
              control={<Radio />}
              label="Regagente"
              value="1"
            />

            <FormControlLabel
              control={<Radio />}
              label="Não regagente"
              value="2"
            />
          </Field>
        </FormGroup>
      </Grid>

      {/* Data de coleta RT-PCR */}
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
            // error={errors.data_nascimento && touched.data_nascimento}
            // helperText={
            //  errors.data_nascimento && touched.data_nascimento
            //    ? errors.data_nascimento
            //    : null
            //}
            label="Data da coleta do teste rápido"
            name="data_nascimento"
            // onChange={handleChange}
            type="date"
            // value={values.data_nascimento}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default TesteRapidoForm;
