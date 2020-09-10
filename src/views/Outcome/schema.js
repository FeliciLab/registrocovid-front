import * as Yup from 'yup';

const schema = Yup.object().shape({
  newDesfechos: Yup.array().of(
    Yup.object().shape({
      tipo_desfecho_id: Yup.number(),
      data: Yup.string()
        .test(
          'tipo_desfecho_id',
          'teste',
          () => (Yup.ref('tipo_desfecho_id') !== 3),
        )
        .required('Campo obrigatório'),
    }),
  ),
});

export default schema;
