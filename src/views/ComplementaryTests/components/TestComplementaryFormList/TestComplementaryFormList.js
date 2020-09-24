import React from 'react';

import { FieldArray, useFormikContext } from 'formik';
import TestComplementaryForm from '../TestComplementaryForm/TestComplementaryForm';

function TestComplementaryFormList() {
  const { values } = useFormikContext();

  return (
    <div>
      {
        <FieldArray name="newComplementaryTests">
          {({ remove }) => (
            <div>
              {values.newComplementaryTests &&
                values.newComplementaryTests.length > 0 &&
                values.newComplementaryTests
                  .map((teste, index) => (
                    <TestComplementaryForm
                      index={values.newComplementaryTests.indexOf(teste)}
                      key={index}
                      remove={remove}
                    />
                  ))
                  .reverse()}
            </div>
          )}
        </FieldArray>
      }
    </div>
  );
}

export default TestComplementaryFormList;
