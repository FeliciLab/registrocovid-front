import * as Yup from 'yup';

const milissegundos_por_dia = 1000 * 60 * 60 * 24;

const schema = Yup.object().shape({
  sexo: Yup.string()
    .required('Campo obrigatório')
    .notOneOf(['0'], 'Campo obrigatório'),
  data_nascimento: Yup.date()
    .when('data_internacao', (data, schema) =>
      data
        ? schema.max(
          data,
          'Deve ser anterior ou igual a data de internação (Categoria Informações Gerais)',
        )
        : schema,
    )
    .when('data_ultimo_desfecho', (data, schema) =>
      data
        ? schema.max(
          data,
          'Deve ser anterior ou igual a data do último desfecho (Categoria Desfecho)',
        )
        : schema,
    )
    .when('data_inicio_sintomas', (data, schema) =>
      data
        ? schema.max(
          data,
          'Deve ser anterior a data do início dos sintomas (Categoria Sintomas iniciais da COVID-19)',
        )
        : schema,
    )
    .required('Campo obrigatório'),
  data_internacao: Yup.date(),
  data_ultimo_desfecho: Yup.date(),
  data_inicio_sintomas: Yup.date().transform(
    value => new Date(value.getTime() - milissegundos_por_dia),
  ),
});

export default schema;
