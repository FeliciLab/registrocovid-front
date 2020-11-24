import * as Yup from 'yup';

const schema = Yup.object().shape({
  data_internacao: Yup.date(),
  data_inicio_sintomas: Yup.date()
    .required('Campo obrigatório')
    .min('01/01/2020', 'Deve ser posterior ou igual à 01/01/2020')
    .max(
      Yup.ref('data_internacao'),
      'Deve ser anterior ou igual a data de internação (Categoria Informações Gerais)',
    ),
});

export default schema;
