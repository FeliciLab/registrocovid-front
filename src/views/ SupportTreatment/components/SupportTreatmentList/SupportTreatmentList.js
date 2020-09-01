import React from 'react';

import PropTypes from 'prop-types';
import SupportTreatmentItem from '../SupportTreatmentItem';
import { FieldArray, useFormikContext } from 'formik';
import SupportTreatmentForm from '../SupportTreatmentForm';

function SupportTreatmentList({ tratamentos }) {
  const { values } = useFormikContext();

  return (
    <div>
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

      {tratamentos
        .sort((a, b) => {
          if (a.data_hemodialise > b.data_hemodialise) return -1;
          else if (a.data_hemodialise < b.data_hemodialise) return 1;
          else return 0;
        })
        .map((tratamento, index) => (
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
      hemodialise: PropTypes.bool,
      data_hemodialise: PropTypes.string,
      motivo_hemodialise: PropTypes.string,
      frequencia_hemodialise: PropTypes.string,
    }),
  ).isRequired,
};

export default SupportTreatmentList;
