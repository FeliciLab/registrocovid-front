import * as Yup from 'yup';

const schema = Yup.object().shape({
  data_evolucao: Yup.date().required('Campo obrigatório')
});

export default schema;
