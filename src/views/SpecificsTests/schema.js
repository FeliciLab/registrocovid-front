import * as Yup from 'yup';

function chaveComposta(value) {
  if (value.tipo_teste === 'RTPCR') {
    return value.data_resultado || value.rt_pcr_resultado;
  } else {
    return true;
  }
}

const schema = Yup.object().shape({
  newsTestes: Yup.array().of(
    Yup.object()
      .shape({
        tipo_teste: Yup.string(),
        resultado: Yup.string().when('tipo_teste', (tipo_teste, schema) =>
          tipo_teste === 'RAPIDO'
            ? schema.required('Campo obrigatório')
            : schema,
        ),
        // TODO: voltando as coisas aqui para um teste
        data_coleta: Yup.date(),
        data_resultado: Yup.date(),
        rt_pcr_resultado: Yup.string(),
        sitio_tipo: Yup.string(),
      })
      .test(
        'chaveComposta',
        'Não foi possível salvar pois campos obrigatórios não foram informados',
        chaveComposta,
      ),
  ),
});

export default schema;
