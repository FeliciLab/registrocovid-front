import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { useToast } from 'hooks/toast';

function Alert(props) {
<<<<<<< HEAD
  return <MuiAlert
    elevation={6}
    variant="filled"
    {...props}
  />;
=======
  return (
    <MuiAlert
      elevation={6}
      variant="filled"
      {...props}
    />
  );
>>>>>>> develop
}

const Toast = ({ toast }) => {
  const { open, handleClose } = useToast();

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={5000}
      onClose={handleClose}
      open={open}
    >
      <Alert
        onClose={handleClose}
        severity={toast?.type}
      >
        {toast?.message}
      </Alert>
<<<<<<< HEAD
=======

>>>>>>> develop
    </Snackbar>
  );
};

Toast.propTypes = {
  toast: PropTypes.shape({
    type: PropTypes.oneOf(['success', 'warning', 'info', 'error']).isRequired,
<<<<<<< HEAD
    message: PropTypes.string.isRequired,
=======
    message: PropTypes.string.isRequired
>>>>>>> develop
  }),
};

export default Toast;
<<<<<<< HEAD
=======

>>>>>>> develop
