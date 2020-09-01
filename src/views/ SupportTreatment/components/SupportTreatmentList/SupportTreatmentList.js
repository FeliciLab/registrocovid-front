import React from 'react';

import PropTypes from 'prop-types';
import SupportTreatmentItem from '../SupportTreatmentItem';
import { FieldArray, useFormikContext } from 'formik';
import SupportTreatmentForm from '../SupportTreatmentForm';

function SupportTreatmentList({ tratamentos }) {
  const { values } = useFormikContext();

  return (
    <div>
      {tratamentos.map((tratamento, index) => (
        <SupportTreatmentItem
          key={index}
          tratamento={tratamento}
        />
      ))}

      <FieldArray name="newSupportTreatments">
        {({ remove }) => (
          <div>
            {values.newSupportTreatments &&
              values.newSupportTreatments.length > 0 &&
              values.newSupportTreatments
                .map((tratamento, index) => (
                  <SupportTreatmentForm
                    index={values.newSupportTreatments.indexOf(tratamento)}
                    key={index}
                    remove={remove}
                  />
                ))
                .reverse()}
          </div>
        )}
      </FieldArray>
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
