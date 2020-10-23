import * as Yup from 'yup';

const schema = Yup.object().shape({
  data_inicio_sintomas: Yup.date()
    .required('Campo obrigatório')
    .max(new Date(), 'Deve ser anterior ou igual a data de hoje')
    .min('01/01/2020', 'Deve ser posterior ou igual à 01/01/2020'),
});

export default schema;
