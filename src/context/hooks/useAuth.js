import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from 'services/api';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('@RegistroCovid:token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin({ cpf, password }) {

    // TODO: colcoar aqui o tratamento do erro.
    const { data } = await api.post('/auth/login', { cpf, password });

    const { access_token } = data;

    localStorage.setItem('@RegistroCovid:token', access_token);
    api.defaults.headers.Authorization = `Bearer ${access_token}`;
    setAuthenticated(true);
    history.push('/meus-pacientes');
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('@RegistroCovid:token');
    api.defaults.headers.Authorization = undefined;
    history.push('/sign-in');
  }

  return {
    loading,
    authenticated,
    handleLogin,
    handleLogout
  };
}
