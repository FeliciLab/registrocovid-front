import * as Yup from 'yup';

const schema = Yup.object().shape({
  tipoNewSuporteRespiratorioSelected: Yup.string(),
  newSuportesRespitatorios: Yup.array().of(
    Yup.object().shape({
      data_inicio: Yup.string().required('Campo obrigatório'),
      data_coleta: Yup.string().when(
        'tipoNewSuporteRespiratorioSelected',
        (tipo, schema) =>
          ['1', '2', '3', '4', '5', '6', '7', '8', '9'].some(
            item => item === tipo,
          )
            ? schema.required('Campo obrigatório')
            : schema,
      ),
    }),
  ),
});

// TODO: Remover depois esses comentários
// tipo_suporte_id: values.tipoNewSuporteRespiratorioSelected.toString(),
// fluxo_o2: '',
// data_inicio: '',
// data_termino: '',
// menos_24h_vmi: '',
// concentracao_o2: '',
// fluxo_sangue: '',
// fluxo_gasoso: '',
// fio2: '',
// data_pronacao: '', // Pronacao
// quantidade_horas: '', // Pronacao
// data_inclusao_desmame: '', // Desmane

// const initialValues = {
//   newSuportesRespitatorios: [],
//   tipoNewSuporteRespiratorioSelected: '',
//   ventMecInvasiva: {
//     data_inicio: '',
//     data_termino: '',
//     menos_24h_vmi: false,
//   }
// };

// mapValues(obj, (_, key) => {
//   if (key.includes('data')) {
//     return Yup.date().required('Campo Obrigatório');
//   }
//   if (key.includes('parametro')) {
//     return Yup.number().positive('Parâmetro deve ser maior do que 0');
//   }
//   if (key.includes('quantidade_horas')) {
//     return Yup.number().positive('Parâmetro deve ser maior do que 0');
//   }
// })

export default schema;
