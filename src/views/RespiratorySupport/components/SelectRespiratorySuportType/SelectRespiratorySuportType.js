import React, { memo } from 'react';
import PropTypes from 'prop-types';

const SelectRespiratorySuportType = props => {
  const { tipos } = props;

  return (
    <pre>
      {JSON.stringify(tipos, null, 4)}
    </pre>
  );
}

SelectRespiratorySuportType.propTypes = {
  tipos: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      nome: PropTypes.string,
    }),
  ).isRequired,
};

export default memo(SelectRespiratorySuportType);
