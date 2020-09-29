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
  InputAdornment,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DeleteAction from './DeleteIcon';

import useStyles from '../styles';

// Cateter nasal de alto fluxo
// TODO: renomear o component
export const Cateter = props => {
  const classes = useStyles();
  const fContext = useContext(formContext);

  const { id, visible, isNew, handleDelete, infos } = props;

  return (
    <>
      {visible && (
        <Accordion
          elevation={2}
          expanded={isNew || undefined}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            expandIcon={
              isNew ? (
                <DeleteAction onClick={handleDelete} />
              ) : (
                <ExpandMoreIcon />
              )
            }
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
                <Typography variant="h4">
                  Cateter nasal de alto fluxo
                </Typography>
              </Grid>
              <Grid
                item
                lg={1}
              />
              <Grid item>
                {!isNew && <Typography variant="body2">
                  Data:{' '}
                  {infos?.data_inicio
                    .split('-')
                    .reverse()
                    .join('/') ?? undefined}{' '}
                </Typography>}
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
                    error={
                      fContext.errors[`data_inicio#${id}`] &&
                      fContext.touched[`data_inicio#${id}`]
                    }
                    helperText={
                      fContext.errors[`data_inicio#${id}`] &&
                      fContext.touched[`data_inicio#${id}`]
                        ? fContext.errors[`data_inicio#${id}`]
                        : null
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Data"
                    name={`data_inicio#${id}`}
                    onBlur={fContext.handleBlur}
                    onChange={fContext.handleChange}
                    type="date"
                    value={
                      infos?.data_inicio ?? fContext.values[`data_inicio#${id}`]
                    }
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
                    error={
                      fContext.errors[`data_termino#${id}`] &&
                      fContext.touched[`data_termino#${id}`]
                    }
                    helperText={
                      fContext.errors[`data_termino#${id}`] &&
                      fContext.touched[`data_termino#${id}`]
                        ? fContext.errors[`data_termino#${id}`]
                        : null
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Data"
                    name={`data_termino#${id}`}
                    onBlur={fContext.handleBlur}
                    onChange={fContext.handleChange}
                    type="date"
                    value={
                      infos?.data_termino ??
                      fContext.values[`data_termino#${id}`]
                    }
                  />
                </FormGroup>
              </Grid>

              <Grid
                item
                lg={6}
              >
                <FormGroup className={classes.formGroup}>
                  <FormLabel>
                    <Typography variant="h5">Fluxo O₂</Typography>
                  </FormLabel>
                  <TextField
                    className={classes.dateField}
                    disabled={!isNew}
                    error={
                      fContext.errors[`parametro#${id}`] &&
                      fContext.touched[`parametro#${id}`]
                    }
                    helperText={
                      fContext.errors[`parametro#${id}`] &&
                      fContext.touched[`parametro#${id}`]
                        ? fContext.errors[`parametro#${id}`]
                        : null
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">l/min</InputAdornment>
                      ),
                    }}
                    label="Em l/min"
                    name={`parametro#${id}`}
                    onBlur={fContext.handleBlur}
                    onChange={fContext.handleChange}
                    type="number"
                    value={
                      infos?.parametro ?? fContext.values[`parametro#${id}`]
                    }
                    variant={'outlined'}
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};
