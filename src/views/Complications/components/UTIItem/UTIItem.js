import React, { useState } from 'react';
import {
  Card,
  Grid,
  FormControl,
  Typography,
  CardContent,
  Divider,
  TextField,
  Switch,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import formatDate from '../../../../helpers/formatDate';
import useStyles from './styles';

export default props => {
  const { complicationData } = props;

  const classes = useStyles();

  return (
    <Grid className={classes.root} item xs={12}>
      <Card>
        <div className={classes.headerCard}>
          <Typography variant="h4" className={classes.headerCardLabel}>
            UTI
          </Typography>
          <Typography component="p" className={classes.headerCardDate}>
            Data:
            {complicationData ? formatDate(complicationData.created_at) : ''}
          </Typography>
        </div>
        <Divider />
        <CardContent>
          <FormControl variant="outlined" className={classes.formControl}>
            <Typography variant="h4" className={classes.formLabel}>
              Escala de Glasgow
            </Typography>
            <TextField
              className={classes.formInputDate}
              InputLabelProps={{
                shrink: true,
              }}
              type="text"
              defaultValue={
                complicationData ? complicationData.glasglow_admissao_uti : ''
              }
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Grid className={classes.formControlContainer}>
              <Grid item xs={6}>
                <Typography variant="h4" className={classes.formSubtitle}>
                  Admissão Em UTI
                </Typography>
                <TextField
                  className={classes.formText}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Data"
                  name="admissao_uti"
                  type="date"
                  defaultValue={complicationData ? complicationData.data : ''}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h4" className={classes.formSubtitle}>
                  Saída de UTI
                </Typography>
                <TextField
                  className={classes.formInputDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Data"
                  name="saida_uti"
                  type="date"
                  defaultValue={
                    complicationData ? complicationData.data_termino : ''
                  }
                />
              </Grid>
            </Grid>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Typography variant="h4" className={classes.formSubtitle}>
              Paciente permaneceu menos de 24h na UTI?
            </Typography>
            <Switch
              color="primary"
              name="horas_uti"
              checked={complicationData && complicationData.menos_24h_uti}
            />
          </FormControl>
        </CardContent>
      </Card>
    </Grid>
  );
};
