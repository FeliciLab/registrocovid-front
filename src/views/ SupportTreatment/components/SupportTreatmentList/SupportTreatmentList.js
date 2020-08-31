import React from 'react';

import PropTypes from 'prop-types';
import SupportTreatmentItem from '../SupportTreatmentItem';

function SupportTreatmentList({tratamentos}) {
  return (
    <div>
      {tratamentos.map((tratamento, index) => (
        <SupportTreatmentItem
          key={index}
          tratamento={tratamento}
        />
      ))}
    </div>
  );
}

SupportTreatmentList.propTypes = {
  className: PropTypes.string,
  tratamentos: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      data_hemodialise: PropTypes.string,
      motivo_hemodialise: PropTypes.string,
      frequencia_hemodialise: PropTypes.string,
    }),
  ).isRequired,
};

export default SupportTreatmentList;
