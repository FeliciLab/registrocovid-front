import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  const [profile, setProfile] = useState({
    cpf: '',
    password: '',
  });

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  return context;
}

export { useUser, UserProvider };
