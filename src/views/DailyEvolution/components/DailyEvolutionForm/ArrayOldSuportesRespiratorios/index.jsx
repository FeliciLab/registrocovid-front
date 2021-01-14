/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/styles';
import { FieldArray, useFormikContext } from 'formik';
import React from 'react';
import RespiratorySuportForm from 'views/RespiratorySupport/components/RespiratorySuportForm';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '864px',
  },
});

const NAME = 'oldSuportesRespitatorios';

function ArrayOldSuportesRespiratorios(props) {
  const { tipos } = props;

  const classes = useStyles();

  const { values } = useFormikContext();

  console.log(values[NAME]);

  return (
    <FieldArray name={NAME}>
      {({ remove }) => (
        <div className={classes.root}>
          {values[NAME] &&
            values[NAME].map((elem, index) => (
              <RespiratorySuportForm
                descricao={elem.tipo_suporte_id}
                index={index}
                key={index}
                remove={remove}
                tipo={elem.tipo_suporte_id}
              />
            )).reverse()}
        </div>
      )}
    </FieldArray>
  );
}

export default ArrayOldSuportesRespiratorios;
