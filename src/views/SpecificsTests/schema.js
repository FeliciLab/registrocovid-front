import * as Yup from 'yup';

const schema = Yup.object().shape({
  newsTestsRTCPRs: Yup.array().of(
    Yup.object().shape({
      data_coleta: Yup.string().required('Campo obrigatório'),
      sitio_tipo: Yup.number()
        .required('Campo obrigatório')
        .min(1, 'Campo obrigatório'),
      data_resultado: Yup.string(),
      rt_pcr_resultado: Yup.number(),
    }),
  ),
  newsTestsRapidos: Yup.array().of(
    Yup.object().shape({
      data_realizacao: Yup.date().required('Campo obrigatório'),
      resultado: Yup.boolean().required('Campo obrigatório'),
    }),
  ),
  tipo_new_teste: Yup.string(),
});

export default schema;
