import * as Yup from 'yup';

const schema = Yup.object().shape({
  newsTestsRTCPRs: Yup.array().of(
    Yup.object().shape({
      data_coleta: Yup.string().required('Campo obrigatório'),
      sitio_tipo: Yup.number().required(
        'Campo obrigatório. Você deve preenchê-lo para salvar os dados.',
      ),
      data_resultado: Yup.string(),
      rt_pcr_resultado: Yup.number(),
    }),
  ),
  newsTestsRapidos: Yup.array().of(
    Yup.object().shape({
      data_realizacao: Yup.string().required('Campo obrigatório'),
      resultado: Yup.string().required(
        'Campo obrigatório. Você deve preenchê-lo para salvar os dados.',
      ),
    }),
  ),
  tipo_new_teste: Yup.string(),
});

export default schema;
