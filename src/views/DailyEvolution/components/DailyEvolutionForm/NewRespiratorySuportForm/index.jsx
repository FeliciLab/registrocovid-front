import { Grid, Card, Typography, IconButton } from '@material-ui/core';
import { DeleteIcon } from 'icons';
import React from 'react';
import FieldFormikComposer from '../FieldFormikComposer';
import useStyles from './styles';

function NewRespiratorySuportForm({ descricao, index, remove, tipo, name }) {
  const classes = useStyles();

  return (
    <Grid
      component={Card} container
      spacing={2}
    >
      <div className={classes.title}>
        <Typography variant="h4">{descricao}</Typography>
        <IconButton aria-label="delete" onClick={() => remove(index)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
      {[1, 2, 4].some(id => tipo === id) && (
        <Grid container item spacing={2}>
          <FieldFormikComposer
            field="fluxo_o2"
            name={`${name}.${index}.fluxo_o2`}
          />
        </Grid>
      )}
      {[3].some(id => tipo === id) && (
        <Grid container item spacing={2}>
          <FieldFormikComposer
            field="fluxo_o2"
            name={`${name}.${index}.fluxo_o2`}
          />
          <FieldFormikComposer
            field="concentracao_o2"
            name={`${name}.${index}.concentracao_o2`}
          />
        </Grid>
      )}
      {[6].some(id => tipo === id) && (
        <Grid container item spacing={2}>
          <FieldFormikComposer
            field="menos_24h_vmi"
            name={`${name}.${index}.menos_24h_vmi`}
          />
        </Grid>
      )}
      {[9].some(id => tipo === id) && (
        <Grid container item spacing={2}>
          <FieldFormikComposer
            field="fluxo_sangue"
            name={`${name}.${index}.fluxo_sangue`}
          />
          <FieldFormikComposer
            field="fluxo_gasoso"
            name={`${name}.${index}.in`}
          />
          <FieldFormikComposer field="fio2" name={`${name}.${index}.fio2`} />
        </Grid>
      )}
      {[10].some(id => tipo === id) && (
        <Grid container item spacing={2}>
          <FieldFormikComposer
            field="quantidade_horas"
            name={`${name}.${index}.quantidade_horas`}
          />
        </Grid>
      )}
      {[5, 7, 8, 11].some(id => tipo === id) && (
        <Grid container item spacing={2} />
      )}
    </Grid>
  );
}

export default NewRespiratorySuportForm;
