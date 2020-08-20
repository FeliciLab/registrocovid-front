import React, { memo } from 'react';

import PropTypes from 'prop-types';

import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles';
import formatDate from 'helpers/formatDate';

// TODO: colocar aqui o conteudo do AccordionDetails
const TesteRTCPRItem = ({ teste }) => {
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
            Teste RT-PCR
          </Typography>
          <Typography variant="caption">
            Data da coleta: {formatDate(teste.data_coleta)}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Conteudo de um TesteRTCPRItem: {teste.id}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

TesteRTCPRItem.propTypes = {
  teste: PropTypes.exact({
    id: PropTypes.number,
    data_coleta: PropTypes.string,
    data_resultado: PropTypes.string,
    sitio_tipo: PropTypes.string,
    rt_pcr_resultado: PropTypes.exact({
      id: PropTypes.number,
      descricao: PropTypes.string,
    }),
  }).isRequired,
};

export default memo(TesteRTCPRItem);
