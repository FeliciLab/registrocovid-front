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

import { Field, useFormikContext, ErrorMessage } from 'formik';
import useStyles from './styles';
import api from 'services/api';

const TesteRTPCRForm = props => {
  const classes = useStyles();

  const { index, remove } = props;

  const { values, handleChange, errors, touched } = useFormikContext();

  const [sitiosRTPCR, setSitiosRTPCR] = useState([]);

  return (
    <Grid className={classes.root} component={Card} item>
      <FormLabel className={classes.formLabel}>
        <Typography variant="h3">UTI</Typography>
        <IconButton aria-label="delete" onClick={() => remove(index)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </FormLabel>

      {/* data_coleta */}
      <Grid className={classes.fieldTesteRTPCR} item sm={12}>
        <FormGroup>
          <FormLabel>
            <Typography variant="h4"> Escala de Glasgow</Typography>
          </FormLabel>
          {/* <Field
            InputLabelProps={{
              shrink: true,
            }}
            as={TextField}
            className={classes.dateField}
            error={
              errors.newsTestsRTCPRs && touched.newsTestsRTCPRs
                ? !!errors.newsTestsRTCPRs[index]?.data_coleta
                : false
            }
            helperText={
              errors.newsTestsRTCPRs &&
              touched.newsTestsRTCPRs &&
              errors.newsTestsRTCPRs[index]?.data_coleta
                ? errors.newsTestsRTCPRs[index]?.data_coleta
                : ''
            }
            label="Data de coleta RT-PCR "
            name={`newsTestsRTCPRs.${index}.data_coleta`}
            onChange={handleChange}
            type="date"
            value={values.newsTestsRTCPRs[index].data_coleta}
          /> */}

          <Select onChange={handleChange} type="text">
            <MenuItem value="" disabled>
              Escolher
            </MenuItem>
            {new Array(13).fill('').map((_, index) => (
              <MenuItem key={String(Math.random())} value={3 + index}>
                {3 + index}
              </MenuItem>
            ))}
          </Select>
        </FormGroup>
      </Grid>

      {/* sitio_tipo */}
      <Grid className={classes.fieldTesteRTPCR} item sm={12}>
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Sítio da amostra RT-PCR*</Typography>
          </FormLabel>
          <ErrorMessage
            color="error"
            component={Typography}
            name={`newsTestsRTCPRs.${index}.sitio_tipo`}
            variant="caption"
          />
          <Field
            as={RadioGroup}
            className={classes.radioGroup}
            name={`newsTestsRTCPRs.${index}.sitio_tipo`}
            onChange={handleChange}
            row
            value={values.newsTestsRTCPRs[index].sitio_tipo}>
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
      <Grid className={classes.fieldFormUTI} item sm={12}>
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Data do resultado RT-PCR</Typography>
          </FormLabel>
          <Field
            InputLabelProps={{
              shrink: true,
            }}
            as={TextField}
            className={classes.dateField}
            name={`newsComplicacoes[${index}].admissao_uti`}
            onChange={handleChange}
            type="date"
            value={values.newsTestsRTCPRs[index].data_resultado}
            InputLabelProps={{
              shrink: true,
            }}
            label="Data"
            type="date"
          />
        </FormGroup>
      </Grid>

      {/* rt_pcr_resultado */}
      {/* <Grid className={classes.fieldTesteRTPCR} item sm={12}>
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
            value={values.newsTestsRTCPRs[index].rt_pcr_resultado}></Field>
        </FormGroup>
      </Grid> */}
    </Grid>
  );
};

export default TesteRTPCRForm;
