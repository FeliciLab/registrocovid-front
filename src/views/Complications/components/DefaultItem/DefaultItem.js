import React from 'react';
import {
  Card,
  Grid,
  FormControl,
  Typography,
  CardContent,
  Divider,
  TextField,
} from '@material-ui/core';
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
            {complicationData && complicationData.tipo_complicacao.descricao
              ? complicationData.tipo_complicacao.descricao
              : ''}
          </Typography>
          <Typography component="p" className={classes.headerCardDate}>
            Data:
            {complicationData && complicationData.created_at
              ? formatDate(complicationData.created_at)
              : ''}
          </Typography>
        </div>
        <Divider />
        <CardContent>
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
                  defaultValue={
                    complicationData && complicationData.data
                      ? complicationData.data
                      : ''
                  }
                />
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </Card>
    </Grid>
  );
};
