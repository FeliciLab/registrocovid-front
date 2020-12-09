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
