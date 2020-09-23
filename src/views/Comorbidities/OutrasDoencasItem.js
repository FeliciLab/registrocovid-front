import React, { memo } from 'react';

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';

const OutrasDoencasItem = props => {
  const { doencas, tipoDoenca, allDoencas } = props;

  // par ao caso de não ter nenhuma doença do tipo cadastrada
  if (doencas.length === 0) {
    return null;
  }

  return (
    <Paper style={{ padding: 10, marginBottom: 20 }}>
      <Grid
        alignItems="center"
        container
        justify="space-between"
      >
        <Grid item>
          <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>
            {tipoDoenca.descricao}
          </Typography>
          <FormGroup row>
            {allDoencas.map(item => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={doencas.some(
                      doenca => doenca.descricao === item.descricao,
                    )}
                    color="primary"
                  />
                }
                key={item.id}
                label={item.descricao}
              />
            ))}
          </FormGroup>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default memo(OutrasDoencasItem);
