import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  FormGroup,
  FormLabel,
  Typography,
  FormControlLabel,
  Radio,
  Card,
  IconButton,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import {
  Field,
  ErrorMessage
} from 'formik';
import useStyles from './styles';
import api from 'services/api';
import { RadioGroup, TextField } from 'formik-material-ui';

const TesteRTPCRForm = props => {
  const classes = useStyles();

  const { index, remove } = props;

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
      <div className={classes.formLabel}>
        <Typography variant="h3">Formulário do Teste RT-PCR</Typography>
        <IconButton
          aria-label="delete"
          onClick={() => remove(index)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>

      {/* data_coleta */}
      <Grid
        className={classes.fieldTesteRTPCR}
        item
        sm={12}
      >
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Data de coleta RT-PCR</Typography>
          </FormLabel>
          <Field
            className={classes.dateField}
            component={TextField}
            name={`newsTestes.${index}.data_coleta`}
            type="date"
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
            <Typography variant="h4">Sítio da amostra RT-PCR</Typography>
          </FormLabel>
          <ErrorMessage
            color="error"
            component={Typography}
            name={`newsTestes.${index}.sitio_tipo`}
            variant="caption"
          />
          <Field
            className={classes.radioGroup}
            component={RadioGroup}
            name={`newsTestes.${index}.sitio_tipo`}
            row
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
            <Typography variant="h4">Data do resultado RT-PCR</Typography>
          </FormLabel>
          <Field
            className={classes.dateField}
            component={TextField}
            name={`newsTestes[${index}].data_resultado`}
            type="date"
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
            <Typography variant="h4">Resultado RT-PCR</Typography>
          </FormLabel>
          <Field
            className={classes.radioGroup}
            component={RadioGroup}
            name={`newsTestes[${index}].rt_pcr_resultado`}
            row
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
