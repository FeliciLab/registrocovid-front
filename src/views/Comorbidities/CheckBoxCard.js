import React, { useState } from 'react';

import {
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

const CheckBox = ({ label }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckBoxClick = () => {
    setChecked(prevState => !prevState);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          inputProps={checked ? 'aria-label' : 'primary checkbox'}
          onChange={handleCheckBoxClick}
        />
      }
      label={label}
    />
  );
}

export default CheckBox;