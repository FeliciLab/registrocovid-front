import React, { useState } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useComorbidade } from 'context/ComorbidadesContex';

const CheckBox = ({ label, id }) => {
  const { handleComorbidade } = useComorbidade();
  const [checked, setChecked] = useState(false);

  const handleCheckBoxClick = () => {
    setChecked(prevState => !prevState);
    handleComorbidade(id);
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
};

export default CheckBox;
