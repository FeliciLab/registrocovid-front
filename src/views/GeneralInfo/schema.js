import * as Yup from 'yup';

const milissegundos_por_dia = 1000 * 60 * 60 * 24;

const schema = Yup.object().shape({
  prontuario: Yup.number()
    .min(0, 'Número de prontuário inválido (apenas números positivos)')
    .integer('Número de prontuário inválido (apenas números inteiros)')
    .required('Campo obrigatório'),
  data_internacao: Yup.date()
    .required('Campo obrigatório')
    .min('01/01/2020', 'Deve ser posterior ou igual à 01/01/2020')
    .max(
      String(new Date()),
      `Deve ser anterior ou igual a ${new Date().toLocaleString('pt-BR', {
        dateStyle: 'short',
      })}`,
    ),
  data_atendimento: Yup.date()
    .when('data_internacao', (data, schema) =>
      data
        ? schema.max(
          data,
          'Deve ser anterior ou igual a data de internação do paciente',
        )
        : schema,
    )
    .when('data_inicio_sintomas', (data, schema) =>
      data
        ? schema.min(
          data,
          'Deve ser posterior ou igual a data do início dos sintomas (Categoria Sintomas iniciais da COVID-19)',
        )
        : schema,
    )
    .when('data_ultimo_desfecho', (data, schema) =>
      data
        ? schema.max(
          data,
          'Deve ser anterior a data do último desfecho (Categoria Desfecho)',
        )
        : schema,
    )
    .min('01/01/2020', 'Deve ser posterior ou igual à 01/01/2020')
    .max(
      String(new Date()),
      `Deve ser anterior ou igual a ${new Date().toLocaleString('pt-BR', {
        dateStyle: 'short',
      })}`,
    ),
  data_inicio_sintomas: Yup.date(),
  data_ultimo_desfecho: Yup.date().transform(
    value => new Date(value.getTime() - milissegundos_por_dia),
  ),
});

export default schema;
