import api from 'services/api';

const getTiposDesfecho = async () => {
  try {
    const response = await api.get('/tipos-desfecho');
    if (response.status === 200) {
      return { status: response.status, data: response.data };
    }
  } catch (err) {
    let message = 'Erro ao tentar carregar informações, tente novamente.';
    if (err.response.status === 404) {
      message = 'Exame não encontrado.';
    }
    throw new Error(message);
  }
};

// tipos-cuidado-paliativo
const getTiposCuidadoPaliativo = async () => {
  try {
    const response = await api.get('/tipos-cuidado-paliativo');
    if (response.status === 200) {
      return { status: response.status, data: response.data };
    }
  } catch (err) {
    let message = 'Erro ao tentar carregar informações, tente novamente.';
    if (err.response.status === 404) {
      message = 'Exame não encontrado.';
    }
    throw new Error(message);
  }
};


const useSeeds = () => {
  return {
    getTiposDesfecho,
    getTiposCuidadoPaliativo,
  };
};

export default useSeeds;
