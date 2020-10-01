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

const NeurologicItem = ({ complicationData, separator }) => {
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
              {complicationData && complicationData.tipo_complicacao
                ? complicationData.tipo_complicacao.descricao
                : ''}
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
      </AccordionSummary >
      <AccordionDetails
        className={classes.accordionDetails}
      >
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
              Data de Complicação
            </Typography>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.textField}
              defaultValue={complicationData ? complicationData.data : ''}
              label="Data"
              name="data_complicacao"
              type="date"
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
              Em caso afirmativo para {complicationData && complicationData.tipo_complicacao
                ? complicationData.tipo_complicacao.descricao.toLowerCase()
                : ''}, qual?
            </Typography>
            <TextField
              className={classes.extField}
              placeholder="Local de Complicação"
              value={(complicationData && complicationData.descricao) ? complicationData.descricao : ''}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion >
  );
};

export default NeurologicItem