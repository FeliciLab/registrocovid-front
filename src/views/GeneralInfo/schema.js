import * as Yup from 'yup';

const schema = Yup.object().shape({
  prontuario: Yup.number()
    .integer('Número de prontuário inválido (apenas números inteiros)')
    .min(1, 'Número de prontuário deve ser maior que 0 (zero)')
    .required('Campo obrigatório'),
  data_internacao: Yup.date().required('Campo obrigatório'),
  unidade_primeiro_atendimento: Yup.string(),
  unidade_de_saude: Yup.string(),
  data_atendimento: Yup.date(),
  suporte_respiratorio: Yup.boolean(),
  tipo_suport_respiratorio: Yup.string(),
  reinternacao: Yup.boolean(),
});

export default schema;
