import React from 'react';
import {
  Grid,
  FormGroup,
  FormLabel,
  Typography,
  TextField,
  Card,
  IconButton,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import { Field, useFormikContext } from 'formik';
import useStyles from './styles';

const DefaultForm = ({ index, remove, complicationData }) => {
  const classes = useStyles();

  const { values, handleChange, errors, touched } = useFormikContext();

  return (
    <Grid className={classes.root} component={Card} item>
      <FormLabel className={classes.formLabel}>
        <Typography variant="h3">
          {complicationData && complicationData.tipo_complicacao_descricao
            ? complicationData.tipo_complicacao_descricao
            : ''}
        </Typography>
        <IconButton aria-label="delete" onClick={() => remove(index)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </FormLabel>
      <Grid className={classes.fieldFormDefaultFlex} item sm={12}>
        <FormGroup className={classes.defaultFormGroup}>
          <FormLabel>
            <Typography variant="h4">Ocorrência</Typography>
            <Typography
              variant="p"
              className={classes.defaultFormLabelSubtitle}>
              Data
            </Typography>
          </FormLabel>
          <Field
            InputLabelProps={{
              shrink: true,
            }}
            as={TextField}
            className={classes.dateField}
            name={`newsComplicacoes[${index}].data`}
            onChange={handleChange}
            value={values.newsComplicacoes[index].data}
            type="date"
            error={
              errors.newsComplicacoes && touched.newsComplicacoes
                ? !!errors.newsComplicacoes[index]?.data
                : false
            }
            helperText={
              errors.newsComplicacoes &&
              touched.newsComplicacoes &&
              errors.newsComplicacoes[index]?.data
                ? errors.newsComplicacoes[index]?.data
                : ''
            }
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default DefaultForm;
