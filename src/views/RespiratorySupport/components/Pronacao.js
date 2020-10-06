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
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DeleteAction from './DeleteIcon';

import useStyles from '../styles';

export const Pronacao = (props) => {
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
                <Typography variant="h4">Pronação</Typography>
              </Grid>
              <Grid
                item
                lg={1}
              />
              <Grid item>
                <Typography variant="body2">Data: {infos?.data_pronacao.split('-').reverse().join('/') ?? undefined} </Typography>
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
                    <Typography variant="h5">Data de pronação</Typography>
                  </FormLabel>
                  <TextField
                    className={classes.dateField}
                    disabled={!isNew}
                    error={(fContext.errors[`data_pronacao#${id}`] && fContext.touched[`data_pronacao#${id}`])}
                    helperText={
                      (fContext.errors[`data_pronacao#${id}`] && fContext.touched[`data_pronacao#${id}`]) ? fContext.errors[`data_pronacao#${id}`] : null
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Ocorrência"
                    name={`data_pronacao#${id}`}
                    onBlur={fContext.handleBlur}
                    onChange={fContext.handleChange}
                    type="date"
                    value={infos?.data_pronacao ?? fContext.values[`data_pronacao#${id}`]}
                  />
                </FormGroup>
              </Grid>

              <Grid
                item
                lg={6}
              >
                <FormGroup className={classes.formGroup}>
                  <FormLabel>
                    <Typography variant="h5">Pronação</Typography>
                  </FormLabel>
                  <TextField
                    className={classes.dateField}
                    disabled={!isNew}
                    error={(fContext.errors[`quantidade_horas#${id}`] && fContext.touched[`quantidade_horas#${id}`])}
                    helperText={
                      (fContext.errors[`quantidade_horas#${id}`] && fContext.touched[`quantidade_horas#${id}`]) ? fContext.errors[`quantidade_horas#${id}`] : null
                    }
                    label="Quantidade de horas"
                    name={`quantidade_horas#${id}`}
                    onBlur={fContext.handleBlur}
                    onChange={fContext.handleChange}
                    type="number"
                    value={infos?.quantidade_horas ?? fContext.values[`quantidade_horas#${id}`]}
                    variant={'outlined'}
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
