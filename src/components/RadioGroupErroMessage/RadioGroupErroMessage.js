import React from 'react';
import { FormLabel, Typography } from '@material-ui/core';

const RadioGroupErroMessage = ({message}) => {
  return (
    <FormLabel>
      <Typography
        color="error"
        variant="caption"
      >
        {message}
      </Typography>
    </FormLabel>
  );
}

export default RadioGroupErroMessage;
