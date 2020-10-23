import * as Yup from 'yup';

const schema = Yup.object().shape({
  data_internacao: Yup.date(),
  data_nascimento: Yup.date(),
  data_inicio_sintomas: Yup.date()
    .required('Campo obrigatório')
    .max(new Date(), 'Deve ser anterior ou igual a data de hoje')
    .min('01/01/2020', 'Deve ser posterior ou igual à 01/01/2020')
    .when('data_internacao', (data, schema) =>
      data
        ? schema.max(
          data,
          'Deve ser anterior ou igual a data de internação (Categoria Informações Gerais)',
        )
        : schema,
    )
    .when('data_nascimento', (data, schema) =>
      data
        ? schema.min(
          data,
          'Deve ser posterior ou igual a data de nascimento (Categoria Identificação do paciente)',
        )
        : schema,
    ),
});

export default schema;
