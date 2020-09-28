import React from 'react';
import {
  Grid,
  Typography,
  TextField,
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
            Complicação Neurológica
          </Typography>
          <Typography variant="caption">
            {complicationData ? formatDate(complicationData.data) : ''}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <Grid
          className={classes.root}
          item
          xs={12}
        >
          <Grid
            className={classes.gridContainer}
            item
            xs={12}
          >
            <Typography
              className={classes.formSubtitle}
              variant="h4"
            >
              Em caso afirmativo para complicação neurológica, qual?
            </Typography>
            <TextField
              className={classes.extField}
              placeholder="Local de Complicação"
              value={complicationData ? complicationData.descricao : ''}
            />
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
              Data de Complicação
            </Typography>
            <TextField
              className={classes.textField}
              defaultValue={complicationData ? complicationData.data : ''}
              InputLabelProps={{
                shrink: true,
              }}
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
