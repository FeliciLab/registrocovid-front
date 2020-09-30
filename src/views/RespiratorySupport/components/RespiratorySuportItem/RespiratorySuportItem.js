import React, { memo } from 'react';

import PropTypes from 'prop-types';
import {
  Card,
  Grid,
} from '@material-ui/core';
import FieldComposerItem from '../FieldComposerItem/FieldComposerItem';

const RespiratorySuportItem = props => {
  const { suporteRespiratorio } = props;

  return (
    // TODO: somente testes ainda
    <Grid
      component={Card}
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
      <FieldComposerItem
        name="concentracao_o2"
        value={suporteRespiratorio.concentracao_o2}
      />
      <FieldComposerItem
        name="menos_24h_vmi"
        value={suporteRespiratorio.menos_24h_vmi}
      />
    </Grid>
  );
};

RespiratorySuportItem.propTypes = {
  suporteRespiratorio: PropTypes.exact({
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
  }).isRequired,
};

export default memo(RespiratorySuportItem);
