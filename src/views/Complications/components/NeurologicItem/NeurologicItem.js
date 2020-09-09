import React, { useState } from 'react';
import {
  Card,
  Grid,
  FormControl,
  Typography,
  IconButton,
  CardContent,
  Divider,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import formatDate from '../../../../helpers/formatDate';
import useStyles from './styles';

export default props => {
  const { complicationData, enableDelete, removeItself } = props;

  const classes = useStyles();

  return (
    <Grid className={classes.root} item xs={12}>
      <Card>
        <div className={classes.headerCard}>
          <Typography variant="h4" className={classes.headerCardLabel}>
            Complicação Neurológica
          </Typography>
          <Typography component="p" className={classes.headerCardDate}>
            Data:
            {complicationData ? formatDate(complicationData.created_at) : ''}
          </Typography>
        </div>
        <Divider />
        <CardContent>
          <FormControl className={classes.formControl}>
            <Typography variant="h4" className={classes.formLabel}>
              Em caso afirmativo para complicação neurológica, qual?
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Local de Complicação"
              value={complicationData ? complicationData.descricao : ''}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Grid className={classes.formControlContainer}>
              <Grid item xs={12}>
                <Typography variant="h4" className={classes.formSubtitle}>
                  Data de Complicação
                </Typography>
                <TextField
                  variant="outlined"
                  className={classes.formInputDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Data"
                  name="data_complicacao"
                  type="date"
                  defaultValue={complicationData ? complicationData.data : ''}
                />
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </Card>
    </Grid>
  );
};