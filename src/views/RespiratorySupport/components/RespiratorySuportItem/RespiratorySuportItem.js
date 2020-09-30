import React from 'react';

import PropTypes from 'prop-types';

const RespiratorySuportItem = props => {
  const {suporteRespiratorio} = props;

  return ;
};

RespiratorySuportItem.propTypes = {
  suporteRespiratorio: PropTypes.arrayOf(
    PropTypes.exact({
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
    }),
  ).isRequired,
};

export default RespiratorySuportItem;
