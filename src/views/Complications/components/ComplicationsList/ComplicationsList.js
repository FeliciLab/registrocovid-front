import React, { memo } from 'react';
import { Card, Grid } from '@material-ui/core';
import useStyles from './styles';
import PropTypes from 'prop-types';
import UTIItem from '../UTIItem';
import UTIForm from '../UTIForm';
import NeurologicItem from '../NeurologicItem';
import DefaultItem from '../DefaultItem';
import { useFormikContext, FieldArray } from 'formik';

const ComplicationsList = ({ complicacoes }) => {
  const classes = useStyles();

  const { values } = useFormikContext();

  return (
    <div className={classes.root}>
      <Grid component={Card} item xs={10}>
        <FieldArray name="newsComplicacoes">
          {({ remove }) => (
            <div>
              {values.newsComplicacoes &&
                values.newsComplicacoes.length > 0 &&
                values.newsComplicacoes.map((complicacao, index) => {
                  if (complicacao.tipo_complicacao == 1) {
                    return <UTIForm key={index} remove={remove} />;
                  } else if (complicacao.tipo_complicacao == 13) {
                    return <NeurologicItem key={index} remove={remove} />;
                  } else {
                    return <DefaultItem key={index} remove={remove} />;
                  }
                })}
            </div>
          )}
        </FieldArray>
        {complicacoes.map((complicacao, index) => {
          if (complicacao.tipo_complicacao.id == 1) {
            return <UTIItem key={index} complicationData={complicacao} />;
          } else if (complicacao.tipo_complicacao.id == 13) {
            return (
              <NeurologicItem key={index} complicationData={complicacao} />
            );
          } else {
            return <DefaultItem key={index} complicationData={complicacao} />;
          }
        })}
      </Grid>
    </div>
  );
};

export default ComplicationsList;
