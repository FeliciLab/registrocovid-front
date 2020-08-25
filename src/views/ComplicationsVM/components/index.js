import React from 'react';

import { Extubacao } from './Extubacao';
import { Hemorragia } from './Hemorragia';
import { Pneumotorax } from './Pneumotorax';
import { Transfusional } from './Transfusional';
import { Outras } from './Outras';

const Complications = (props) => {
  const { newComplication, isNew, visible, handleDelete } = props;

  switch (newComplication.complication) {
    case 1:
      return (
        <Extubacao
          handleDelete={handleDelete}
          id={newComplication.id}
          isNew={isNew}
          visible={visible}
        />
      );
    case 2:
      return (
        <Pneumotorax
          handleDelete={handleDelete}
          id={newComplication.id}
          isNew={isNew}
          visible={visible}
        />
      );
    case 3:
      return (
        <Hemorragia
          handleDelete={handleDelete}
          id={newComplication.id}
          isNew={isNew}
          visible={visible}
        />
      );
    case 4:
      return (
        <Transfusional
          handleDelete={handleDelete}
          id={newComplication.id}
          isNew={isNew}
          visible={visible}
        />
      );
    case 5:
      return (
        <Outras
          handleDelete={handleDelete}
          id={newComplication.id}
          isNew={isNew}
          visible={visible}
        />
      );
    default:
      break;
  }
};

export default Complications;
