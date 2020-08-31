import * as Yup from 'yup';

const schema = Yup.object().shape({
  // newsTestsRapidos: Yup.array().of(
  //   Yup.object().shape({
  //     data_realizacao: Yup.string().required('Campo obrigatório'),
  //     resultado: Yup.string().required(
  //       'Campo obrigatório. Você deve preenchê-lo para salvar os dados.',
  //     ),
  //   }),
  // ),
});

export default schema;
