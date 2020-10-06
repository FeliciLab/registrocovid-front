import React, { useContext } from 'react';

import { formContext } from './Form';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  TextField,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Switch
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DeleteAction from './DeleteIcon';

import useStyles from '../styles';

export const Ventilacao = (props) => {
  const classes = useStyles();
  const fContext = useContext(formContext);

  const { id, visible, isNew, handleDelete, infos } = props;

  return (
    <>
      {visible &&
        <Accordion
          elevation={2}
          expanded={isNew || undefined}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            expandIcon={isNew ? <DeleteAction onClick={handleDelete} /> : <ExpandMoreIcon />}
            id="panel1a-header"
          >
            <Grid
              alignItems={'center'}
              container
            >
              <Grid
                item
                lg={4}
              >
                <Typography variant="h4">Ventilação invasiva</Typography>
              </Grid>
              <Grid
                item
                lg={1}
              />
              <Grid item>
                <Typography variant="body2">Data: {infos?.data_inicio.split('-').reverse().join('/') ?? undefined} </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                lg={6}
              >
                <FormGroup className={classes.formGroup}>
                  <FormLabel>
                    <Typography variant="h5">Início</Typography>
                  </FormLabel>
                  <TextField
                    className={classes.dateField}
                    disabled={!isNew}
                    error={(fContext.errors[`data_inicio#${id}`] && fContext.touched[`data_inicio#${id}`])}
                    helperText={
                      (fContext.errors[`data_inicio#${id}`] && fContext.touched[`data_inicio#${id}`]) ? fContext.errors[`data_inicio#${id}`] : null
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Data"
                    name={`data_inicio#${id}`}
                    onBlur={fContext.handleBlur}
                    onChange={fContext.handleChange}
                    type="date"
                    value={infos?.data_inicio ?? fContext.values[`data_inicio#${id}`]}
                  />
                </FormGroup>
              </Grid>

              <Grid
                item
                lg={6}
              >
                <FormGroup className={classes.formGroup}>
                  <FormLabel>
                    <Typography variant="h5">Término</Typography>
                  </FormLabel>
                  <TextField
                    className={classes.dateField}
                    disabled={!isNew}
                    error={(fContext.errors[`data_termino#${id}`] && fContext.touched[`data_termino#${id}`])}
                    helperText={
                      (fContext.errors[`data_termino#${id}`] && fContext.touched[`data_termino#${id}`]) ? fContext.errors[`data_termino#${id}`] : null
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Data"
                    name={`data_termino#${id}`}
                    onBlur={fContext.handleBlur}
                    onChange={fContext.handleChange}
                    type="date"
                    value={infos?.data_termino ?? fContext.values[`data_termino#${id}`]}
                  />
                </FormGroup>
              </Grid>

              <Grid
                item
                lg={12}
              >
                <FormGroup className={classes.formGroup}>
                  <FormLabel>
                    <Typography variant="h5">Paciente permaneceu menos de 24h em ventilação invasiva?</Typography>
                  </FormLabel>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={infos?.menos_24h_vmi || undefined}
                        color="primary"
                        disabled={!isNew}
                        onChange={fContext.handleChange}
                        value={fContext.values[`menos_24h_vmi#${id}`]}
                      />
                    }
                    label={
                      <Typography variant="h5">Sim</Typography>
                    }
                    name={`menos_24h_vmi#${id}`}
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      }
    </>
  )
}
