import axios from 'axios';

// api fake para testes.
export const apiFake = axios.create({
  baseURL: 'http://localhost:4000/'
});

export default apiFake;
