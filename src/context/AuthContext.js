import React, { createContext } from 'react';

import useAuth from './hooks/useAuth';

import { ToastProvider } from 'hooks/toast';

const Context = createContext();

function AuthProvider({ children }) {
  const {
    loading,
    authenticated,
    handleLogin,
    handleLogout,
    erroLogin,
    isLogged,
  } = useAuth();

  return (
    <Context.Provider
      value={{ loading, authenticated, handleLogin, handleLogout, erroLogin, isLogged }}
    >
      <ToastProvider>
        {children}
      </ToastProvider>
    </Context.Provider>
  );
}

export { Context, AuthProvider };
