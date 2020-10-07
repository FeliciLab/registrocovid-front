import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import PropTypes from 'prop-types';
import UTIItem from '../UTIItem';
import UTIForm from '../UTIForm';
import NeurologicItem from '../NeurologicItem';
import NeurologicForm from '../NeurologicForm';
import DefaultItem from '../DefaultItem';
import DefaultForm from '../DefaultForm';
import { useFormikContext, FieldArray } from 'formik';

const ComplicationsList = ({ complicacoes }) => {
  const classes = useStyles();
  const { values } = useFormikContext();

  const sortDate = comp => {
    comp.sort((a, b) => {
      if (new Date(a.data) > new Date(b.data)) {
        return 1;
      }
      if (new Date(a.data) < new Date(b.data)) {
        return -1;
      }
      return 0;
    });
  };

  const sortType = comp => {
    comp.sort((a, b) => {
      if (a.tipo_complicacao.id > b.tipo_complicacao.id) {
        return 1;
      }
      if (a.tipo_complicacao.id < b.tipo_complicacao.id) {
        return -1;
      }
      return 0;
    });
  };

  sortDate(complicacoes);
  sortType(complicacoes);
  return (
    <Grid
      className={classes.root}
      item
      xs={8}
    >
      <div className={classes.complicationsContainer}>
        <FieldArray name="newsComplicacoes">
          {({ remove }) => (
            <div>
              {values.newsComplicacoes &&
                values.newsComplicacoes.length > 0 &&
                values.newsComplicacoes.map((complicacao, index) => {
                  if (complicacao.tipo_complicacao_id === 1) {
                    return (
                      <UTIForm
                        index={index}
                        key={index}
                        remove={remove}
                      />
                    );
                  } else if (complicacao.tipo_complicacao_id === 13) {
                    return (
                      <NeurologicForm
                        complicationData={complicacao}
                        index={index}
                        key={index}
                        remove={remove}
                      />
                    );
                  } else {
                    return (
                      <DefaultForm
                        complicationData={complicacao}
                        index={index}
                        key={index}
                        remove={remove}
                      />
                    );
                  }
                })}
            </div>
          )}
        </FieldArray>
      </div>
      <Grid
        item
        xs={12}
      >
        {complicacoes.map((complicacao, index) => {
          let separator = false;
          if (index !== 0) {
            const lastItem = complicacoes[index - 1];
            separator =
              lastItem.tipo_complicacao.id !== complicacao.tipo_complicacao.id
                ? true
                : false;

            if (
              lastItem.tipo_complicacao.id !== complicacao.tipo_complicacao.id
            ) {
              separator = true;
            }
          }

          if (complicacao.tipo_complicacao.id === 1) {
            return (
              <UTIItem
                complicationData={complicacao}
                key={index}
                separator={separator}
              />
            );
          } else if (complicacao.tipo_complicacao.id >== 13) {
            return (
              <NeurologicItem
                complicationData={complicacao}
                key={index}
                separator={separator}
              />
            );
          } else {
            return (
              <DefaultItem
                complicationData={complicacao}
                key={index}
                separator={separator}
              />
            );
          }
        })}
      </Grid>
    </Grid>
  );
};

ComplicationsList.propTypes = {
  className: PropTypes.string,
  complicacoes: PropTypes.arrayOf(
    PropTypes.shape({
      tipo_complicacao_id: PropTypes.number,
      data: PropTypes.string,
      data_termino: PropTypes.string,
      menos_24h_uti: PropTypes.bool,
      glasgow_admissao_uti: PropTypes.number,
    }),
  ).isRequired,
};

export default memo(ComplicationsList);
