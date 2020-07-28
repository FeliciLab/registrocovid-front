import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7000/api/',
});

// api fake para testes.
export const apiFake = axios.create({
  baseURL: 'http://localhost:4000/'
});

export default api;
