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

function SupportTreatmentItem({ tratamento }) {
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
            Hemodiálise
          </Typography>
          <Typography variant="caption">
            Data da coleta:{' '}
            {tratamento.data_hemodialise
              .split('-')
              .reverse()
              .join('/')}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <Grid
          container
          spacing={2}
        >
          {/* data_hemodialise */}
          <Grid
            item
            sm={12}
          >
            <FormGroup>
              <FormLabel>
                <Typography variant="h4">Ocorrência</Typography>
              </FormLabel>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                contentEditable={false}
                label="Data"
                type="date"
                value={tratamento.data_hemodialise}
              />
            </FormGroup>
          </Grid>

          {/* motivo_hemodialise */}
          <Grid
            className={classes.fieldData}
            item
            sm={6}
          >
            <FormGroup>
              <FormLabel>
                <Typography variant="h4">Motivo</Typography>
              </FormLabel>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                contentEditable={false}
                type="text"
                value={tratamento.motivo_hemodialise}
                variant="outlined"
              />
            </FormGroup>
          </Grid>

          {/* frequencia_hemodialise */}
          <Grid
            className={classes.fieldData}
            item
            sm={6}
          >
            <FormGroup>
              <FormLabel>
                <Typography variant="h4">Frequência</Typography>
              </FormLabel>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                contentEditable={false}
                type="text"
                value={tratamento.frequencia_hemodialise}
                variant="outlined"
              />
            </FormGroup>
          </Grid>

        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

SupportTreatmentItem.propTypes = {
  className: PropTypes.string,
  tratamento: PropTypes.exact({
    id: PropTypes.number,
    data_hemodialise: PropTypes.string,
    motivo_hemodialise: PropTypes.string,
    frequencia_hemodialise: PropTypes.string,
  }),
};

export default SupportTreatmentItem;
