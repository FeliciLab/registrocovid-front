import { useState, useEffect } from 'react';
import history from '../../history';
import api from 'services/api';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erroLogin, setErroLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('@RegistroCovid:token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin({ cpf, password }) {
    await api
      .post('/auth/login', { cpf, password })
      .then(response => {
        const { access_token } = response.data;

        localStorage.setItem('@RegistroCovid:token', access_token);
        api.defaults.headers.Authorization = `Bearer ${access_token}`;

        setAuthenticated(true);
        history.push('/meus-pacientes');
      })
      .catch(error => {
        // TODO: Melhorar esse tratamento de erro.
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        setErroLogin(true);
      });
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('@RegistroCovid:token');
    api.defaults.headers.Authorization = undefined;
    history.push('/sign-in');
  }

  return {
    loading,
    erroLogin,
    authenticated,
    setAuthenticated,
    handleLogin,
    handleLogout,
  };
}
