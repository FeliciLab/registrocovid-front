import React from 'react';
import { useFormikContext, FieldArray } from 'formik';
import OutcomeObitoForm from '../OutcomeObitoForm';
import OutcomeTransfForm from '../OutcomeTransfForm';
import OutcomeAltaForm from '../OutcomeAltaForm';

function OutcomeFormList() {
  const { values } = useFormikContext();

  return (
    <FieldArray name="newDesfechos">
      {({ remove }) => (
        <div>
          {values.newDesfechos &&
            values.newDesfechos.length > 0 &&
            values.newDesfechos
              .map((desfecho, index) => {
                switch (desfecho.tipo_desfecho_id) {
                  case '1':
                    return (
                      <OutcomeAltaForm
                        index={index}
                        key={index}
                        remove={remove}
                      />
                    );
                  case '2':
                    return (
                      <OutcomeTransfForm
                        index={index}
                        key={index}
                        remove={remove}
                      />
                    );
                  case '3':
                    return (
                      <OutcomeObitoForm
                        index={index}
                        key={index}
                        remove={remove}
                      />
                    );
                  default:
                    return null
                }
              })
              .reverse()}
        </div>
      )}
    </FieldArray>
  );
}

export default OutcomeFormList;
