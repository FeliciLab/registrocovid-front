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
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles';

const TestComplementaryItem = ({ teste }) => {
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
            Teste Complementar
          </Typography>
          <Typography variant="caption">
            Data da coleta:{' '}
            {teste.data
              .split('-')
              .reverse()
              .join('/')}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {/* resultado */}
        <Grid
          item
          sm={6}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Resultado</Typography>
            </FormLabel>
            <TextField
              as={TextField}
              className={classes.textField}
              label="Resultado"
              type="text"
              value={teste.resultado}
              variant="outlined"
            />
          </FormGroup>
        </Grid>

        {/* data */}
        <Grid
          item
          sm={6}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Data</Typography>
            </FormLabel>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              contentEditable={false}
              label="Data da coleta do teste rápido"
              type="date"
              value={teste.data}
            />
          </FormGroup>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

TestComplementaryItem.propTypes = {
  teste: PropTypes.exact({
    tipo_outro_exame_id: PropTypes.number,
    data: PropTypes.string,
    resultado: PropTypes.string,
  }).isRequired,
};

export default TestComplementaryItem;
