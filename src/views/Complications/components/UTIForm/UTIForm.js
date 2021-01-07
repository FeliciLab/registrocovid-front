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
import GenericNumberField from 'components/Forms/GenericNumberField';
import GenericDateField from 'components/Forms/GenericDateField';

const UTIForm = ({ index, remove }) => {
  const classes = useStyles();

  const { values, handleChange } = useFormikContext();
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
        <Typography variant="h3">
          Admissão na Unidade de Terapia Intensiva (UTI)
        </Typography>
        <IconButton
          aria-label="delete"
          onClick={() => remove(index)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>

      <Grid
        className={classes.fieldFormUTI}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel className={classes.selectFieldLabel}>
            <Typography variant="h4">Escala de Glasgow</Typography>
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
        container
        item
        sm={12}
        spacing={2}
      >
        <Grid
          item
          sm={6}
        >
          <GenericDateField
            label="Data"
            name={`newsComplicacoes[${index}].data`}
            title="Admissão em UTI"
          />
        </Grid>
        <Grid
          item
          sm={6}
        >
          <GenericDateField
            label="Data"
            name={`newsComplicacoes[${index}].data_termino`}
            title="Saída de UTI"
          />
        </Grid>
      </Grid>

      <Grid
        container
        item
        spacing={2}
      >
        <Grid
          className={classes.fieldFormUTI}
          item
          sm={3}
        >
          <GenericNumberField
            label="ph"
            name={`newsComplicacoes[${index}].ph`}
            title="ph"
          />
        </Grid>
        <Grid
          className={classes.fieldFormUTI}
          item
          sm={3}
        >
          <GenericNumberField
            endAdornment="mmHg"
            label="pao2"
            name={`newsComplicacoes[${index}].pao2`}
            title="pao2"
          />
        </Grid>
        <Grid
          className={classes.fieldFormUTI}
          item
          sm={3}
        >
          <GenericNumberField
            endAdornment="mmHg"
            label="ph"
            name={`newsComplicacoes[${index}].paco2`}
            title="ph"
          />
        </Grid>
        <Grid
          className={classes.fieldFormUTI}
          item
          sm={3}
        >
          <GenericNumberField
            endAdornment="mEq/L"
            label="HCO3"
            name={`newsComplicacoes[${index}].hco3`}
            title="HCO3"
          />
        </Grid>
        <Grid
          className={classes.fieldFormUTI}
          item
          sm={3}
        >
          <GenericNumberField
            endAdornment="mEq/L"
            label="BE"
            name={`newsComplicacoes[${index}].be`}
            title="BE"
          />
        </Grid>
        <Grid
          className={classes.fieldFormUTI}
          item
          sm={3}
        >
          <GenericNumberField
            endAdornment="%"
            label="sao2"
            name={`newsComplicacoes[${index}].sao2`}
            title="sao2"
          />
        </Grid>
        <Grid
          className={classes.fieldFormUTI}
          item
          sm={3}
        >
          <GenericNumberField
            endAdornment="mmol/L"
            label="Lactato"
            name={`newsComplicacoes[${index}].lactato`}
            title="Lactato"
          />
        </Grid>
        <Grid
          className={classes.fieldFormUTI}
          item
          sm={12}
        >
          <GenericNumberField
            endAdornment="mmol/L"
            name={`newsComplicacoes[${index}].lactato`}
            title="Débito urinário nas primeiras 24 horas da admissão da UTI"
          />
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
