/* eslint-disable react/prop-types */
import React, { createContext } from 'react';

import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const {
    loading,
    authenticated,
    handleLogin,
    handleLogout,
    erroLogin,
  } = useAuth();

  return (
    <Context.Provider
      value={{ loading, authenticated, handleLogin, handleLogout, erroLogin }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
