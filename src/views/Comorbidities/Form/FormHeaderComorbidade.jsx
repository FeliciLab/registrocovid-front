import React, { useState, useEffect } from 'react';
import useStyles from 'views/Comorbidities/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import { useFormikContext } from 'formik';
import PatientInfo from 'components/PatientInfo';
// import { validarCamposFormularioParaSalvar } from 'models/comorbidades/ComorbidadeService';

const FormHeaderComorbidade = () => {
  const { isSubmitting, isValid, values } = useFormikContext();
  const [valido, setValido] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setValido(!isSubmitting && isValid);
  }, [values, isValid, isSubmitting]);

  return (
    <>
      <Grid
        className={classes.titleWrapper}
        container
      >
        <Grid
          className={classes.actionSection}
          item
          xs={6}
        >
          <Typography variant="h3">
            Comorbidades / Condições clínicas de base
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
        >
          <PatientInfo />
        </Grid>
        <Grid
          item
          xs={3}
        >
          <Button
            className={classes.buttonSave}
            color="secondary"
            disabled={!valido}
            type="submit"
            variant="contained"
          >
            Salvar
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FormHeaderComorbidade;
