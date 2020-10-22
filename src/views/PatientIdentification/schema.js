import * as Yup from 'yup';

const schema = Yup.object().shape({
  sexo: Yup.string()
    .required('Campo obrigatório')
    .notOneOf(['0'], 'Campo obrigatório'),
  data_nascimento: Yup.string().required('Campo obrigatório'),
});

export default schema;
