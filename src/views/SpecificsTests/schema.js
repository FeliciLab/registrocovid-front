import * as Yup from 'yup';

function chaveComposta(value) {
  if (value.tipo_teste === 'RTPCR') {
    return value.data_coleta || value.sitio_tipo;
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
