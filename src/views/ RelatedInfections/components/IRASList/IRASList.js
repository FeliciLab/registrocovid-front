import React from 'react';
import useStyles from './styles';

import PropTypes from 'prop-types';

import { Grid, Card } from '@material-ui/core';
import { useFormikContext, FieldArray } from 'formik';
import IRASForm from '../IRASForm';
import IRASItem from '../IRASItem/IRASItem';

function IRASList({ irasList }) {
  const classes = useStyles();

  const { values } = useFormikContext();

  return (
    <div className={classes.root}>
      <Grid
        component={Card}
        item
      >
        {/* TODO: fazer o IRASItem */}
        {irasList.map((iras, index) => (
          <IRASItem
            iras={iras}
            key={index}
          />
        ))}

        <FieldArray name="newIRASs">
          {({ remove }) => (
            <div>
              {values.newIRASs &&
                values.newIRASs.length > 0 &&
                values.newIRASs
                  .map((iras, index) => (
                    <IRASForm
                      index={index}
                      key={index}
                      label={iras.labelForm}
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
}

IRASList.propTypes = {
  irasList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      data: PropTypes.string.isRequired,
      descricao: PropTypes.string.isRequired,
      tipo_exame_id: PropTypes.number.isRequired,
      tipo_iras_descricao: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default IRASList;
