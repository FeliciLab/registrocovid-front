import api from 'services/api';

export const postSpecificTests = (newsTestes, patientId) => {
  // sanitizando os dasos de novos testes para o envio
  const newsTestesSanitized = newsTestes.map(test =>
    test.tipo_teste === 'RTPCR'
      ? {
        data_coleta: test.data_coleta,
        sitio_tipo_id: test.sitio_tipo,
        data_resultado: test.data_resultado,
        rt_pcr_resultado_id: test.rt_pcr_resultado,
      }
      : {
        data_realizacao: test.data_realizacao,
        resultado: test.resultado === 'true' ? true : false,
      },
  );

  const newsTestesPromises = newsTestesSanitized.map(test =>
    api.post(`/pacientes/${patientId}/exames-laboratoriais`, test),
  );

  return newsTestesPromises;
}
