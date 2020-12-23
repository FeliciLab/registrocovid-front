import { Grid, Typography } from '@material-ui/core';
import GenericNumberField from 'components/Forms/GenericNumberField';
import React from 'react';

function Gasometria() {
  return (
    <Grid
      container
      item
      spacing={1}
    >
      <Grid
        component={Typography}
        item
        variant="h3"
        xs={12}
      >
        Gasometria arterial na admissão hospitalar
      </Grid>
      <Grid
        item
        xs={3}
      >
        <GenericNumberField
          name="prontuario"
          title="pH"
        />
      </Grid>
      <Grid
        item
        xs={3}
      >
        <GenericNumberField
          endAdornment="mmHg"
          name="prontuario"
          title="PaO2"
        />
      </Grid>
      <Grid
        item
        xs={3}
      >
        <GenericNumberField
          endAdornment="mmHg"
          name="prontuario"
          title="PaCO2"
        />
      </Grid>
      <Grid
        item
        xs={3}
      >
        <GenericNumberField
          endAdornment="mEq/L"
          name="prontuario"
          title="HCO3"
        />
      </Grid>
      <Grid
        item
        xs={3}
      >
        <GenericNumberField
          endAdornment="mEq/L"
          name="prontuario"
          title="BE"
        />
      </Grid>
      <Grid
        item
        xs={3}
      >
        <GenericNumberField
          endAdornment="%"
          name="prontuario"
          title="SaO2"
        />
      </Grid>
      <Grid
        item
        xs={3}
      >
        <GenericNumberField
          endAdornment="mmol/L"
          name="prontuario"
          title="Lactato"
        />
      </Grid>
    </Grid>
  );
}

export default Gasometria;
