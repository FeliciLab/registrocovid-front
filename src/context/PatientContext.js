import React, { createContext, useState, useContext, useCallback } from 'react';

const PatientContext = createContext();

function PatientProvider({ children }) {

  const [patient, setPatient] = useState(() => {
    const patientLocal = localStorage.getItem('@RegistroCovid:paciente');

    if (patientLocal) {
      return JSON.parse(patientLocal);
    }
  });

  const addPatient = useCallback(patient => {
    localStorage.setItem('@RegistroCovid:paciente', JSON.stringify(patient));
    setPatient(patient);
  }, []);

  return (
    <PatientContext.Provider value={{ patient, addPatient }}>
      {children}
    </PatientContext.Provider>
  );
}

function usePatient() {
  const context = useContext(PatientContext);
  return context;
}

export { usePatient, PatientProvider };
