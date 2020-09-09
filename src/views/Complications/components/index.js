import React from 'react';

import { Extubacao } from './Extubacao';
import { Hemorragia } from './Hemorragia';
import { Pneumotorax } from './Pneumotorax';
import { Transfusional } from './Transfusional';
import { Outras } from './Outras';

const Complications = props => {
  const { id, newComplication, isNew, visible, handleDelete, infos } = props;

  switch (newComplication) {
    case 1:
      return (
        <Pneumotorax
          handleDelete={handleDelete}
          id={id}
          infos={infos}
          isNew={isNew}
          visible={visible}
        />
      );
    case 2:
      return (
        <Extubacao
          handleDelete={handleDelete}
          id={id}
          infos={infos}
          isNew={isNew}
          visible={visible}
        />
      );
    case 3:
      return (
        <Hemorragia
          handleDelete={handleDelete}
          id={id}
          infos={infos}
          isNew={isNew}
          visible={visible}
        />
      );
    case 4:
      return (
        <Transfusional
          handleDelete={handleDelete}
          id={id}
          infos={infos}
          isNew={isNew}
          visible={visible}
        />
      );
    case 5:
      return (
        <Outras
          handleDelete={handleDelete}
          id={id}
          infos={infos}
          isNew={isNew}
          visible={visible}
        />
      );
    default:
      break;
  }
};

export default Complications;
