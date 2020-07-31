import React, { createContext, useContext, useCallback, useState } from 'react';

import ToastContainer from 'components/SnackBar';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState();

  const addToast = useCallback(({ type, message }) => {
    setOpen(true);

    const toast = {
      type,
      message
    };

    setToast(toast);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ addToast, open, handleClose }}>
      {children}
      <ToastContainer toast={toast} />
    </ToastContext.Provider>
  );
};

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
