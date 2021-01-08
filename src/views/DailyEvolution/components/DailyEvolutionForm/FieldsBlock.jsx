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
import range from 'helpers/range'

const variant = 'h5';

const escalaGlasgowRange = range(3, 15);

const FieldsBlock = () => {
  return (
    <>
      <Grid
        item
        xs={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant={variant}>Data de evolução*</Typography>
          </FormLabel>
          <Field
            component={TextField}
            name="data_evolucao"
            type="date"
          />
        </FormGroup>
      </Grid>
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant={variant}>Temperatura</Typography>
          </FormLabel>
          <Field
            component={TextField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">°C</InputAdornment>
              ),
            }}
            name="temperatura"
            type="number"
            variant="outlined"
          />
        </FormGroup>
      </Grid>
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant={variant}>Frequência respiratória</Typography>
          </FormLabel>
          <Field
            component={TextField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">irpm</InputAdornment>
              ),
            }}
            name="frequencia_respiratoria"
            type="number"
            variant="outlined"
          />
        </FormGroup>
      </Grid>
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant={variant}>Peso</Typography>
          </FormLabel>
          <Field
            component={TextField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">Kg</InputAdornment>
              ),
            }}
            name="peso"
            type="number"
            variant="outlined"
          />
        </FormGroup>
      </Grid>
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant={variant}>Altura</Typography>
          </FormLabel>
          <Field
            component={TextField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">cm</InputAdornment>
              ),
            }}
            name="altura"
            type="number"
            variant="outlined"
          />
        </FormGroup>
      </Grid>
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant={variant}>
              Pressão arterial sistólica
            </Typography>
          </FormLabel>
          <Field
            component={TextField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">mmHg</InputAdornment>
              ),
            }}
            name="pressao_sistolica"
            type="number"
            variant="outlined"
          />
        </FormGroup>
      </Grid>
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant={variant}>
              Pressão arterial diastólica
            </Typography>
          </FormLabel>
          <Field
            component={TextField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">mmHg</InputAdornment>
              ),
            }}
            name="pressao_diastolica"
            type="number"
            variant="outlined"
          />
        </FormGroup>
      </Grid>
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant={variant}>Frequência cardíaca</Typography>
          </FormLabel>
          <Field
            component={TextField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">bpm</InputAdornment>
              ),
            }}
            name="frequencia_cardiaca"
            type="number"
            variant="outlined"
          />
        </FormGroup>
      </Grid>
      <Grid
        item
        xs={6}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant={variant}>Ausculta pulmonar</Typography>
          </FormLabel>
          <Field
            component={TextField}
            name="ausculta_pulmonar"
            type="number"
            variant="outlined"
          />
        </FormGroup>
      </Grid>
      <Grid
        item
        xs={6}
      >
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
      <Grid
        item
        xs={6}
      >
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
              <MenuItem
                key={elem}
                value={elem}
              >
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
