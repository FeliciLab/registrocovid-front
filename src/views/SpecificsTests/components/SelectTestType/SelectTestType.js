import React from 'react';
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

import { Field } from 'formik';

const SelectTestType = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      component={Card}
      item
      xs={10}
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
              name="tipo_teste"
              select
              type="text"
              variant="outlined"
            >
              <MenuItem value="Teste RT-PCR">Teste RT-PCR</MenuItem>
              <MenuItem value="Teste rápido">Teste rápido</MenuItem>
            </Field>

            <Button
              className={classes.buttonAddType}
              color="secondary"
              disabled
              startIcon={<AddIcon />}
              type="submit"
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

export default SelectTestType;
