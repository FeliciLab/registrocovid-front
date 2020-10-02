import { Card, Grid, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import FieldComposerForm from '../FieldComposerForm';

import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';

const RespiratorySuportForm = props => {
  const { index, tipo, descricao, remove } = props;

  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      component={Card}
      container
      item
    >
      <div className={classes.title}>
        <Typography variant="h4">{descricao}</Typography>
        <IconButton
          aria-label="delete"
          onClick={() => remove(index)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
      {/* Catéter nasal de baixo fluxo
        Catéter nasal de alto fluxo
        Máscara com reservatório */}
      {['1', '2', '4'].some(id => tipo === id) && (
        <Grid
          container
          item
          spacing={2}
        >
          <FieldComposerForm
            field="data_inicio"
            name={`newSuportesRespitatorios.${index}.data_inicio`}
          />
          <FieldComposerForm
            field="data_termino"
            name={`newSuportesRespitatorios.${index}.data_termino`}
          />
          <FieldComposerForm
            field="fluxo_o2"
            name={`newSuportesRespitatorios.${index}.fluxo_o2`}
          />
        </Grid>
      )}
      {/* Máscara de Venturi */}
      {['3'].some(id => tipo === id) && (
        <Grid
          container
          item
          spacing={2}
        >
          <FieldComposerForm
            field="data_inicio"
            name={`newSuportesRespitatorios.${index}.data_inicio`}
          />
          <FieldComposerForm
            field="data_termino"
            name={`newSuportesRespitatorios.${index}.data_termino`}
          />
          <FieldComposerForm
            field="fluxo_o2"
            name={`newSuportesRespitatorios.${index}.fluxo_o2`}
          />
          <FieldComposerForm
            field="concentracao_o2"
            name={`newSuportesRespitatorios.${index}.concentracao_o2`}
          />
        </Grid>
      )}

      {/* Ventilação mecânica não invasiva (VNI)
        Intubação Orotraqueal
        Traqueostomia */}
      {['5', '7', '8'].some(id => tipo === id) && (
        <Grid
          container
          item
          spacing={2}
        >
          <FieldComposerForm
            field="data_inicio"
            name={`newSuportesRespitatorios.${index}.data_inicio`}
          />
          <FieldComposerForm
            field="data_termino"
            name={`newSuportesRespitatorios.${index}.data_termino`}
          />
        </Grid>
      )}
      {/* Oxigenação por membrana extracorpórea (ECMO) */}
      {['9'].some(id => tipo === id) && (
        <Grid
          container
          item
          spacing={2}
        >
          <FieldComposerForm
            field="data_inicio"
            name={`newSuportesRespitatorios.${index}.data_inicio`}
          />
          <FieldComposerForm
            field="data_termino"
            name={`newSuportesRespitatorios.${index}.data_termino`}
          />
          <FieldComposerForm
            field="fluxo_sangue"
            name={`newSuportesRespitatorios.${index}.fluxo_sangue`}
          />
          <FieldComposerForm
            field="fluxo_gasoso"
            name={`newSuportesRespitatorios.${index}.fluxo_gasoso`}
          />
          <FieldComposerForm
            field="fio2"
            name={`newSuportesRespitatorios.${index}.fio2`}
          />
        </Grid>
      )}
      {/* Pronação */}
      {['10'].some(id => tipo === id) && (
        <Grid
          container
          item
          spacing={2}
        >
          <FieldComposerForm
            field="data_pronacao"
            name={`newSuportesRespitatorios.${index}.data_pronacao`}
          />
          <FieldComposerForm
            field="quantidade_horas"
            name={`newSuportesRespitatorios.${index}.quantidade_horas`}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default RespiratorySuportForm;
