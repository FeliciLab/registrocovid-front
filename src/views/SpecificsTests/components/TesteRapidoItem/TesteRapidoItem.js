import React from 'react';

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

const TesteRapidoItem = ({ teste }) => {
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
            Teste Rápido
          </Typography>
          <Typography variant="caption">
            Data da coleta: {teste.data_realizacao.split('-').reverse().join('/')}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>

        {/* resultado */}
        <Grid
          item
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Resultado de teste rápido</Typography>
            </FormLabel>
            <RadioGroup
              contentEditable={false}
              row
              value={teste.resultado ? 'true' : 'false'}
            >
              <FormControlLabel
                control={<Radio />}
                label="Reagente"
                value="true"
              />
              <FormControlLabel
                control={<Radio />}
                label="Não reagente"
                value="false"
              />
            </RadioGroup>

          </FormGroup>
        </Grid>

        {/* data_realizacao */}
        <Grid
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Data de coleta da rápida </Typography>
            </FormLabel>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              contentEditable={false}
              label="Data da coleta do teste rápido"
              type="date"
              value={teste.data_realizacao}
            />
          </FormGroup>
        </Grid>

      </AccordionDetails>
    </Accordion>
  );
};

TesteRapidoItem.propTypes = {
  teste: PropTypes.exact({
    id: PropTypes.number,
    data_realizacao: PropTypes.string,
    resultado: PropTypes.bool,
  }).isRequired,
};

export default TesteRapidoItem;
