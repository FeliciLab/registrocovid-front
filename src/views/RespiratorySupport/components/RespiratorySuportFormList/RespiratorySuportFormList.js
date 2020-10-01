import { FieldArray, useFormikContext } from 'formik';
import React from 'react';
import RespiratorySuportForm from '../RespiratorySuportForm/RespiratorySuportForm';

const RespiratorySuportFormList = () => {
  const { values } = useFormikContext();

  return (
    <FieldArray name="newSuportesRespitatorios">
      {({ remove }) => (
        <div>
          {values.newSuportesRespitatorios &&
            values.newSuportesRespitatorios.length > 0 &&
            values.newSuportesRespitatorios
              .map((item, index) => (
                <RespiratorySuportForm
                  index={index}
                  key={index}
                  remove={remove}
                  tipo={item.tipo_suporte_id}
                />
              ))
              .reverse()}
        </div>
      )}
    </FieldArray>
  );
};

export default RespiratorySuportFormList;
