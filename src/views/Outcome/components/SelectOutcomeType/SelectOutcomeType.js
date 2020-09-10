import React, { memo } from 'react';

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

const SelectOutcomeType = props => {
  const { tipos } = props;

  const classes = useStyles();

  const { values, handleChange, setFieldValue } = useFormikContext();

  //  e tipo_cuidado_paliativo_id
  const handleAddTesteType = () => {
    // TODO: definir o que vai aparecer aqui
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
  }

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
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
            label="Tipo teste"
            name="tipoNewDesfechoSelected"
            onChange={handleChange}
            select
            type="text"
            value={values.tipoNewDesfechoSelected}
            variant="outlined"
          >
            {tipos.map(tipo => (
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
  tipos: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      descricao: PropTypes.string,
    }),
  ).isRequired,
};

export default memo(SelectOutcomeType);
