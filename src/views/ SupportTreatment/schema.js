import * as Yup from 'yup';

const schema = Yup.object().shape({
  data_inicio: Yup.date().required('Campo obrigatório'),
  data_termino: Yup.date().required('Campo obrigatório'),
  motivo_hemodialise: Yup.string().max(1000, 'Máximo de 1000 caracteres'),
});

export default schema;
