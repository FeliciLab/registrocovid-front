import api from 'services/api';

export const getInitialValues = evolucaoDiaria => {
  return {
    data_evolucao: evolucaoDiaria.data_evolucao || '',
    temperatura: evolucaoDiaria.temperatura || '',
    frequencia_respiratoria: evolucaoDiaria.frequencia_respiratoria || '',
    peso: evolucaoDiaria.peso || '',
    altura: evolucaoDiaria.altura || '',
    pressao_sistolica: evolucaoDiaria.pressao_sistolica || '',
    pressao_diastolica: evolucaoDiaria.pressao_diastolica || '',
    frequencia_cardiaca: evolucaoDiaria.frequencia_cardiaca || '',
    ausculta_pulmonar: evolucaoDiaria.ausculta_pulmonar || '',
    oximetria: evolucaoDiaria.oximetria || '',
    escala_glasgow: evolucaoDiaria.escala_glasgow || 3,
    tipo_suporte_selected: 0,
    newSuportesRespitatorios: [],
  };
};

export const postEvolucaoDiaria = async (values, patient) => {
  const jsonToSendEvolucaoDiaria = {
    data_evolucao: values.data_evolucao || undefined,
    temperatura: values.temperatura || undefined,
    frequencia_respiratoria: values.frequencia_respiratoria || undefined,
    peso: values.peso || undefined,
    altura: values.altura || undefined,
    pressao_sistolica: values.pressao_sistolica || undefined,
    pressao_diastolica: values.pressao_diastolica || undefined,
    frequencia_cardiaca: values.frequencia_cardiaca || undefined,
    ausculta_pulmonar: String(values.ausculta_pulmonar) || undefined,
    oximetria: values.oximetria || undefined,
    escala_glasgow: values.escala_glasgow || undefined,
  };

  await api.post(
    `/pacientes/${patient.id}/evolucoes-diarias`,
    jsonToSendEvolucaoDiaria,
  );

  const jsonToSendSuportesRespiratorios = values.newSuportesRespitatorios.map(
    elem => ({
      tipo_suporte_id: elem.tipo_suporte_id || undefined,
      fluxo_o2: elem.fluxo_o2 || undefined,
      data_inicio: values.data_evolucao || undefined,
      data_termino: elem.data_termino || undefined,
      menos_24h_vmi: elem.menos_24h_vmi || undefined,
      concentracao_o2: elem.concentracao_o2 || undefined,
      fluxo_sangue: elem.fluxo_sangue || undefined,
      fluxo_gasoso: elem.fluxo_gasoso || undefined,
      fio2: elem.fio2 || undefined,
      data_pronacao: values.data_evolucao || undefined,
      quantidade_horas: elem.quantidade_horas || undefined,
      data_inclusao_desmame: values.data_evolucao || undefined,
    }),
  );

  if (jsonToSendSuportesRespiratorios.length > 0) {
    await api.post(
      `/pacientes/${patient.id}/suportes-respiratorios`,
      jsonToSendSuportesRespiratorios,
    );
  }
}
