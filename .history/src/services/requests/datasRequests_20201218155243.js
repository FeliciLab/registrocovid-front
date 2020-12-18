import api from 'services/api';

export const buscarComorbidade = id =>
  api.get(`/pacientes/${id}/comorbidades`).then(response => response.data);

export const buscarDoencas = () =>
  api.get('/doencas').then(response => response.data);

export const buscarTiposDoencas = () =>
  api.get('/tipos-doencas').then(response => response.data);

export const buscarCorticosteroides = () =>
  api.get('/corticosteroides').then(response => response.data);

export const buscarOrgaos = () =>
  api.get('/orgaos').then(response => response.data);

export const buscarEvolucoesDiarias = id =>
  api.get(`/pacientes/${id}/evolucoes-diarias`).then(response => response.data);

export const buscarEvolucaoDiariaById = (idPaciente, idEvolucao) =>
  api
    .get(`/pacientes/${idPaciente}/evolucoes-diarias/${idEvolucao}`)
    .then(response => response.data);

export const buscarTiposSuporteRespiratorio = () =>
  api.get('/suportes-respiratorios').then(response => response.data);

export const buscarSuportesRespiratorios = (patientId, date) => {
  return api
    .get(`/pacientes/${patientId}/suportes-respiratorios`)
    .then(response => response.data);
};

export const createEvolucaoDiaria = (patientId, content) => {
  return api
    .post(`/pacientes/${patientId}/evolucoes-diarias`, content)
    .then(response => response.data);
};

export default {
  buscarComorbidade,
  buscarTiposDoencas,
  buscarCorticosteroides,
  buscarDoencas,
  buscarOrgaos,
  buscarEvolucoesDiarias,
  buscarTiposSuporteRespiratorio,
  buscarSuportesRespiratorios,
  createEvolucaoDiaria,
};
