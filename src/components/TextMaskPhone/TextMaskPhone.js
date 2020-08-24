import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

/**
 * Componente com máscara para (99) 9999-9999 ou (99) 99999-9999.
 */
const TextMaskPhone = props => {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      guide={false}
      mask={(rawValue) => {
        return (rawValue.length <= 14) ?
          ['(', /[1-9]/, /\d/, ')', ' ', /[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] :
          ['(', /[1-9]/, /\d/, ')', ' ', /[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      }}
      placeholderChar={'_'}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      showMask
    />
  );
}

TextMaskPhone.propTypes = {
  inputRef: PropTypes.func
}

export default TextMaskPhone;
