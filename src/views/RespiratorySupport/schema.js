import * as Yup from 'yup';

import mapValues from 'lodash/mapValues';

const schema = Yup.lazy(obj =>
  Yup.object(
    mapValues(obj, (_, key) => {
      if (key.includes('data')) {
        return Yup.date().required('Campo Obrigatório');
      }
      if (key.includes('data_termino')) {
        return Yup.date().required('Campo Obrigatório');
      }
    })
  )
);

export default schema;
