import * as Yup from 'yup';

const schema = Yup.object().shape({
  newsTestes: Yup.array().of(
    Yup.object().shape({
      tipo_teste: Yup.string(),
      resultado: Yup.string().when('tipo_teste', (tipo_teste, schema) =>
        tipo_teste === 'RAPIDO'
          ? schema.required('Campo obrigatório')
          : schema,
      ),
    }),
  ),
});

export default schema;
