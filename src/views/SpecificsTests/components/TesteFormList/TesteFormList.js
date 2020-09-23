import { FieldArray, useFormikContext } from 'formik';
import React from 'react';
import TesteRapidoForm from '../TesteRapidoForm';
import TesteRTPCRForm from '../TesteRTPCRForm';

function TesteFormList() {
  const { values } = useFormikContext();

  return (
    <FieldArray name="newsTestes">
      {({ remove }) => (
        <div>
          {values.newsTestes &&
            values.newsTestes.length > 0 &&
            values.newsTestes
              .map((teste, index) =>
                teste.tipo_teste === 'RTPCR' ? (
                  <TesteRTPCRForm
                    index={index}
                    key={index}
                    remove={remove}
                  />
                ) : (
                  <TesteRapidoForm
                    index={index}
                    key={index}
                    remove={remove}
                  />
                ),
              )
              .reverse()}
        </div>
      )}
    </FieldArray>
  );
}

export default TesteFormList;
