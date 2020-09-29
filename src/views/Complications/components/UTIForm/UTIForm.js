import React, { useState } from 'react';
import {
  Grid,
  FormGroup,
  FormLabel,
  Typography,
  TextField,
  Card,
  IconButton,
  MenuItem,
  Switch,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import { Field, useFormikContext, ErrorMessage } from 'formik';
import useStyles from './styles';

const UTIForm = ({ index, remove }) => {
  const classes = useStyles();

  const { values, handleChange, errors, touched } = useFormikContext();
  const [isChecked, setIsChecked] = useState(false);
  const handleChangeSwitch = e => {
    setIsChecked(!isChecked);
    handleChange(e);
  };

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
    >
      <div className={classes.formLabel}>
        <Typography variant="h3">Admissão na Unidade de Terapia Intensiva (UTI)</Typography>
        <IconButton
          aria-label="delete"
          onClick={() => remove(index)}
        >
          <DeleteIcon
            fontSize="small"
            
          />
        </IconButton>
      </div>

      <Grid
        className={classes.fieldFormUTI}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel className={classes.selectFieldLabel}>
            <Typography variant="h4"> Escala de Glasgow</Typography>
          </FormLabel>

          <ErrorMessage
            color="error"
            component={Typography}
            name={`newsComplicacoes.${index}.glasgow_admissao_uti`}
            variant="caption"
          />

          <Field
            as={TextField}
            className={classes.textField}
            name={`newsComplicacoes.${index}.glasgow_admissao_uti`}
            onChange={handleChange}
            select
            type="text"
            value={values.newsComplicacoes[index].glasgow_admissao_uti}
            variant="outlined"
          >
            {new Array(13).fill('').map((_, index) => (
              <MenuItem
                key={String(Math.random())}
                value={3 + index}
              >
                {3 + index}
              </MenuItem>
            ))}
          </Field>
        </FormGroup>
      </Grid>
      <Grid
        className={classes.fieldFormUTIFlex}
        item
        sm={12}
      >
        <Grid
          item
          sm={6}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Admissão em UTI</Typography>

              <Typography
                className={classes.UTIFormLabelSubtitle}
                variant="body1"
              >
                Data
              </Typography>
            </FormLabel>
            <Field
              InputLabelProps={{
                shrink: true,
              }}
              as={TextField}
              className={classes.dateField}
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
              name={`newsComplicacoes[${index}].data`}
              onChange={handleChange}
              type="date"
            />
          </FormGroup>
        </Grid>
        <Grid
          item
          sm={6}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Saída de UTI</Typography>

              <Typography
                className={classes.UTIFormLabelSubtitle}
                variant="body1"
              >
                Data
              </Typography>
            </FormLabel>
            <Field
              InputLabelProps={{
                shrink: true,
              }}
              as={TextField}
              className={classes.dateField}
              error={
                errors.newsComplicacoes && touched.newsComplicacoes
                  ? !!errors.newsComplicacoes[index]?.data_termino
                  : false
              }
              helperText={
                errors.newsComplicacoes &&
                touched.newsComplicacoes &&
                errors.newsComplicacoes[index]?.data_termino
                  ? errors.newsComplicacoes[index]?.data_termino
                  : ''
              }
              name={`newsComplicacoes[${index}].data_termino`}
              onChange={handleChange}
              type="date"
              value={values.newsComplicacoes[index].data_termino}
            />
          </FormGroup>
        </Grid>
      </Grid>

      <Grid
        className={classes.fieldFormUTI}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">
              Paciente permaneceu menos de 24h na UTI?
            </Typography>
          </FormLabel>

          <Field
            as={Switch}
            checked={isChecked}
            color="primary"
            name={`newsComplicacoes.${index}.menos_24h_uti`}
            onChange={e => handleChangeSwitch(e)}
            value={values.newsComplicacoes[index].menos_24h_uti}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default UTIForm;
