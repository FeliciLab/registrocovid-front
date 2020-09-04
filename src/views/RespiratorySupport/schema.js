import * as Yup from 'yup';

import mapValues from 'lodash/mapValues';

const schema = Yup.lazy(obj =>
  Yup.object(
    mapValues(obj, (_, key) => {
      if (key.includes('data')) {
        return Yup.date().required('Campo Obrigatório');
      }
      if (key.includes('parametro')) {
        return Yup.number().positive('Parâmetro deve ser maior do que 0');
      }
      if (key.includes('quantidade_horas')) {
        return Yup.number().positive('Parâmetro deve ser maior do que 0');
      }
    })
  )
);

export default schema;
