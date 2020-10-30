import * as Yup from 'yup';

const schema = Yup.object().shape({
  prontuario: Yup.number()
    .min(0, 'Número de prontuário inválido (apenas números positivos)')
    .integer('Número de prontuário inválido (apenas números inteiros)')
    .required('Campo obrigatório'),
  data_internacao: Yup.date().required('Campo obrigatório'),
  data_atendimento: Yup.date()
    .max(
      Yup.ref('data_internacao'),
      'Deve ser anterior ou igual a data de internação',
    )
    .min('01/01/2020', 'Deve ser posterior ou igual à 01/01/2020'),
  data_inicio_sintomas: Yup.date(),
});

export default schema;
