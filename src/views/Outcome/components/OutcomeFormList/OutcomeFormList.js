import React from 'react';
import { useFormikContext, FieldArray } from 'formik';
import OutcomObitoForm from '../OutcomeObitoForm';

function OutcomeFormList() {
  const { values } = useFormikContext();

  return (
    <FieldArray name="newDesfechos">
      {({ remove }) => (
        <div>
          {values.newDesfechos &&
            values.newDesfechos.length > 0 &&
            values.newDesfechos
              .map((desfecho, index) => (
                <OutcomObitoForm
                  index={index}
                  key={index}
                  remove={remove}
                />
              ))
              .reverse()}
        </div>
      )}
    </FieldArray>
  );
}

export default OutcomeFormList;
