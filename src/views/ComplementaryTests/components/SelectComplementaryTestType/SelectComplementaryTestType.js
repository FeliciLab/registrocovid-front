import React, { memo } from 'react';

import PropTypes from 'prop-types';

import {
  Card,
  Typography,
  Grid,
  FormGroup,
  FormLabel,
  TextField,
  MenuItem,
  Button,
} from '@material-ui/core';

import useStyles from './styles';

import AddIcon from '@material-ui/icons/Add';

import { Field, useFormikContext } from 'formik';

const SelectComplementaryTestType = props => {
  const { types } = props;

  const classes = useStyles();

  const { values, handleChange, setFieldValue } = useFormikContext();

  // TODO testando
  const handleAddTesteType = () => {
    setFieldValue('newComplementaryTests', [
      ...values.newComplementaryTests,
      {
        tipo_exames_complementares_id: values.tipoNewTesteSelected.toString(),
        data: '',
        resultado: '',
        descricao: types.filter(
          tipo => tipo.id === Number(values.tipoNewTesteSelected),
        )[0].descricao,
      },
    ]);
  };

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
      md={10}
      xs={12}
    >
      <Grid item>
        <FormGroup>
          <FormLabel>
            <Typography variant="h4">Tipo teste</Typography>
          </FormLabel>
          <Grid
            className={classes.actionWrapper}
            item
          >
            <Field
              as={TextField}
              className={classes.textField}
              label="Tipo teste"
              name="tipoNewTesteSelected"
              onChange={handleChange}
              select
              type="text"
              value={values.tipoNewTesteSelected}
              variant="outlined"
            >
              {types.map(tipo => (
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
              disabled={values.tipoNewTesteSelected === ''}
              onClick={() => handleAddTesteType()}
              startIcon={<AddIcon />}
              variant="contained"
            >
              ADICIONAR OCORRÊNCIA
            </Button>
          </Grid>
        </FormGroup>
      </Grid>
    </Grid>
  );
};

SelectComplementaryTestType.propTypes = {
  className: PropTypes.string,
  types: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      descricao: PropTypes.string,
    }),
  ).isRequired,
};

export default memo(SelectComplementaryTestType);
