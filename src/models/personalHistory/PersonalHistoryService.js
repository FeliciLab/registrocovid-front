import api from 'services/api';
import { isEmpty } from 'underscore';

export const getInitialValuesPersonalHistoryForm = patientHistory => {
  return isEmpty(patientHistory)
    ? {
      situacao_tabagismo_id: '',
      situacao_uso_drogas_id: '',
      drogas: {},
      situacao_etilismo_id: '',
    }
    : {
      situacao_tabagismo_id: String(patientHistory.situacao_tabagismo_id),
      situacao_uso_drogas_id: String(patientHistory.situacao_uso_drogas_id),
      drogas: patientHistory.drogas.reduce(
        (acc, curr) => ({ ...acc, [curr.id]: true }),
        {},
      ),
      situacao_etilismo_id: String(patientHistory.situacao_etilismo_id),
    };
};

const getSelectedDrogasIds = values =>
  Object.entries(values.drogas).map(elem => (elem[1] ? Number(elem[0]) : null));

const getValuesSanitized = values =>
  Object.keys(values).reduce((acc, curr) => {
    if (values[curr] !== '') {
      return { ...acc, [curr]: values[curr] };
    }
    return acc;
  }, {});

export const postPatientHistory = async (values, patientId) => {
  const selectedDrogasIds = getSelectedDrogasIds(values);
  const valuesSanitized = getValuesSanitized(values);
  await api.post(`/pacientes/${patientId}/historico`, {
    ...valuesSanitized,
    drogas: selectedDrogasIds,
  });
};
