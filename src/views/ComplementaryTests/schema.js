import * as Yup from 'yup';

const schema = Yup.object().shape({
  newComplementaryTests: Yup.array().of(
    Yup.object().shape({
      resultado: Yup.string().required('Campo obrigatório'),
      data: Yup.string().required('Campo obrigatório'),
    }),
  ),
  tipoNewTesteSelected: Yup.string(),
});

export default schema;
