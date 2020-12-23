import { FormControlLabel, Typography } from '@material-ui/core';
// import { makeStyles } from '@material-ui/styles';
import { Field } from 'formik';
import { Switch } from 'formik-material-ui';
import React from 'react';

// const useStyles = makeStyles(theme => ({
//   formLabel: {
//     paddingBottom: theme.spacing(1),
//   },
// }));

function GenericSwitchField(props) {
  const { label, name, ...rest } = props;

  // const classes = useStyles();

  return (
    <FormControlLabel
      control={
        <Field
          color="primary"
          component={Switch}
          name={name}
          type="checkbox"
        />
      }
      label={
        <Typography variant="h4">{label}</Typography>
      }
    />
  );
}

export default GenericSwitchField;
