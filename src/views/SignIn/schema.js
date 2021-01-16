import * as Yup from 'yup';

const schema = Yup.object().shape({
  cpf: Yup.string().required('Campo obrigatório'),
  password: Yup.string()
    .min(6, 'O campo Password deve ter pelo menos 6 caracteres.')
    .required('Campo obrigatório'),
});

export default schema;
