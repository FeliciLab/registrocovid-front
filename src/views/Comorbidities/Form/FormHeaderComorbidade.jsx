import React from 'react'
import useStyles from 'views/Comorbidities/styles';
import {
  Grid,
  Typography,
  Button
} from '@material-ui/core';

const FormHeaderComorbidade = ({ desabilitarBotaoSalvar }) => {
  // botaoSalvar =  isSubmitting || isSaving || Object.keys(apiValues).length > 0
  desabilitarBotaoSalvar = true
  
  const classes = useStyles();

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
          {/* <PatientInfo /> */}
        </Grid>
        <Grid
          item
          xs={3}
        >
          <Button
            className={classes.buttonSave}
            color="secondary"
            disabled={desabilitarBotaoSalvar}
            type="submit"
            variant="contained"
          >
            Salvar
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default FormHeaderComorbidade