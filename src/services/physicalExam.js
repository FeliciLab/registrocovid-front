import api from './api';

export const getPhysicalExam = async (patientId, examId) => {
  try{
    const response = await api.get(`/pacientes/${patientId}/evolucoes-diarias/${examId}`);
    if (response.status === 200) {
      return {status: response.status, data: response.data};
    }
  }catch(err){
    let message = 'Erro ao tentar carregar informações, tente novamente.'
    if (err.response.status === 404) {
      message = 'Exame não encontrado.'
    }
    throw new Error( message );
  }
}