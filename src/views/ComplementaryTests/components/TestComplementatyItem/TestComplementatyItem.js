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

const TestComplementaryItem = ({ teste, descricao }) => {
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
            {descricao}
          </Typography>
          <Typography variant="caption">
            Data da:{' '}
            {teste.data
              .split('-')
              .reverse()
              .join('/')}
          </Typography>
        </div>
      </AccordionSummary>
      <Grid
        className={classes.accordionDetails}
        component={AccordionDetails}
        container
        spacing={1}
      >
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
              className={classes.field}
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
              className={classes.field}
              contentEditable={false}
              label="Data da coleta do teste rápido"
              type="date"
              value={teste.data}
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Accordion>
  );
};

TestComplementaryItem.propTypes = {
  descricao: PropTypes.string.isRequired,
  teste: PropTypes.exact({
    tipo_outro_exame_id: PropTypes.number,
    data: PropTypes.string,
    resultado: PropTypes.string,
    descricao: PropTypes.string,
  }).isRequired,
};

export default TestComplementaryItem;
