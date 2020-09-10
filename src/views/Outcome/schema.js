import * as Yup from 'yup';

// obs.: 3 é o id do tipo de desfecho `Cuidado Paliativo`
const schema = Yup.object().shape({
  newDesfechos: Yup.array().of(
    Yup.object().shape({
      tipo_desfecho_id: Yup.number(),
      data: Yup.string().when('tipo_desfecho_id', tipo =>
        tipo !== 3 ? Yup.string().required('Campo obrigatório') : Yup.string(),
      ),
      tipo_cuidado_paliativo_id: Yup.number().when('tipo_desfecho_id', tipo =>
        tipo === 3 ? Yup.string().required('Campo obrigatório') : Yup.string(),
      ),
    }),
  ),
});

export default schema;
