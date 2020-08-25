import React from 'react';

import { Extubacao } from './Extubacao';
import { Pneumotorax } from './Pneumotorax';

const Complications = (props) => {
  const { newComplication, isNew, visible } = props;

  switch (newComplication) {
    case 1:
      return (
        <Extubacao
          isNew={isNew}
          visible={visible}
        />
      );
    case 2:
      return (
        <Pneumotorax
          isNew={isNew}
          visible={visible}
        />
      );
    default:
      break;
  }
};

export default Complications;
