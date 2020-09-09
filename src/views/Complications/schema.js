import * as Yup from 'yup';

const schema = Yup.object().shape({
  newsComplicacoes: Yup.array().of(
    Yup.object().shape({
      tipo_complicacao_id: Yup.string().required('Campo obrigatório'),
    }),
  ),
});

export default schema;
