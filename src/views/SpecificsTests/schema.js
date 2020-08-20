import * as Yup from 'yup';

const schema = Yup.object().shape({
  newsTestsRTCPRs: Yup.array(),
  newsTestsRapidos: Yup.array(),
  tipo_new_teste: Yup.string(),
});

export default schema;
