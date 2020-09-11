import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// api.interceptors.response.use(
//   function(response) {
//     return response;
//   },
//   function(error) {
//     switch (error.response.status) {
//       case 401:
//         throw new Error('Erro de token');

//       default:
//         break;
//     }
//     return Promise.reject(error);
//   },
// );

export default api;
