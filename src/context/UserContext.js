import React, { createContext, useState, useContext } from 'react';
import api from 'services/api';
import history from '../history';

const UserContext = createContext();

function UserProvider({ children }) {
  const [profile, setProfile] = useState({});

  async function mountProfile(){
    const {data} = await api.get('/profile');
    setProfile(data);
    if(data.cpf !== profile.cpf) history.push('/');
  }

  return (
    <UserContext.Provider value={{ profile, setProfile, mountProfile }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  return context;
}

export { useUser, UserProvider };
