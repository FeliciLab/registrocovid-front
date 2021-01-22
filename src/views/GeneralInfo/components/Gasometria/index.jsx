import { Grid, Typography } from '@material-ui/core';
import GenericNumberField from 'components/Forms/GenericNumberField';
import React from 'react';

function Gasometria() {
  return (
    <Grid container item spacing={1}>
      <Grid
        component={Typography} item variant="h3"
        xs={12}
      >
        Gasometria arterial na admissão hospitalar
      </Grid>
      <Grid item xs={3}>
        <GenericNumberField name="ph" title="pH" />
      </Grid>
      <Grid item xs={3}>
        <GenericNumberField endAdornment="mmHg" name="pao2" title="PaO2" />
      </Grid>
      <Grid item xs={3}>
        <GenericNumberField endAdornment="mmHg" name="paco2" title="PaCO2" />
      </Grid>
      <Grid item xs={3}>
        <GenericNumberField endAdornment="mEq/L" name="hco3" title="HCO3" />
      </Grid>
      <Grid item xs={3}>
        <GenericNumberField endAdornment="mEq/L" name="be" title="BE" />
      </Grid>
      <Grid item xs={3}>
        <GenericNumberField endAdornment="%" name="sao2" title="SaO2" />
      </Grid>
      <Grid item xs={3}>
        <GenericNumberField
          endAdornment="mmol/L"
          name="lactato"
          title="Lactato"
        />
      </Grid>
    </Grid>
  );
}

export default Gasometria;
