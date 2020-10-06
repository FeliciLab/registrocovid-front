import React from 'react';
import {
  Grid,
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

export default ({ complicationData, separator }) => {
  const classes = useStyles();

  return (
    <Accordion className={separator ? classes.typeSeparator : ''}>
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
            UTI
          </Typography>
          <Typography variant="caption">
            {complicationData ? formatDate(complicationData.data) : ''}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <Grid
          className={classes.gridContainer}
          item
          xs={12}
        >
          <Typography
            className={classes.headingLabel}
            variant="h4"
          >
            Escala de Glasgow
          </Typography>
          <TextField
            className={classes.textField}
            defaultValue={
              complicationData ? complicationData.glasglow_admissao_uti : ''
            }
            InputLabelProps={{
              shrink: true,
            }}
            type="text"
          />
        </Grid>
        <Grid
          className={classes.gridContainer}
          item
          xs={12}
        >
          <Grid className={classes.formControlContainer}>
            <Grid
              item
              xs={6}
            >
              <Typography
                className={classes.formSubtitle}
                variant="h4"
              >
                Admissão Em UTI
              </Typography>
              <TextField
                className={classes.formInputDate}
                defaultValue={complicationData ? complicationData.data : ''}
                InputLabelProps={{
                  shrink: true,
                }}
                label="Data"
                name="admissao_uti"
                type="date"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <Typography
                className={classes.formSubtitle}
                variant="h4"
              >
                Saída de UTI
              </Typography>
              <TextField
                className={classes.formInputDate}
                defaultValue={
                  complicationData ? complicationData.data_termino : ''
                }
                InputLabelProps={{
                  shrink: true,
                }}
                label="Data"
                name="saida_uti"
                type="date"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          className={classes.gridContainer}
          item
          xs={12}
        >
          <Typography
            className={classes.formSubtitle}
            variant="h4"
          >
            Paciente permaneceu menos de 24h na UTI?
          </Typography>
          <Switch
            checked={complicationData && complicationData.menos_24h_uti}
            color="primary"
            name="menos_24h_uti"
          />
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
