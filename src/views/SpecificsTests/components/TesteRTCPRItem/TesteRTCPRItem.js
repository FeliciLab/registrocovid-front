import React, { memo, useState, useCallback, useEffect } from 'react';

import PropTypes from 'prop-types';

import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  FormGroup,
  FormLabel,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles';
import api from 'services/api';

const TesteRTPCRItem = ({ teste }) => {
  const classes = useStyles();

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
    <Accordion>
      <AccordionSummary
        aria-controls="panel1a-content"
        expandIcon={<ExpandMoreIcon />}
        id="panel1a-header"
      >
        <div className={classes.heading}>
          <Typography
            className={classes.headingLabel}
            variant="h4"
          >
            Teste RT-PCR
          </Typography>
          <Typography variant="caption">
            Data da coleta: {teste.data_coleta.split('-').reverse().join('/')}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {/* data_coleta */}
        <Grid
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Data de coleta RT-PCR</Typography>
            </FormLabel>
            <TextField
              contentEditable={false}
              type="date"
              value={teste.data_coleta}
            />
          </FormGroup>
        </Grid>

        {/* sitio_tipo */}
        <Grid
          className={classes.fieldData}
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Sítio da amostra RT-PCR</Typography>
            </FormLabel>
            <RadioGroup
              row
              value={teste.sitio_tipo}
            >
              {sitiosRTPCR.map(({ id, descricao }) => (
                <FormControlLabel
                  control={<Radio />}
                  key={id}
                  label={descricao}
                  value={descricao}
                />
              ))}
            </RadioGroup>
          </FormGroup>
        </Grid>

        {/* data_resultado */}
        <Grid
          className={classes.fieldData}
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Data de resultado RT-PCR</Typography>
            </FormLabel>
            <TextField
              contentEditable={false}
              InputLabelProps={{
                shrink: true,
              }}
              type="date"
              value={teste.data_resultado | ''}
            />
          </FormGroup>
        </Grid>

        {/* rt_pcr_resultado */}
        <Grid
          className={classes.fieldData}
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Resultado RT-PCR</Typography>
            </FormLabel>
            <RadioGroup
              row
              value={
                teste.rt_pcr_resultado
                  ? teste.rt_pcr_resultado.id.toString()
                  : ''
              }
            >
              {tiposResultadosRTPCR.map(({ id, descricao }) => (
                <FormControlLabel
                  control={<Radio />}
                  key={id}
                  label={descricao}
                  value={id.toString()}
                />
              ))}
            </RadioGroup>
          </FormGroup>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

TesteRTPCRItem.propTypes = {
  teste: PropTypes.shape({
    id: PropTypes.number,
    data_coleta: PropTypes.string,
    data_resultado: PropTypes.string,
    sitio_tipo: PropTypes.string,
    rt_pcr_resultado: PropTypes.exact({
      id: PropTypes.number,
      descricao: PropTypes.string,
    }),
  }).isRequired,
};

export default memo(TesteRTPCRItem);
