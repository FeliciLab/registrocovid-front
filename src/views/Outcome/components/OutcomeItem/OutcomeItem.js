import React from 'react';

import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@material-ui/core';
import useStyles from './styles';

const OutcomeItem = props => {
  const { desfecho } = props;

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
            {desfecho.tipo_desfecho}
          </Typography>
          <Typography variant="caption">
            Data da coleta:{' '}
            {desfecho.data
              .split('-')
              .reverse()
              .join('/')}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        Teste
      </AccordionDetails>
    </Accordion>
  );
};

OutcomeItem.propTypes = {
  desfecho: PropTypes.exact({
    id: PropTypes.number,
    tipo_desfecho: PropTypes.string,
    tipo_autocuidado: PropTypes.exact({
      id: PropTypes.number,
      descricao: PropTypes.string,
    }),
    data: PropTypes.string,
    instituicao_transferencia: PropTypes.exact({
      id: PropTypes.number,
      nome: PropTypes.string,
    }),
    tipo_cuidado_paliativo: PropTypes.exact({
      id: PropTypes.number,
      descricao: PropTypes.string,
    }),
    causa_obito: PropTypes.string,
    obito_menos_24h: PropTypes.bool,
    obito_em_vm: PropTypes.bool,
    obito_em_uti: PropTypes.bool,
  }),
};

export default OutcomeItem;
