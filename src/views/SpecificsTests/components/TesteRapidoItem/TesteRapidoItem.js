import React from 'react';

import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles';

const TesteRapidoItem = () => {
  const classes = useStyles();

  return (
    <Accordion>
      <AccordionSummary
        aria-controls="panel1a-content"
        expandIcon={<ExpandMoreIcon />}
        id="panel1a-header"
      >
        <Typography className={classes.headingTeste}>
          <Typography variant="h4">Teste RT-PCR</Typography>
          <Typography variant="caption">Data da coleta:</Typography>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default TesteRapidoItem;
