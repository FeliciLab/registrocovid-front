import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import GenericNumberField from 'components/Forms/GenericNumberField';
import GenericSwitchField from 'components/Forms/GenericSwitchField';

const FieldFormikComposer = props => {
  const { field, name } = props;
  const fields = {
    fluxo_o2: (
      <GenericNumberField endAdornment="l/min" name={name} title="Fluxo O₂" />
    ),
    concentracao_o2: (
      <GenericNumberField
        endAdornment="%"
        name={name}
        title="Concentração O₂"
      />
    ),
    menos_24h_vmi: (
      <GenericSwitchField
        label="Paciente permaneceu menos de 24h em ventilação invasiva?"
        name={name}
      />
    ),
    fluxo_sangue: (
      <GenericNumberField
        endAdornment="l/min"
        name={name}
        title="Fluxo de sangue"
      />
    ),
    fluxo_gasoso: (
      <GenericNumberField
        endAdornment="l/min"
        name={name}
        title="Fluxo gasoso"
      />
    ),
    fio2: <GenericNumberField endAdornment="%" name={name} title="FiO₂" />,
    quantidade_horas: (
      <GenericNumberField
        endAdornment="hora(s)"
        name={name}
        title="Quantidade de horas"
      />
    ),
  };

  return (
    <Grid item xs={6}>
      {fields[field]}
    </Grid>
  );
};

FieldFormikComposer.propTypes = {
  field: PropTypes.oneOf([
    'fluxo_o2',
    'menos_24h_vmi',
    'concentracao_o2',
    'fluxo_sangue',
    'fluxo_gasoso',
    'fio2',
    'quantidade_horas', // pronacao
  ]).isRequired,
  name: PropTypes.any.isRequired,
};

export default memo(FieldFormikComposer);
