import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useToast } from 'hooks/toast';
import PropTypes from 'prop-types';

/**
 * Componente usado para mostrar um Toast no casso de campos faltantes de um
 * formulário do Formik
 */
function FormikErroObserver() {
  const { isValid, isValidating, isSubmitting } = useFormikContext();

  const { addToast } = useToast();

  useEffect(() => {
    if (isSubmitting & isValidating && !isValid)
      addToast({
        type: 'error',
        message: 'Existem campos obrigatórios não preenchidos',
      });
  }, [isValidating, addToast, isSubmitting, isValid]);

  return null;
}

FormikErroObserver.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  isValidating: PropTypes.bool.isRequired,
};

export default FormikErroObserver;
