import React, { memo } from 'react';
import useStyles from './styles';

import PropTypes from 'prop-types';

import { Card, Grid } from '@material-ui/core';
import TestComplementatyItem from '../TestComplementatyItem';
import { useFormikContext, FieldArray } from 'formik';
import TestComplementaryForm from '../TestComplementaryForm';

const TestComplementaryList = ({ testes, label }) => {
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
        {testes.map((teste, index) => (
          <TestComplementatyItem
            key={index}
            label={label}
            teste={teste}
          />
        ))}

        <FieldArray name="newComplementaryTests">
          {({ remove }) => (
            <div>
              {values.newComplementaryTests &&
                values.newComplementaryTests.length > 0 &&
                values.newComplementaryTests.map((teste, index) => (
                  <TestComplementaryForm
                    index={index}
                    key={index}
                    remove={remove}
                  />
                )).reverse()}
            </div>
          )}
        </FieldArray>


      </Grid>
    </div>
  );
};

TestComplementaryList.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  testes: PropTypes.arrayOf(
    PropTypes.exact({
      tipo_outro_exame_id: PropTypes.number,
      data: PropTypes.string,
      resultado: PropTypes.string,
    }),
  ).isRequired,
};

export default memo(TestComplementaryList);
