import React from 'react';
import {
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  Typography,
  MenuItem,
} from '@material-ui/core';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import range from 'helpers/range';
import GenericDateField from 'components/Forms/GenericDateField';
import GenericNumberField from 'components/Forms/GenericNumberField';

const variant = 'h5';

const escalaGlasgowRange = range(3, 15);

const FieldsBlock = () => {
  return (
    <>
      <Grid item xs={12}>
        <GenericDateField
          label="Data Admissão em UTI"
          name={'data_evolucao'}
          title="Admissão em UTI"
        />
      </Grid>
      <Grid item xs={6}>
        <GenericNumberField
          endAdornment="°C"
          name="temperatura"
          title="Temperatura"
        />
      </Grid>
      <Grid item xs={6}>
        <GenericNumberField
          endAdornment="irpm"
          name="frequencia_respiratoria"
          title="Frequência respiratória"
        />
      </Grid>
      <Grid item xs={6}>
        <GenericNumberField endAdornment="Kg" name="peso" title="Peso" />
      </Grid>
      <Grid item xs={6}>
        <GenericNumberField endAdornment="cm" name="altura" title="Altura" />
      </Grid>
      <Grid item xs={6}>
        <GenericNumberField
          endAdornment="mmHg"
          name="pressao_sistolica"
          title="Pressão arterial sistólica"
        />
      </Grid>
      <Grid item xs={6}>
        <GenericNumberField
          endAdornment="mmHg"
          name="pressao_diastolica"
          title="Pressão arterial diastólica"
        />
      </Grid>
      <Grid item xs={6}>
        <GenericNumberField
          endAdornment="bpm"
          name="frequencia_cardiaca"
          title="Frequência cardíaca"
        />
      </Grid>
      <Grid item xs={6}>
        <GenericNumberField
          name="ausculta_pulmonar"
          title="Ausculta pulmonar"
        />
      </Grid>
      <Grid item xs={6}>
        <FormGroup>
          <FormLabel>
            <Typography variant={variant}>Oximetria de pulso</Typography>
          </FormLabel>
          <Field
            component={TextField}
            InputProps={{
              endAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
            name="oximetria"
            type="number"
            variant="outlined"
          />
        </FormGroup>
      </Grid>
      <Grid item xs={6}>
        <FormGroup>
          <FormLabel>
            <Typography variant={variant}>Escala de Glasgow</Typography>
          </FormLabel>
          <Field
            component={TextField}
            name="escala_glasgow"
            select
            type="number"
            variant="outlined"
          >
            {escalaGlasgowRange.map(elem => (
              <MenuItem key={elem} value={elem}>
                {elem}
              </MenuItem>
            ))}
          </Field>
        </FormGroup>
      </Grid>
    </>
  );
};

export default FieldsBlock;
