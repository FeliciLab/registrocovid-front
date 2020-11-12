import api from 'services/api'

export const buscarDoencas = () => api.get('/doencas')
  .then(response => response.data)

export const buscarTiposDoencas = () => api.get('/tipos-doencas')
  .then(response => response.data)

export const buscarCorticosteroides = () => api.get('/corticosteroides')
  .then(response => response.data)

export const buscarOrgaos = () => api.get('/orgaos')
  .then(response => response.data)

export default {
  buscarTiposDoencas,
  buscarCorticosteroides,
  buscarDoencas,
  buscarOrgaos
}
