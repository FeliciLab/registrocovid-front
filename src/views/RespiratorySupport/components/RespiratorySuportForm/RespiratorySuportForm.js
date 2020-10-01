import { Accordion, AccordionSummary, Card, Grid } from '@material-ui/core';
import React from 'react';
import FieldComposerForm from '../FieldComposerForm';

const RespiratorySuportForm = props => {
  const { index, tipo } = props;

  return (
    <Grid
      componet={Card}
      container
    >
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
          <FieldComposerForm name="data_inicio" />
          <FieldComposerForm name="data_termino" />
          <FieldComposerForm name="fluxo_o2" />
          <FieldComposerForm name="concentracao_o2" />
        </Grid>
      )}

      {/* Ventilação mecânica não invasiva (VNI)
        Intubação Orotraqueal
        Traqueostomia
        Pronação */}
      {[5, 7, 8, 10].some(id => tipo === id) && (
        <Grid
          container
          item
          spacing={2}
        >
          <FieldComposerForm name="data_inicio" />
          <FieldComposerForm name="data_termino" />
        </Grid>
      )}
      {/* Oxigenação por membrana extracorpórea (ECMO) */}
      {[9].some(id => tipo === id) && (
        <Grid
          container
          item
          spacing={2}
        >
          <FieldComposerForm name="data_inicio" />
          <FieldComposerForm name="data_termino" />
          <FieldComposerForm name="fluxo_sangue" />
          <FieldComposerForm name="fluxo_gasoso" />
          <FieldComposerForm name="fio2" />
        </Grid>
      )}
    </Grid>
  );
};

export default RespiratorySuportForm;
