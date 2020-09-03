import React, { memo } from 'react';

import PropTypes from 'prop-types';

const SelectIRASType = props => {
  const { tipos } = props;

  return <div>{tipos.toString()}</div>;
};

SelectIRASType.propTypes = {
  tipos: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      descricao: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default memo(SelectIRASType);
