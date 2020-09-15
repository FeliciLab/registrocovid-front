import * as Yup from 'yup';

const schema = Yup.object().shape({
  newIRASs: Yup.array().of(
    Yup.object().shape({
      data: Yup.string().required('Campo obrigatório'),
    }),
  ),
});

export default schema;
