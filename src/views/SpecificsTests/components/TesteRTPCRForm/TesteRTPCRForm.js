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
} from '@material-ui/core';
import { Field } from 'formik';
import useStyles from './styles';
import api from 'services/api';

const TesteRTPCRForm = () => {
  const classes = useStyles();

  const [sitiosRTPCR, setSitiosRTPCR] = useState([]);
  const [tiposResultadosRTPCR, setTiposResultadosRTPCR] = useState([]);

  // busca os tipos de sitios do form.
  const handleSitiosRTPCR = useCallback(async () => {
    const response = await api.get('/sitios-rt-pcr');
    setSitiosRTPCR(sitos => [...sitos, ...response.data]);
  }, []);

  // busca os tipos de sitios do form.
  const handleTiposResultadosRTPCR = useCallback(async () => {
    const response = await api.get('/pcr-resultado');
    setTiposResultadosRTPCR(tiposResultados => [
      ...tiposResultados,
      ...response.data,
    ]);
  }, []);

  useEffect(() => {
    try {
      handleSitiosRTPCR();
      handleTiposResultadosRTPCR();
    } catch (err) {
      // TOdO: tratar aqui os erros
      console.log(err);
    }
  }, []);

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
      sm={10}
    >
      <Typography variant="h3">Formulário do Teste RT-PCR</Typography>

      {/* Data de coleta RT-PCR */}
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
            // error={errors.data_nascimento && touched.data_nascimento}
            // helperText={
            //  errors.data_nascimento && touched.data_nascimento
            //    ? errors.data_nascimento
            //    : null
            //}
            label="Data de coleta RT-PCR "
            name="data_nascimento"
            // onChange={handleChange}
            type="date"
            // value={values.data_nascimento}
          />
        </FormGroup>
      </Grid>

      {/* Sítio da amostra RT-PCR* */}
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
            name="cor_id"
            row
            // onChange={handleChange}
            // value={values.cor_id}
          >
            {sitiosRTPCR.map(({ id, descricao }) => (
              <FormControlLabel
                control={<Radio />}
                label={descricao}
                value={id.toString()}
              />
            ))}
          </Field>
        </FormGroup>
      </Grid>

      {/* Data de coleta RT-PCR */}
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
            // error={errors.data_nascimento && touched.data_nascimento}
            // helperText={
            //  errors.data_nascimento && touched.data_nascimento
            //    ? errors.data_nascimento
            //    : null
            //}
            label="Data do resultado RT-PCR"
            name="data_nascimento"
            // onChange={handleChange}
            type="date"
            // value={values.data_nascimento}
          />
        </FormGroup>
      </Grid>
      {/* Sítio da amostra RT-PCR* */}
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
            name="cor_id"
            row
            // onChange={handleChange}
            // value={values.cor_id}
          >
            {tiposResultadosRTPCR.map(({ id, descricao }) => (
              <FormControlLabel
                control={<Radio />}
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
