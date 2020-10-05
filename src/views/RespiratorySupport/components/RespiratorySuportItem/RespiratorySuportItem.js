import React, { memo } from 'react';

import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@material-ui/core';
import FieldComposerItem from '../FieldComposerItem/FieldComposerItem';

const RespiratorySuportItem = props => {
  const { suporteRespiratorio, descricao } = props;

  return (
    <Accordion>
      <AccordionSummary
        aria-controls="panel1a-content"
        expandIcon={<ExpandMoreIcon />}
        id="panel1a-header"
      >
        <div>
          <Typography variant="h4">{descricao}</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {/* Catéter nasal de baixo fluxo
        Catéter nasal de alto fluxo
        Máscara com reservatório */}
        {[1, 2, 4].some(id => suporteRespiratorio.tipo_suporte_id === id) && (
          <Grid
            container
            item
            spacing={2}
          >
            <FieldComposerItem
              name="data_inicio"
              value={suporteRespiratorio.data_inicio}
            />
            <FieldComposerItem
              name="data_termino"
              value={suporteRespiratorio.data_termino}
            />
            <FieldComposerItem
              name="fluxo_o2"
              value={suporteRespiratorio.fluxo_o2}
            />
          </Grid>
        )}
        {/* Máscara de Venturi */}
        {[3].some(id => suporteRespiratorio.tipo_suporte_id === id) && (
          <Grid
            container
            item
            spacing={2}
          >
            <FieldComposerItem
              name="data_inicio"
              value={suporteRespiratorio.data_inicio}
            />
            <FieldComposerItem
              name="data_termino"
              value={suporteRespiratorio.data_termino}
            />
            <FieldComposerItem
              name="fluxo_o2"
              value={suporteRespiratorio.fluxo_o2}
            />
            <FieldComposerItem
              name="concentracao_o2"
              value={suporteRespiratorio.concentracao_o2}
            />
          </Grid>
        )}
        {/* Ventilação mecânica não invasiva (VNI)
        Intubação Orotraqueal
        Traqueostomia */}
        {[5, 7, 8].some(id => suporteRespiratorio.tipo_suporte_id === id) && (
          <Grid
            container
            item
            spacing={2}
          >
            <FieldComposerItem
              name="data_inicio"
              value={suporteRespiratorio.data_inicio}
            />
            <FieldComposerItem
              name="data_termino"
              value={suporteRespiratorio.data_termino}
            />
          </Grid>
        )}
        {/* Ventilação mecânica invasiva (VNI) */}
        {[6].some(id => suporteRespiratorio.tipo_suporte_id === id) && (
          <Grid
            container
            item
            spacing={2}
          >
            <FieldComposerItem
              name="data_inicio"
              value={suporteRespiratorio.data_inicio}
            />
            <FieldComposerItem
              name="data_termino"
              value={suporteRespiratorio.data_termino}
            />
            <FieldComposerItem
              name="menos_24h_vmi"
              value={suporteRespiratorio.menos_24h_vmi}
            />
          </Grid>
        )}
        {/* Oxigenação por membrana extracorpórea (ECMO) */}
        {[9].some(id => suporteRespiratorio.tipo_suporte_id === id) && (
          <Grid
            container
            item
            spacing={2}
          >
            <FieldComposerItem
              name="data_inicio"
              value={suporteRespiratorio.data_inicio}
            />
            <FieldComposerItem
              name="data_termino"
              value={suporteRespiratorio.data_termino}
            />
            <FieldComposerItem
              name="fluxo_sangue"
              value={suporteRespiratorio.fluxo_sangue}
            />
            <FieldComposerItem
              name="fluxo_gasoso"
              value={suporteRespiratorio.fluxo_gasoso}
            />
            <FieldComposerItem
              name="fio2"
              value={suporteRespiratorio.fio2}
            />
          </Grid>
        )}
        {/* Pronaão */}
        {[10].some(id => suporteRespiratorio.tipo_suporte_id === id) && (
          <Grid
            container
            item
            spacing={2}
          >
            <FieldComposerItem
              name="data_pronacao"
              value={suporteRespiratorio.data_pronacao}
            />
            <FieldComposerItem
              name="quantidade_horas"
              value={suporteRespiratorio.quantidade_horas}
            />
          </Grid>
        )}
        {/* Pronação */}
        {[11].some(id => suporteRespiratorio.tipo_suporte_id === id) && (
          <Grid
            container
            item
            spacing={2}
          >
            <FieldComposerItem
              name="data_inclusao_desmame"
              value={suporteRespiratorio.data_inclusao_desmame}
            />
          </Grid>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

RespiratorySuportItem.propTypes = {
  descricao: PropTypes.string,
  suporteRespiratorio: PropTypes.shape({
    id: PropTypes.number,
    tipo_suporte_id: PropTypes.number,
    fluxo_o2: PropTypes.string,
    data_inicio: PropTypes.string,
    data_termino: PropTypes.string,
    menos_24h_vmi: PropTypes.bool,
    concentracao_o2: PropTypes.string,
    fluxo_sangue: PropTypes.string,
    fluxo_gasoso: PropTypes.string,
    fio2: PropTypes.string,
    data_pronacao: PropTypes.string, // Pronacao
    quantidade_horas: PropTypes.number, // Pronacao
    data_inclusao_desmame: PropTypes.string, // Desmane
  }).isRequired,
};

export default memo(RespiratorySuportItem);
