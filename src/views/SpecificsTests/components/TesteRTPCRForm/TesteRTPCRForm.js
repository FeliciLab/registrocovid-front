import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  FormGroup,
  FormLabel,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Card,
  IconButton,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import { Field, useFormikContext } from 'formik';
import useStyles from './styles';
import api from 'services/api';
import { RadioGroupErroMessage } from 'components';

const TesteRTPCRForm = props => {
  const classes = useStyles();

  const { index } = props;

  const {
    values,
    handleChange,
    setFieldValue,
    errors,
    touched,
  } = useFormikContext();

  const [sitiosRTPCR, setSitiosRTPCR] = useState([]);
  const [tiposResultadosRTPCR, setTiposResultadosRTPCR] = useState([]);

  // busca os tipos de sitios do form.
  const handleSitiosRTPCR = useCallback(async () => {
    const response = await api.get('/sitios-rt-pcr');
    setSitiosRTPCR(sitos => [...sitos, ...response.data]);
  }, [setSitiosRTPCR]);

  // busca os tipos de sitios do form.
  const handleTiposResultadosRTPCR = useCallback(async () => {
    const response = await api.get('/pcr-resultado');
    setTiposResultadosRTPCR(tiposResultados => [
      ...tiposResultados,
      ...response.data,
    ]);
  }, [setTiposResultadosRTPCR]);

  const handleDeleteForm = () => {
    console.log('handleDeleteForm', `index: ${index}`);
    let aux = values.newsTestsRTCPRs;
    aux.splice(index, 1);
    setFieldValue('newsTestsRTCPRs', aux);
  };

  useEffect(() => {
    try {
      handleSitiosRTPCR();
      handleTiposResultadosRTPCR();
    } catch (err) {
      // TODO: tratar aqui os erros
      console.log(err);
    }
  }, [handleSitiosRTPCR, handleTiposResultadosRTPCR]);

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
    >
      <FormLabel className={classes.formLabel}>
        <Typography variant="h3">Formulário do Teste RT-PCR</Typography>
        <IconButton
          aria-label="delete"
          onClick={() => handleDeleteForm()}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </FormLabel>

      {/* data_coleta */}
      <Grid
        className={classes.fieldTesteRTPCR}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Data de coleta RT-PCR*</Typography>
          </FormLabel>
          <Field
            InputLabelProps={{
              shrink: true,
            }}
            as={TextField}
            className={classes.dateField}
            error={
              errors.newsTestsRTCPRs && touched.newsTestsRTCPRs
                ? errors.newsTestsRTCPRs[index].data_coleta
                : null
            }
            helperText={
              errors.newsTestsRTCPRs && touched.newsTestsRTCPRs
                ? errors.newsTestsRTCPRs[index].data_coleta
                : null
            }
            label="Data de coleta RT-PCR "
            name={`newsTestsRTCPRs[${index}].data_coleta`}
            onChange={handleChange}
            type="date"
            value={values.newsTestsRTCPRs[index].data_coleta}
          />
        </FormGroup>
      </Grid>

      {/* sitio_tipo */}
      <Grid
        className={classes.fieldTesteRTPCR}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Sítio da amostra RT-PCR*</Typography>
          </FormLabel>
          <Field
            as={RadioGroup}
            className={classes.radioGroup}
            name={`newsTestsRTCPRs[${index}].sitio_tipo`}
            onChange={handleChange}
            row
            value={values.newsTestsRTCPRs[index].sitio_tipo}
          >
            {sitiosRTPCR.map(({ id, descricao }) => (
              <FormControlLabel
                control={<Radio />}
                key={id}
                label={descricao}
                value={id.toString()}
              />
            ))}
          </Field>
          {/* Campo de erro */}
          {errors.newsTestsRTCPRs &&
            touched.newsTestsRTCPRs &&
            errors.newsTestsRTCPRs[index].sitio_tipo && (
            <RadioGroupErroMessage
              message={errors.newsTestsRTCPRs[index].sitio_tipo}
            />
          )}
        </FormGroup>
      </Grid>

      {/* data_resultado */}
      <Grid
        className={classes.fieldTesteRTPCR}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Data do resultado RT-PCR*</Typography>
          </FormLabel>
          <Field
            InputLabelProps={{
              shrink: true,
            }}
            as={TextField}
            className={classes.dateField}
            label="Data do resultado RT-PCR"
            name={`newsTestsRTCPRs[${index}].data_resultado`}
            onChange={handleChange}
            type="date"
            value={values.newsTestsRTCPRs[index].data_resultado}
          />
        </FormGroup>
      </Grid>

      {/* rt_pcr_resultado */}
      <Grid
        className={classes.fieldTesteRTPCR}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Resultado RT-PCR </Typography>
          </FormLabel>
          <Field
            as={RadioGroup}
            className={classes.radioGroup}
            name={`newsTestsRTCPRs[${index}].rt_pcr_resultado`}
            onChange={handleChange}
            row
            value={values.newsTestsRTCPRs[index].rt_pcr_resultado}
          >
            {tiposResultadosRTPCR.map(({ id, descricao }) => (
              <FormControlLabel
                control={<Radio />}
                key={id}
                label={descricao}
                value={id.toString()}
              />
            ))}
          </Field>
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default TesteRTPCRForm;
