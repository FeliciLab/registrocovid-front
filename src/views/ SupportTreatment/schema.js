import * as Yup from 'yup';

const schema = Yup.object().shape({
  data_inicio: Yup.date().required('Campo obrigatório'),
  data_termino: Yup.date().required('Campo obrigatório'),
});

export default schema;
