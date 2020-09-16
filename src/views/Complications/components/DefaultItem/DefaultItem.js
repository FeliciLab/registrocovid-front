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
        id="panel1a-header">
        <div className={classes.heading}>
          <Typography className={classes.headingLabel} variant="h4">
            {complicationData && complicationData.tipo_complicacao.descricao
              ? complicationData.tipo_complicacao.descricao
              : ''}
          </Typography>
          <Typography variant="caption">
            {complicationData ? formatDate(complicationData.data) : ''}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <Grid className={classes.gridContainer}>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.formSubtitle}>
              Data de Complicação
            </Typography>
            <TextField
              className={classes.formInputDate}
              InputLabelProps={{
                shrink: true,
              }}
              label="Data"
              name="data_complicacao"
              type="date"
              defaultValue={
                complicationData && complicationData.data
                  ? complicationData.data
                  : ''
              }
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
