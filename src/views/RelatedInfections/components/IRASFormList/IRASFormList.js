import React from 'react';
import { useFormikContext, FieldArray } from 'formik';
import IRASForm from '../IRASForm/IRASForm';

function IRASFormList() {
  const { values } = useFormikContext();

  return (
    <FieldArray name="newIRASs">
      {({ remove }) => (
        <div>
          {values.newIRASs &&
            values.newIRASs.length > 0 &&
            values.newIRASs
              .map((iras, index) => (
                <IRASForm
                  index={index}
                  key={index}
                  label={iras.labelForm}
                  remove={remove}
                >
                  { (iras.tipo_iras_descricao === '') && (
                    <div />
                  )}
                </IRASForm>
              ))
              .reverse()}
        </div>
      )}
    </FieldArray>
  );
}

export default IRASFormList;
