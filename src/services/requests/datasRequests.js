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

export default {
  buscarComorbidade,
  buscarTiposDoencas,
  buscarCorticosteroides,
  buscarDoencas,
  buscarOrgaos,
  buscarEvolucoesDiarias,
};
