import * as Yup from 'yup';

const schema = Yup.object().shape({
  newSupportTreatments: Yup.array().of(
    Yup.object().shape({
      data_hemodialise: Yup.date().required('Campo obrigatório'),
    }),
  ),
});

export default schema;
