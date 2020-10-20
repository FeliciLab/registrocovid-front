import * as Yup from 'yup';

const schema = Yup.object().shape({
  newDesfechos: Yup.array().of(
    Yup.object().shape({
      tipo_desfecho_id: Yup.number(),
      data: Yup.string().required('Campo obrigatório'),
      causa_obito: Yup.string().max(1000, 'Máximo de 1000 caracteres'),
    }),
  ),
});

export default schema;
