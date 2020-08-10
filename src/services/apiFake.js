import axios from 'axios';

export const apiFake = axios.create({
  baseURL: 'http://localhost:4000/'
});

export default apiFake;
