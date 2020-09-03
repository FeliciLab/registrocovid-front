import * as Yup from 'yup';

import mapValues from 'lodash/mapValues';

const schema = Yup.lazy(obj =>
  Yup.object(
    mapValues(obj, (_, key) => {
      if (key.includes('data_complicacao')) {
        return Yup.date().required('Campo Obrigatório');
      }
      if (key.includes('descricao') && !key.includes('outros')) {
        return Yup.string();
      }
      // Transfusional
      if (key.includes('tipo_transfusao_id')) {
        return Yup.number().required('Campo Obrigatório');
      }
      if (key.includes('volume_transfusao')) {
        return Yup.number().positive();
      }
      // Outras
      if (key.includes('descricao') && key.includes('outros')) {
        return Yup.string().required('Campo Obrigatório');
      }
    })
  )
);

export default schema;
