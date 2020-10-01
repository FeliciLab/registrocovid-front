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

const UTIItem = ({ complicationData, separator }) => {
  const classes = useStyles();

  return (
    <Accordion className={separator ? classes.typeSeparator : ''}>
      <AccordionSummary
        aria-controls="panel1a-content"
        expandIcon={<ExpandMoreIcon />}
        id="panel1a-header"
      >
        <Grid
          className={classes.heading}
          container
        >
          <Grid
            item
            xs={10}
          >
            <Typography
              className={classes.headingLabel}
              variant="h4"
            >
              Admissão na Unidade de Terapia Intensiva (UTI)
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <Typography variant="caption">
              {complicationData ? formatDate(complicationData.data) : ''}
            </Typography>
          </Grid>
        </Grid>
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
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.textField}
            defaultValue={
              complicationData ? complicationData.glasgow_admissao_uti : ''
            }
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
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.formInputDate}
                defaultValue={complicationData ? complicationData.data : ''}
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
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.formInputDate}
                defaultValue={
                  complicationData ? complicationData.data_termino : ''
                }
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

export default UTIItem;