import React, {
  createContext,
  useState,
  useContext,
  useCallback
} from 'react';

import api from '../services/api';

// Criando Contexto
const AuthContext = createContext();

// Provider
export function AuthProvider({ children }) {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@RegistroCovid:token');
    const user = localStorage.getItem('@RegistroCovid:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  const signIn = useCallback(async ({ cpf, password }) => {
    // Ainda não está funcional.
    // const response = await api.post('sessions', {
    //   cpf,
    //   password,
    // });

    // const { token, user } = response.data;

    // localStorage.setItem('@RegistroCovid:token', token);
    // localStorage.setItem('@RegistroCovid:user', JSON.stringify(user));

    // api.defaults.headers.authorization = `Bearer ${token}`;

    // setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@RegistroCovid:token');
    localStorage.removeItem('@RegistroCovid:user');

    setData({});
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );

}

// Hook
export function useAuth() {
  const context = useContext(AuthContext);

  const { user, signIn, signOut } = context;

  return {
    user,
    signIn,
    signOut
  };
}
