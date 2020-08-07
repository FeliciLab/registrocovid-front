import React, { createContext, useState, useContext } from 'react';

const PatientContext = createContext();

function PatientProvider({ children }) {
  const [patient, setPatient] = useState({});

  return (
    <PatientContext.Provider value={{ patient, setPatient }}>
      {children}
    </PatientContext.Provider>
  );
}

function usePatient() {
  const context = useContext(PatientContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }

  return context;
}

export { usePatient, PatientProvider };
