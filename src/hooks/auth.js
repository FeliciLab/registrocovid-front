import React, {
  createContext,
  useState,
  useContext,
  useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';

// Criando Contexto
const AuthContext = createContext();


// Provider
export function AuthProvider({ children }) {

  const history = useHistory();

  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@RegistroCovid:token');

    if (token) {

      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token };
    }

    return {};
  });

  const signIn = useCallback(async ({ cpf, password }) => {
    // Ainda não está funcional.

    const response = await api.post('/auth/login', {
      cpf,
      password,
    });

    console.log(response);

    const { access_token } = response.data;

    localStorage.setItem('@RegistroCovid:token', access_token);

    api.defaults.headers.authorization = `Bearer ${access_token}`;

    setData({ access_token });

    history.push('/meus-pacientes');
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@RegistroCovid:token');

    setData({});
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, token: data.token, setData }}>
      {children}
    </AuthContext.Provider>
  );

}

// Hook
export function useAuth() {
  const context = useContext(AuthContext);

  const { token, signIn, signOut, setData } = context;

  return {
    token,
    signIn,
    signOut,
    setData
  };
}
