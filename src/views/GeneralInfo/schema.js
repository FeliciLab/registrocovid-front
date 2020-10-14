import * as Yup from 'yup';

const schema = Yup.object().shape({
  prontuario: Yup.number()
    .integer('Número de prontuário inválido (apenas números inteiros)')
    .min(1, 'Número de prontuário deve ser maior que 0 (zero)')
    .required('Campo obrigatório'),
  data_internacao: Yup.date()
    .required('Campo obrigatório'),
  data_atendimento: Yup.date().when('data_internacao', (data, schema) =>
    data
      ? schema.max(
        data,
        'Deve ser anterior ou igual a data de internação do paciente',
      )
      : schema,
  ),
});

export default schema;
