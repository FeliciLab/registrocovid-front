import axios from 'axios';
import { func } from 'prop-types';
import SnackBar from '../components/SnackBar';
import { useToast } from '../hooks/toast';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    // whatever you want to do with the error
    const { addToast } = useToast();

    switch (error.response.status) {
      case 401:
        addToast({
          type: 'error',
          message: 'Sua sessão expirou, faça login novamente',
        });
        break;

      default:
        break;
    }
    return Promise.reject(error);
  },
);

export default api;
