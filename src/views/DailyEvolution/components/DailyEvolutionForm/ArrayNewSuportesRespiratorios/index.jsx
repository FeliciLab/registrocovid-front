/* eslint-disable no-unused-vars */
import { FieldArray, useFormikContext } from 'formik';
import React, { memo } from 'react';
import NewRespiratorySuportForm from '../NewRespiratorySuportForm';
import useStyles from './styles';

const NAME = 'newSuportesRespitatorios';

const getDescricao = (tiposSuporte, tipoSuporteId) => {
  return (
    tiposSuporte.filter(tipo => tipo.id === tipoSuporteId)[0].nome ||
    'Não definido'
  );
};

function ArrayNewSuportesRespiratorios(props) {
  const { tipos } = props;

  const classes = useStyles();

  const { values } = useFormikContext();

  if (!values[NAME]) return null;

  return (
    <FieldArray name={NAME}>
      {({ remove }) => (
        <div className={classes.root}>
          {values[NAME] &&
            values[NAME].map((elem, index) => (
              <NewRespiratorySuportForm
                descricao={getDescricao(tipos, elem.tipo_suporte_id)}
                index={index}
                key={index}
                name={NAME}
                remove={remove}
                tipo={elem.tipo_suporte_id}
              />
            )).reverse()}
        </div>
      )}
    </FieldArray>
  );
}

export default memo(ArrayNewSuportesRespiratorios);
