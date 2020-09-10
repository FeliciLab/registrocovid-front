import React from 'react';
import {
  Grid,
  FormControl,
  Typography,
  TextField,
  Switch,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import formatDate from '../../../../helpers/formatDate';
import useStyles from './styles';

export default props => {
  const { complicationData } = props;

  const classes = useStyles();

  return (
    <Accordion>
      <AccordionSummary
        aria-controls="panel1a-content"
        expandIcon={<ExpandMoreIcon />}
        id="panel1a-header">
        <div className={classes.heading}>
          <Typography className={classes.headingLabel} variant="h4">
            UTI
          </Typography>
          <Typography variant="caption">
            {complicationData ? formatDate(complicationData.created_at) : ''}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <Grid item xs={12} className={classes.gridContainer}>
          <Typography variant="h4" className={classes.headingLabel}>
            Escala de Glasgow
          </Typography>
          <TextField
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            type="text"
            defaultValue={
              complicationData ? complicationData.glasglow_admissao_uti : ''
            }
          />
        </Grid>
        <Grid item xs={12} className={classes.gridContainer}>
          <Grid className={classes.formControlContainer}>
            <Grid item xs={6}>
              <Typography variant="h4" className={classes.formSubtitle}>
                Admissão Em UTI
              </Typography>
              <TextField
                className={classes.formInputDate}
                InputLabelProps={{
                  shrink: true,
                }}
                label="Data"
                name="admissao_uti"
                type="date"
                defaultValue={complicationData ? complicationData.data : ''}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4" className={classes.formSubtitle}>
                Saída de UTI
              </Typography>
              <TextField
                className={classes.formInputDate}
                InputLabelProps={{
                  shrink: true,
                }}
                label="Data"
                name="saida_uti"
                type="date"
                defaultValue={
                  complicationData ? complicationData.data_termino : ''
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.gridContainer}>
          <Typography variant="h4" className={classes.formSubtitle}>
            Paciente permaneceu menos de 24h na UTI?
          </Typography>
          <Switch
            color="primary"
            name="menos_24h_uti"
            checked={complicationData && complicationData.menos_24h_uti}
          />
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
