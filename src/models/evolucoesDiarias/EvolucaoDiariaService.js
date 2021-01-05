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
