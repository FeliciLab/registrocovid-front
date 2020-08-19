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
      <FormGroup>
        <FormLabel>
          <Typography variant="h4">Cor (autoreferida)</Typography>
        </FormLabel>
        <Field
          as={RadioGroup}
          className={classes.radioGroup}
          name="cor_id"
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

      {/* Data de coleta RT-PCR */}
      <Grid
        item
        md={6}
        sm={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Data de coleta da rápida </Typography>
          </FormLabel>
          <Field
            as={TextField}
            className={classes.dateField}
            InputLabelProps={{
              shrink: true,
            }}
            // error={errors.data_nascimento && touched.data_nascimento}
            // helperText={
            //  errors.data_nascimento && touched.data_nascimento
            //    ? errors.data_nascimento
            //    : null
            //}
            label="Data de nascimento"
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
