import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field, useFormikContext } from 'formik';
import {
  Button,
  Card,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';

import AddIcon from '@material-ui/icons/Add';
import useStyles from './styles';

const SelectRespiratorySuportType = props => {
  const { tipos } = props;

  const classes = useStyles();

  const { values, setFieldValue } = useFormikContext();

  const handleAddRespiratorySuportType = () => {
    setFieldValue('newSuportesRespitatorios', [
      ...values.newSuportesRespitatorios,
      {
        tipo_suporte_id: values.tipoNewSuporteRespiratorioSelected.toString(),
        fluxo_o2: '',
        data_inicio: '',
        data_termino: '',
        menos_24h_vmi: '',
        concentracao_o2: '',
        fluxo_sangue: '',
        fluxo_gasoso: '',
        fio2: '',
        data_pronacao: '', // Pronacao
        quantidade_horas: '', // Pronacao
        data_inclusao_desmame: '', // Desmane
      },
    ]);
  };

  return (
    <Grid
      className={classes.root}
      component={Card}
      container
      item
      md={10}
      sm={12}
    >
      <FormGroup>
        <FormLabel>
          <Typography variant="h4">Escolher tipo de suporte ou procedimento:</Typography>
        </FormLabel>
        <Grid
          className={classes.actionWrapper}
          item
        >
          <Field
            className={classes.textField}
            component={TextField}
            label="Escolher"
            name="tipoNewSuporteRespiratorioSelected"
            select
            variant="outlined"
          >
            {tipos.map(tipo => (
              <MenuItem
                key={tipo.id}
                value={tipo.id.toString()}
              >
                {tipo.nome}
              </MenuItem>
            ))}
          </Field>

          <Button
            className={classes.buttonAddType}
            color="secondary"
            disabled={values.tipoNewSuporteRespiratorioSelected === ''}
            onClick={handleAddRespiratorySuportType}
            startIcon={<AddIcon />}
            variant="contained"
          >
            ADICIONAR OCORRÊNCIA
          </Button>
        </Grid>
      </FormGroup>
    </Grid>
  );
};

SelectRespiratorySuportType.propTypes = {
  tipos: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      nome: PropTypes.string,
    }),
  ).isRequired,
};

export default memo(SelectRespiratorySuportType);
