import { Paper, Typography } from '@material-ui/core';
import React from 'react';
// import CheckBoxCard from './CheckBoxCard';

const OutrasDoencasItem = props => {
  const { doenca } = props;

  return (
    <Paper style={{ padding: 10, marginBottom: 20 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>
          {doenca.descricao}
        </Typography>
      </div>
      {/* <Typography style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>
        Selecione a(s) doença(s) que o paciente apresenta
      </Typography>
      {doenca.doencas.map(doenca => (
        <CheckBoxCard
          //alreadyExists={doencasFromUser.some(item => item.id === doenca.id)}
          // handleArray={handleDoencaId}
          id={doenca.id}
          label={doenca.descricao}
        />
      ))} */}
    </Paper>
  );
};

export default OutrasDoencasItem;
