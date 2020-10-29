import api from './api';

export const getLastOutcome = async (patientId) => {
  try{
    const response = await api.get(`pacientes/${patientId}/desfecho/ultimo`);
    if (response.status === 200) {
      return {data: response.data};
    }
  }catch(err){
    let message = 'Erro ao tentar carregar informações, tente novamente.'
    if (err.response.status === 404) {
      message = 'Desfecho não encontrado.'
    }
    throw new Error( message );
  }
}
