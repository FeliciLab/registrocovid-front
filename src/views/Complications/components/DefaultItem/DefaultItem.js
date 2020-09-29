import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import formatDate from '../../../../helpers/formatDate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
        <Grid container className={classes.heading}>
          <Grid item xs={10}>
            <Typography
              className={classes.headingLabel}
              variant="h4"
            >
              {complicationData && complicationData.tipo_complicacao.descricao
                ? complicationData.tipo_complicacao.descricao
                : ''}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="caption">
              {complicationData ? formatDate(complicationData.data) : ''}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <Grid className={classes.gridContainer}>
          <Grid
            item
            xs={12}
          >
            <Typography
              className={classes.formSubtitle}
              variant="h4"
            >
              Data de Complicação
            </Typography>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.formInputDate}
              defaultValue={
                complicationData && complicationData.data
                  ? complicationData.data
                  : ''
              }
              label="Data"
              name="data_complicacao"
              type="date"
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
