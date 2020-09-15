import React from 'react';

import { Mascara } from './Mascara';
import { Cateter } from './Cateter';
import { Canula } from './Canula';
import { Ventilacao } from './Ventilacao';
import { Tubo } from './Tubo';
import { Traqueostomia } from './Traqueostomia';
import { Pronacao } from './Pronacao';
import { Desmame } from './Desmame';

const Records = (props) => {
  const {
    id,
    newRecord,
    isNew,
    visible,
    handleDelete,
    infos,
  } = props;

  switch (newRecord) {
    case 1:
      return (
        <Mascara
          handleDelete={handleDelete}
          id={id}
          infos={infos}
          isNew={isNew}
          visible={visible}
        />
      );
    case 2:
      return (
        <Cateter
          handleDelete={handleDelete}
          id={id}
          infos={infos}
          isNew={isNew}
          visible={visible}
        />
      );
    case 3:
      return (
        <Ventilacao
          handleDelete={handleDelete}
          id={id}
          infos={infos}
          isNew={isNew}
          visible={visible}
        />

      );
    case 4:
      return (
        <Tubo
          handleDelete={handleDelete}
          id={id}
          infos={infos}
          isNew={isNew}
          visible={visible}
        />
      );
    case 5:
      return (
        <Traqueostomia
          handleDelete={handleDelete}
          id={id}
          infos={infos}
          isNew={isNew}
          visible={visible}
        />
      );
    case 6:
      return (
        <Canula
          handleDelete={handleDelete}
          id={id}
          infos={infos}
          isNew={isNew}
          visible={visible}
        />
      );
    case 7:
      return (
        <Pronacao
          handleDelete={handleDelete}
          id={id}
          infos={infos}
          isNew={isNew}
          visible={visible}
        />
      );
    case 8:
      return (
        <Desmame
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

export default Records;
