import React from 'react';

import PropTypes from 'prop-types';

import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles';

const TesteRapidoItem = ({ teste }) => {
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
            Teste Rápido
          </Typography>
          <Typography variant="caption">Data da coleta: {teste.id}</Typography>
        </div>
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

TesteRapidoItem.propTypes = {
  teste: PropTypes.exact({
    id: PropTypes.number,
    data_realizacao: PropTypes.string,
    resultado: PropTypes.bool,
  }).isRequired,
};

export default TesteRapidoItem;
