import * as Yup from 'yup';

const milissegundos_por_dia = 1000 * 60 * 60 * 24;

const msgErros = {
  data_hoje: 'Deve ser anterior ou igual a data de hoje',
  data_ultimo_desfecho:
    'Deve ser anterior a data do último desfecho (Categoria Desfecho)',
  data_atendimento_referencia:
    'Deve ser anterior ou igual a data do atendimento na unidade que referenciou o paciente (Categoria Informações Gerais)',
  data_internacao:
    'Deve ser anterior ou igual a data de internação (Categoria Informações Gerais)',
};

const schema = Yup.object().shape({
  data_internacao: Yup.date(),
  data_atendimento_referencia: Yup.date(),
  data_nascimento: Yup.date(),
  data_ultimo_desfecho: Yup.date().transform(
    value => new Date(value.getTime() - milissegundos_por_dia),
  ),
  data_inicio_ano: Yup.date().default('01/01/2020'),
  data_hoje: Yup.date().default(new Date()),
  data_inicio_sintomas: Yup.date()
    .required('Campo obrigatório')
    .min(Yup.ref('data_inicio_ano'), 'Deve ser posterior ou igual à 01/01/2020')
    .when('data_nascimento', (data, schema) =>
      data
        ? schema.min(
          data,
          'Deve ser posterior ou igual a data de nascimento (Categoria Identificação do paciente)',
        )
        : schema,
    )
    .when(
      [
        'data_hoje',
        'data_ultimo_desfecho',
        'data_internacao',
        'data_atendimento_referencia',
      ],
      {
        is: (...values) => values.some(elem => !!elem),
        then: Yup.date().max(
          Yup.ref('data_hoje') ||
            Yup.ref('data_ultimo_desfecho') ||
            Yup.ref('data_internacao') ||
            Yup.ref('data_atendimento_referencia'),
        ),
        otherwise: Yup.date(),
      },
    ),
  // .max(Yup.ref('data_hoje'), 'Deve ser anterior ou igual a data de hoje')
  // .when('data_ultimo_desfecho', (data, schema) =>
  //   data
  //     ? schema.max(
  //       data,
  //       'Deve ser anterior a data do último desfecho (Categoria Desfecho)',
  //     )
  //     : schema,
  // )
  // .when('data_atendimento_referencia', (data, schema) =>
  //   data
  //     ? schema.max(
  //       data,
  //       'Deve ser anterior ou igual a data do atendimento na unidade que referenciou o paciente (Categoria Informações Gerais)',
  //     )
  //     : schema,
  // )
  // .when('data_internacao', (data, schema) =>
  //   data
  //     ? schema.max(
  //       data,
  //       'Deve ser anterior ou igual a data de internação (Categoria Informações Gerais)',
  //     )
  //     : schema,
  // ),
});

export default schema;
