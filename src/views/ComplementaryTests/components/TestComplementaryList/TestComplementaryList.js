import React, { memo } from 'react';
import useStyles from './styles';

import PropTypes from 'prop-types';

import { Card, Grid } from '@material-ui/core';
import TestComplementatyItem from '../TestComplementatyItem';
import { useFormikContext, FieldArray } from 'formik';
import TestComplementaryForm from '../TestComplementaryForm';

const TestComplementaryList = ({ testes, descricao }) => {
  const classes = useStyles();

  const { values } = useFormikContext();

  return (
    <div className={classes.root}>
      <Grid
        component={Card}
        item
        md={10}
        xs={12}
      >
        {testes &&
          testes.map((teste, index) => (
            <TestComplementatyItem
              descricao={descricao}
              key={index}
              teste={teste}
            />
          ))}

        <FieldArray name="newComplementaryTests">
          {({ remove }) => (
            <div>
              {values.newComplementaryTests &&
                values.newComplementaryTests.length > 0 &&
                values.newComplementaryTests
                  .filter(teste => teste.descricao === descricao)
                  .map((teste, index) => (
                    <TestComplementaryForm
                      descricao={descricao}
                      index={values.newComplementaryTests.indexOf(teste)}
                      key={index}
                      remove={remove}
                    />
                  ))
                  .reverse()}
            </div>
          )}
        </FieldArray>
      </Grid>
    </div>
  );
};

TestComplementaryList.propTypes = {
  className: PropTypes.string,
  descricao: PropTypes.string.isRequired,
  testes: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      tipo_exame_id: PropTypes.number,
      data: PropTypes.string,
      resultado: PropTypes.string,
      descricao: PropTypes.string,
    }),
  ),
};

export default memo(TestComplementaryList);
