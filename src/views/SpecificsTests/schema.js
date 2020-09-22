import * as Yup from 'yup';

const schema = Yup.object().shape({
  newsTestes: Yup.array().of(
    Yup.object().shape({
      tipo_teste: Yup.string(),
      data_coleta: Yup.string().when('tipo_teste', (tipo_teste, schema) =>
        tipo_teste === 'RTPCR'
          ? schema.required('Campo obrigatório')
          : schema,
      ),
      sitio_tipo: Yup.string().when('tipo_teste', (tipo_teste, schema) =>
        tipo_teste === 'RTPCR'
          ? schema.required('Campo obrigatório')
          : schema,
      ),
      data_realizacao: Yup.string().when('tipo_teste', (tipo_teste, schema) =>
        tipo_teste === 'RAPIDO'
          ? schema.required('Campo obrigatório')
          : schema,
      ),
      resultado: Yup.string().when('tipo_teste', (tipo_teste, schema) =>
        tipo_teste === 'RAPIDO'
          ? schema.required('Campo obrigatório')
          : schema,
      ),
    }),
  ),
});

export default schema;
