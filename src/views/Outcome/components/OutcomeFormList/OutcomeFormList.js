import React from 'react';
import { useFormikContext, FieldArray } from 'formik';
// import OutcomeObitoForm from '../OutcomeObitoForm';
// import OutcomeCuiPaleForm from '../OutcomeCuiPaleForm';
// import OutcomeTransfForm from '../OutcomeTransfForm';
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
              .map((desfecho, index) => (
                // TODO: colocar um swicth aqui

                // <OutcomeObitoForm
                //   index={index}
                //   key={index}
                //   remove={remove}
                // />
                // <OutcomeCuiPaleForm
                //   index={index}
                //   key={index}
                //   remove={remove}
                // />
                // <OutcomeTransfForm
                //   index={index}
                //   key={index}
                //   remove={remove}
                // />
                <OutcomeAltaForm
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
