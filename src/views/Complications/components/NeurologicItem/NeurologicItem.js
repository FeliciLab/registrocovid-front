import React from 'react';
import {
  Grid,
  FormControl,
  Typography,
  TextField,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import formatDate from '../../../../helpers/formatDate';
import useStyles from './styles';

export default ({ complicationData }) => {
  const classes = useStyles();

  return (
    <Accordion>
      <AccordionSummary
        aria-controls="panel1a-content"
        expandIcon={<ExpandMoreIcon />}
        id="panel1a-header">
        <div className={classes.heading}>
          <Typography className={classes.headingLabel} variant="h4">
            Complicação Neurológica
          </Typography>
          <Typography variant="caption">
            {complicationData ? formatDate(complicationData.created_at) : ''}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <Grid className={classes.root} item xs={12}>
          <FormControl className={classes.formControl}>
            <Typography variant="h4" className={classes.formLabel}>
              Em caso afirmativo para complicação neurológica, qual?
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Local de Complicação"
              value={complicationData ? complicationData.descricao : ''}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Grid className={classes.formControlContainer}>
              <Grid item xs={12}>
                <Typography variant="h4" className={classes.formSubtitle}>
                  Data de Complicação
                </Typography>
                <TextField
                  variant="outlined"
                  className={classes.formInputDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Data"
                  name="data_complicacao"
                  type="date"
                  defaultValue={complicationData ? complicationData.data : ''}
                />
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
