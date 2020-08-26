import React, { memo } from 'react';
import useStyles from './styles';

import PropTypes from 'prop-types';

import { Card, Grid } from '@material-ui/core';
import TestComplementatyItem from '../TestComplementatyItem';
//import { useFormikContext, FieldArray } from 'formik';

const TestComplementaryList = ({ testes }) => {
  const classes = useStyles();

  // const { values } = useFormikContext();

  return (
    <div className={classes.root}>
      <Grid
        component={Card}
        item
        md={10}
        xs={12}
      >

        {testes.map((teste, index) => (
          <TestComplementatyItem
            key={index}
            teste={teste}
          />
        ))}


        {/* TODO: ainda não usando isso
        <FieldArray name="newsTestsRapidos">
          {({ remove }) => (
            <div>
              {values.newsTestsRapidos &&
                values.newsTestsRapidos.length > 0 &&
                values.newsTestsRapidos.map((teste, index) => (
                  <TesteRapidoForm
                    index={index}
                    key={index}
                    remove={remove}
                  />
                )).reverse()}
            </div>
          )}
        </FieldArray>
        */}

      </Grid>
    </div>
  );
};

TestComplementaryList.propTypes = {
  className: PropTypes.string,
  testes: PropTypes.arrayOf(
    PropTypes.exact({
      tipo_outro_exame_id: PropTypes.number,
      data: PropTypes.string,
      resultado: PropTypes.string,
    }),
  ).isRequired,
};

export default memo(TestComplementaryList);
