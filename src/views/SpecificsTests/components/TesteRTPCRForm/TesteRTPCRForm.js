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

const TesteRTPCRForm = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
      sm={10}

    >
      <Typography variant="h3">Formulário do Teste RT-PCR</Typography>

      {/* Data de coleta RT-PCR */}
      <Grid
        className={classes.fieldTesteRTPCR}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Data de coleta RT-PCR*</Typography>
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
            label="Data de coleta RT-PCR "
            name="data_nascimento"
            // onChange={handleChange}
            type="date"
            // value={values.data_nascimento}
          />
        </FormGroup>
      </Grid>

      {/* Sítio da amostra RT-PCR* */}
      <Grid
        className={classes.fieldTesteRTPCR}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Sítio da amostra RT-PCR*</Typography>
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
              label="Swab de nasofaringe/orofaringe"
              value="1"
            />

            <FormControlLabel
              control={<Radio />}
              label="Secreção traqueal"
              value="2"
            />

            <FormControlLabel
              control={<Radio />}
              label="Lavado broncoalveolar"
              value="3"
            />

            <FormControlLabel
              control={<Radio />}
              label="Escarro"
              value="4"
            />

            <FormControlLabel
              control={<Radio />}
              label="Outros"
              value="5"
            />
          </Field>
        </FormGroup>
      </Grid>

      {/* Data de coleta RT-PCR */}
      <Grid
        className={classes.fieldTesteRTPCR}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Data do resultado RT-PCR*</Typography>
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
            label="Data do resultado RT-PCR"
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

export default TesteRTPCRForm;
