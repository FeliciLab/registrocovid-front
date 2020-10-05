import React, { memo, useMemo } from 'react';

import PropTypes from 'prop-types';
import useStyles from './styles';
import {
  Grid,
  Card,
  FormGroup,
  FormLabel,
  Typography,
  TextField,
  MenuItem,
  Button,
} from '@material-ui/core';
import { Field, useFormikContext } from 'formik';

import AddIcon from '@material-ui/icons/Add';
import { useToast } from 'hooks/toast';

const SelectOutcomeType = props => {
  const { isDead, tipos } = props;

  const classes = useStyles();

  const { addToast } = useToast();

  const { values, handleChange, setFieldValue } = useFormikContext();

  /**
   * Para o caso do paciente ter um Óbito já cadastrado ou
   * usuário estar cadastrando um desfecho do tipo Óbito.
   */
  const getTiposPossiveis = useMemo(() => {
    return isDead ? tipos.filter(tipo => tipo.descricao !== 'Óbito') : tipos;
  }, [tipos, isDead]);

  const handleAddTesteType = () => {
    if (
      values.newDesfechos.reduce(
        (acc, curr) => (acc ? acc : curr.tipo_desfecho_id === '3'),
        false,
      ) && values.tipoNewDesfechoSelected === '3'
    ) {
      addToast({
        type: 'error',
        message: 'Não pode cadastrar mais de um Óbito',
      });
      return;
    }

    setFieldValue('newDesfechos', [
      ...values.newDesfechos,
      {
        tipo_desfecho_id: values.tipoNewDesfechoSelected.toString(),
        tipo_autocuidado_id: '',
        instituicao_transferencia_id: '',
        data: '',
        causa_obito: '',
        obito_menos_24h: false,
        obito_em_vm: false,
        obito_em_uti: false,
        tipo_cuidado_paliativo_id: '',
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
          <Typography variant="h4">Escolher tipo de desfecho:</Typography>
        </FormLabel>
        <Grid
          className={classes.actionWrapper}
          item
        >
          <Field
            as={TextField}
            className={classes.textField}
            label="Escolher"
            name="tipoNewDesfechoSelected"
            onChange={handleChange}
            select
            type="text"
            value={values.tipoNewDesfechoSelected}
            variant="outlined"
          >
            {getTiposPossiveis.map(tipo => (
              <MenuItem
                key={tipo.id}
                value={tipo.id.toString()}
              >
                {tipo.descricao}
              </MenuItem>
            ))}
          </Field>

          <Button
            className={classes.buttonAddType}
            color="secondary"
            disabled={values.tipoNewDesfechoSelected === ''}
            onClick={handleAddTesteType}
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

SelectOutcomeType.propTypes = {
  isDead: PropTypes.bool.isRequired,
  tipos: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      descricao: PropTypes.string,
    }),
  ).isRequired,
};

export default memo(SelectOutcomeType);
