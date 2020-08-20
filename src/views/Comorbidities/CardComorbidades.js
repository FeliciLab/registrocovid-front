import React from 'react';
import { Typography, Paper, IconButton } from '@material-ui/core';
import CheckBoxCard from './CheckBoxCard';
import Delete from '@material-ui/icons/Delete';
import { useComorbidade } from 'context/ComorbidadesContex';

const CardComorbidades = ({ card }) => {
  const { removeCard } = useComorbidade();

  return (
    <Paper style={{ padding: 10, marginBottom: 20 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>
          {card.descricao}
        </Typography>

        <IconButton aria-label="delete">
          <Delete onClick={() => removeCard(card.id, card.doencas)} />
        </IconButton>
      </div>
      <Typography style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>
        Selecione a(s) doença(s) que o paciente apresenta
      </Typography>
      {card.doencas.map(doenca => (
        <CheckBoxCard id={doenca.id} label={doenca.descricao} />
      ))}
    </Paper>
  );
};

export default CardComorbidades;
