import * as Yup from 'yup';

const schema = Yup.object().shape({
  municipio_id: Yup.number(),
  bairro_id: Yup.number(),
  estado_id: Yup.number(),
  telefone_de_casa: Yup.string(),
  telefone_celular: Yup.string(),
  telefone_do_trabalho: Yup.string(),
  telefone_de_vizinho: Yup.string(),
  sexo: Yup.string()
    .required('Campo obrigatório')
    .notOneOf(['0'], 'Campo obrigatório'),
  data_nascimento: Yup.string().required('Campo obrigatório'),
  estado_nascimento_id: Yup.string(),
  cor_id: Yup.number(),
  estado_civil_id: Yup.number(),
  escolaridade_id: Yup.number(),
  atividade_profissional_id: Yup.number(),
  qtd_pessoas_domicilio: Yup.number(),
});

export default schema;
