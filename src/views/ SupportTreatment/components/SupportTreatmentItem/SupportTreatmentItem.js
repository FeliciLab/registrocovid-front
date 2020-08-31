import React from 'react';

import PropTypes from 'prop-types';

function SupportTreatmentItem({tratamento}) {
  return (
    <div>
      {tratamento.id}
    </div>
  );
}

SupportTreatmentItem.propTypes = {
  className: PropTypes.string,
  tratamento:  PropTypes.exact({
    id: PropTypes.number,
    data_hemodialise: PropTypes.string,
    motivo_hemodialise: PropTypes.string,
    frequencia_hemodialise: PropTypes.string,
  }),
};

export default SupportTreatmentItem;
