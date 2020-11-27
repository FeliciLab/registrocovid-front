import { makeStyles } from '@material-ui/styles';
import { FieldArray, useFormikContext } from 'formik';
import React from 'react';
import RespiratorySuportForm from '../RespiratorySuportForm/RespiratorySuportForm';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '864px',
  },
}));

const RespiratorySuportFormList = props => {
  const { tipos } = props;

  const classes = useStyles();

  const { values } = useFormikContext();

  return (
    <FieldArray name="newSuportesRespitatorios">
      {({ remove }) => (
        <div className={classes.root}>
          {values.newSuportesRespitatorios &&
            values.newSuportesRespitatorios.length > 0 &&
            values.newSuportesRespitatorios
              .map((item, index) => (
                <RespiratorySuportForm
                  descricao={
                    tipos.filter(
                      tipo => tipo.id === item.tipo_suporte_id,
                    )[0].nome
                  }
                  index={index}
                  key={index}
                  remove={remove}
                  tipo={item.tipo_suporte_id}
                />
              ))
              .reverse()}
        </div>
      )}
    </FieldArray>
  );
};

export default RespiratorySuportFormList;
