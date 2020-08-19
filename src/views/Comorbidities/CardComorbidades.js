import React from 'react';

import {
  Typography,
  Paper,
} from '@material-ui/core';

import CheckBoxCard from './CheckBoxCard';

const CardComorbidades = ({ doencas, tipoDoenca }) => {
  return (
    <Paper style={{ padding: 20, marginBottom: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Typography
          style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}
        >
          {tipoDoenca}
        </Typography>
      </div>

      <Typography style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>
        Selecione a(s) doença(s) que o paciente apresenta
      </Typography>
      {doencas.map((doenca) =>
        <CheckBoxCard
          id={doenca.id}
          label={doenca.descricao}
        />)}
    </Paper>
  );
};

export default CardComorbidades;