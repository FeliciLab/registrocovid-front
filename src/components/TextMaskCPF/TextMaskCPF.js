import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

/**
 * Componente com máscara para CPF xxx.xxx.xxx-xx.
 */
const TextMaskPhone = props => {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      guide={false}
      mask={[
        /\d/,
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
      ]}
      placeholderChar={'_'}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      showMask
    />
  );
};

TextMaskPhone.propTypes = {
  inputRef: PropTypes.func,
};

export default TextMaskPhone;
