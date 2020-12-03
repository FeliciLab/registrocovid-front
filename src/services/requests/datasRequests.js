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

export const buscarTiposSitucaoUsoDrogas = () =>
  api.get('/situacao-uso-drogas').then(response => response.data);

export const buscarDrogas = () =>
  api.get('/drogas').then(response => response.data);

export const buscarHistoricoPaciente = (patienteId) =>
  api.get(`/pacientes/${patienteId}/historico`).then(response => response.data);

export default {
  buscarComorbidade,
  buscarTiposDoencas,
  buscarCorticosteroides,
  buscarDoencas,
  buscarOrgaos,
  buscarTiposSitucaoUsoDrogas,
  buscarDrogas,
  buscarHistoricoPaciente,
};
