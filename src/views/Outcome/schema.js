import * as Yup from 'yup';

const schema = Yup.object().shape({
  newDesfechos: Yup.array().of(
    Yup.object().shape({
      tipo_desfecho_id: Yup.number(),
      data: Yup.string().required('Campo obrigatório'),
    }),
  ),
});

export default schema;
