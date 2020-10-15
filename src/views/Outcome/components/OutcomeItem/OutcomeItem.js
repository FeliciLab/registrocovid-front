import React, { memo, useCallback, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  FormGroup,
  TextField,
  FormLabel,
  Switch,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import useStyles from './styles';
import useSeeds from 'hooks/seeds';
import { useToast } from 'hooks/toast';

const OutcomeItem = props => {
  const { desfecho } = props;

  const { getTiposCuidadoPaliativo, getTiposAutoCuidados } = useSeeds();

  const [tiposCuiPale, setTiposCuiPale] = useState([]);

  const [tiposAutoCuidados, setTiposAutoCuidados] = useState([]);

  const { addToast } = useToast();

  const handleTiposCuiPale = useCallback(async () => {
    await getTiposCuidadoPaliativo().then(response => {
      setTiposCuiPale(response.data);
    });
  }, [getTiposCuidadoPaliativo]);

  const handleTiposAutoCuidados = useCallback(async () => {
    await getTiposAutoCuidados().then(response => {
      setTiposAutoCuidados(response.data);
    });
  }, [getTiposAutoCuidados]);

  useEffect(() => {
    try {
      handleTiposCuiPale();
      handleTiposAutoCuidados();
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message,
      });
    }
  }, [handleTiposCuiPale, handleTiposAutoCuidados, addToast]);

  const classes = useStyles();

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
            {desfecho.tipo_desfecho.descricao}
          </Typography>
          <Typography variant="caption">
            Data:{' '}
            {desfecho.data
              .split('-')
              .reverse()
              .join('/')}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {/* Óbito */}
        {desfecho.tipo_desfecho.id === 3 && (
          <>
            {/* data */}
            <Grid
              className={classes.fieldDescricao}
              item
              sm={12}
            >
              <FormGroup>
                <FormLabel>
                  <Typography variant="h5">Data de óbito</Typography>
                </FormLabel>
                <TextField
                  className={classes.field}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="date"
                  value={desfecho.data}
                  variant="outlined"
                />
              </FormGroup>
            </Grid>

            {/* obito_menos_24h */}
            <Grid
              className={classes.fieldWraper}
              item
              sm={12}
            >
              <FormLabel>
                <Typography variant="h5">
                  O óbito ocorreu em menos de 24h após a data da internação hospitalar?
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={desfecho.obito_menos_24h}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="h6">
                      {desfecho.obito_menos_24h ? 'Sim' : 'Não'}
                    </Typography>
                  }
                  name="suporte_respiratorio"
                />
              </FormLabel>
            </Grid>

            {/* obito_em_vm */}
            <Grid
              className={classes.fieldWraper}
              item
              sm={12}
            >
              <FormLabel>
                <Typography variant="h5">
                  O paciente estava em ventilação mecânica invasiva na ocasião do óbito?
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={desfecho.obito_em_vm}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="h6">
                      {desfecho.obito_em_vm ? 'Sim' : 'Não'}
                    </Typography>
                  }
                  name="suporte_respiratorio"
                />
              </FormLabel>
            </Grid>

            {/* obito_em_uti */}
            <Grid
              className={classes.fieldWraper}
              item
              sm={12}
            >
              <FormLabel>
                <Typography variant="h5">
                  O paciente estava na Unidade de Terapia Intensiva (UTI) na ocasião do óbito?
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={desfecho.obito_em_uti}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="h6">
                      {desfecho.obito_em_uti ? 'Sim' : 'Não'}
                    </Typography>
                  }
                  name="suporte_respiratorio"
                />
              </FormLabel>
            </Grid>

            {/* causa_obito */}
            <Grid
              className={classes.fieldDescricao}
              item
              sm={12}
            >
              <FormGroup>
                <FormLabel>
                  <Typography variant="h5">Causa do óbito</Typography>
                </FormLabel>
                <TextField
                  className={classes.field}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="text"
                  value={desfecho.causa_obito}
                  variant="outlined"
                />
              </FormGroup>
            </Grid>
          </>
        )}
        {/* Transferência para outro serviço */}
        {desfecho.tipo_desfecho.id === 2 && (
          <>
            {/* data */}
            <Grid
              className={classes.fieldDescricao}
              item
              sm={12}
            >
              <FormGroup>
                <FormLabel>
                  <Typography variant="h5">
                    Data de transferência para outro serviço
                  </Typography>
                </FormLabel>
                <TextField
                  className={classes.field}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="date"
                  value={desfecho.data}
                  variant="outlined"
                />
              </FormGroup>
            </Grid>

            {/* instituicao_transferencia.nome */}
            <Grid
              className={classes.fieldDescricao}
              item
              sm={12}
            >
              <FormGroup>
                <FormLabel>
                  <Typography variant="h5">
                    Em caso afirmativo para transferência para outro serviço,
                    para onde?
                  </Typography>
                </FormLabel>
                <TextField
                  className={classes.field}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="text"
                  value={desfecho.instituicao_transferencia?.nome}
                  variant="outlined"
                />
              </FormGroup>
            </Grid>
          </>
        )}
        {/* Alta hospitalar */}
        {desfecho.tipo_desfecho.id === 1 && (
          <>
            {/* data */}
            <Grid
              className={classes.fieldDescricao}
              item
              sm={12}
            >
              <FormGroup>
                <FormLabel>
                  <Typography variant="h5">
                    Data de transferência para outro serviço
                  </Typography>
                </FormLabel>
                <TextField
                  className={classes.field}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="date"
                  value={desfecho.data}
                  variant="outlined"
                />
              </FormGroup>
            </Grid>

            {/* tipo_autocuidado.descricao */}
            <Grid
              className={classes.fieldDescricao}
              item
              sm={12}
            >
              <FormGroup>
                <FormLabel>
                  <Typography variant="h5">
                    Habilidade de auto-cuidado no momento da alta comparado a
                    antes da doença:
                  </Typography>
                </FormLabel>
                <RadioGroup
                  className={classes.field}
                  row
                  value={desfecho.tipo_autocuidado?.id.toString()}
                >
                  {tiposAutoCuidados.map(tipo => (
                    <FormControlLabel
                      control={<Radio />}
                      key={tipo.id}
                      label={tipo.descricao}
                      value={tipo.id.toString()}
                    />
                  ))}
                </RadioGroup>
              </FormGroup>
            </Grid>
          </>
        )}
        {/* tipo_cuidado_paliativo.descricao */}
        <Grid
          className={classes.fieldDescricao}
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h5">
                Paciente sob cuidados paliativos (CP)?
              </Typography>
            </FormLabel>
            <RadioGroup
              className={classes.field}
              row
              value={desfecho.tipo_cuidado_paliativo?.id.toString() || ''}
            >
              {tiposCuiPale.map(tipo => (
                <FormControlLabel
                  control={<Radio />}
                  key={tipo.id}
                  label={tipo.descricao}
                  value={tipo.id.toString()}
                />
              ))}
            </RadioGroup>
          </FormGroup>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

OutcomeItem.propTypes = {
  desfecho: PropTypes.exact({
    id: PropTypes.number,
    tipo_desfecho: PropTypes.exact({
      id: PropTypes.number,
      descricao: PropTypes.string,
    }),
    tipo_autocuidado: PropTypes.exact({
      id: PropTypes.number,
      descricao: PropTypes.string,
    }),
    data: PropTypes.string,
    instituicao_transferencia: PropTypes.exact({
      id: PropTypes.number,
      nome: PropTypes.string,
    }),
    tipo_cuidado_paliativo: PropTypes.exact({
      id: PropTypes.number,
      descricao: PropTypes.string,
    }),
    causa_obito: PropTypes.string,
    obito_menos_24h: PropTypes.bool,
    obito_em_vm: PropTypes.bool,
    obito_em_uti: PropTypes.bool,
  }),
};

export default memo(OutcomeItem);
