import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field, useFormikContext } from 'formik';
import { Button, Card, FormGroup, FormLabel, Grid, MenuItem, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

import AddIcon from '@material-ui/icons/Add';
import useStyles from './styles';
import { PrevJSON } from 'components';

// const initialValues = {
//   newSuportesRespitatorios: [],
//   tipoNewSuporteRespiratorioSelected: '',
// };

const SelectRespiratorySuportType = props => {
  const { tipos } = props;

  const classes = useStyles();

  const { values, setFieldValue } = useFormikContext();

  const handleAddRespiratorySuportType = () => {
    setFieldValue('newSuportesRespitatorios', [...values.newSuportesRespitatorios, {
      tipo_suport_respiratorio_id: values.tipoNewSuporteRespiratorioSelected.toString(),
    }])
  }

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
            disabled={values.tipoNewDesfechoSelected === ''}
            onClick={handleAddRespiratorySuportType}
            startIcon={<AddIcon />}
            variant="contained"
          >
            ADICIONAR OCORRÊNCIA
          </Button>
        </Grid>
      </FormGroup>
      <PrevJSON
        data={values}
        name="values"
      />
    </Grid>

  );
}

SelectRespiratorySuportType.propTypes = {
  tipos: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      nome: PropTypes.string,
    }),
  ).isRequired,
};

export default memo(SelectRespiratorySuportType);
