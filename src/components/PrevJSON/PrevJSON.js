import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';

// Component para auxiliar na visualização de valores que vem do Backend
const PrevJSON = props => {
  const { data, name, ...rest } = props;

  return (
    <pre {...rest}>
      <Typography variant="overline">{name}:</Typography>
      {JSON.stringify(data, null, 4)}
    </pre>
  );
};

PrevJSON.propTypes = {
  data: PropTypes.any.isRequired, //  O que vai ser apresentado no formato JSON
  name: PropTypes.string.isRequired, // Nome de apresentação
};

export default memo(PrevJSON);
