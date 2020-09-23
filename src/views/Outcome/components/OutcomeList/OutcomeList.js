import React, { memo } from 'react';

import PropTypes from 'prop-types';
import useStyles from './styles';
import { Card, Grid } from '@material-ui/core';
import OutcomeItem from '../OutcomeItem';

const OutcomeList = props => {
  const classes = useStyles();

  const { desfechosList } = props;

  // para o caso de não ter elementos a serem apresentados
  if (desfechosList.length === 0) return null;

  return (
    <div className={classes.root}>
      <Grid
        component={Card}
        item
      >
        {desfechosList.map((desfecho, index) => (
          <OutcomeItem
            desfecho={desfecho}
            key={index}
          />
        ))}
      </Grid>
    </div>
  );
};

OutcomeList.propTypes = {
  desfechosList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      tipo_desfecho: PropTypes.exact({
        id: PropTypes.number,
        descricao: PropTypes.string,
      }),
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
  ).isRequired,
};

export default memo(OutcomeList);
