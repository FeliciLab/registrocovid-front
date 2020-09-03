import React, { memo } from 'react';

import PropTypes from 'prop-types';

function IRASItem({ iras }) {
  return <div>{iras.toString()}</div>;
}

IRASItem.propTypes = {
  iras: PropTypes.exact({
    id: PropTypes.number.isRequired,
    data: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    tipo_exame_id: PropTypes.number.isRequired,
    tipo_iras_descricao: PropTypes.string.isRequired,
  }),
};

export default memo(IRASItem);
