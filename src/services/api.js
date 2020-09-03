import axios from 'axios';

const api = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_URL,
  baseURL: 'http://localhost:7000/api',
});

export default api;
