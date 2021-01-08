import api from 'services/api';

export const buscarComorbidade = id =>
  api.get(`/pacientes/${id}/comorbidades`).then(response => response.data);

export const buscarDoencas = () =>
  api.get('/doencas').then(response => response.data);

export const buscarTiposDoencas = () =>
  api.get('/tipos-doencas').then(response => response.data);

export const buscarCorticosteroides = () =>
  api.get('/corticosteroides').then(response => response.data);
<<<<<<< HEAD

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

export const buscarSuportesRespiratorios = (patientId) =>
  api
    .get(`/pacientes/${patientId}/suportes-respiratorios`)
    .then(response => response.data);

export const createEvolucaoDiaria = (patientId, content) =>
  api
    .post(`/pacientes/${patientId}/evolucoes-diarias`, content)
    .then(response => response.data);
=======

export const buscarOrgaos = () =>
  api.get('/orgaos').then(response => response.data);

export const buscarTiposSitucaoUsoDrogas = () =>
  api.get('/situacao-uso-drogas').then(response => response.data);

export const buscarTiposSitucaoTabagismo = () =>
  api.get('/situacao-tabagismo').then(response => response.data);

export const buscarTiposSitucaoEtilismo = () =>
  api.get('/situacao-etilismo').then(response => response.data);

export const buscarDrogas = () =>
  api.get('/drogas').then(response => response.data);

export const buscarHistoricoPaciente = patienteId =>
  api.get(`/pacientes/${patienteId}/historico`).then(response => response.data);

export const criarHistoricoPaciente = (patienteId, values) =>
  api.post(`/pacientes/${patienteId}/historico`, values).then(response => response.data);

>>>>>>> develop

export default {
  buscarComorbidade,
  buscarTiposDoencas,
  buscarCorticosteroides,
  buscarDoencas,
  buscarOrgaos,
<<<<<<< HEAD
  buscarEvolucoesDiarias,
  buscarTiposSuporteRespiratorio,
  buscarSuportesRespiratorios,
  createEvolucaoDiaria,
  buscarEvolucaoDiariaById
=======
  buscarTiposSitucaoUsoDrogas,
  buscarDrogas,
  buscarHistoricoPaciente,
  buscarTiposSitucaoTabagismo,
  buscarTiposSitucaoEtilismo,
>>>>>>> develop
};
