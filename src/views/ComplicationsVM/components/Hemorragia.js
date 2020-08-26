import React, { useContext } from 'react';

import { formContext } from './Form';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Grid,
  TextField,
  FormGroup,
  FormLabel,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from '../styles';

export const Hemorragia = (props) => {
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
                <Typography variant="h4">Hemorragia</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Data: {infos?.data_complicacao.split('-').reverse().join('/') ?? undefined} </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails} >
            <FormGroup className={classes.formGroup}>
              <FormLabel>
                <Typography variant="h5">Em caso afirmativo para hemorragia, especificar o local:</Typography>
              </FormLabel>
              <TextField
                className={classes.dateField}
                error={(fContext.errors[`localHemorragia${id}`] && fContext.touched[`localHemorragia${id}`])}
                helperText={
                  (fContext.errors[`localHemorragia${id}`] && fContext.touched[`localHemorragia${id}`]) ? fContext.errors[`localHemorragia${id}`] : null
                }
                label="Local de Hemorragia"
                name={`localHemorragia${id}`}
                onBlur={fContext.handleBlur}
                onChange={fContext.handleChange}
                type="text"
                value={infos?.descricao ?? fContext.values[`localHemorragia${id}`]}
                variant={'outlined'}
              />
            </FormGroup>
            <FormGroup className={classes.formGroup}>
              <FormLabel>
                <Typography variant="h5">Data de hemorragia:</Typography>
              </FormLabel>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.dateField}
                error={(fContext.errors[`dataHemorragia${id}`] && fContext.touched[`dataHemorragia${id}`])}
                helperText={
                  (fContext.errors[`dataHemorragia${id}`] && fContext.touched[`dataHemorragia${id}`]) ? fContext.errors[`dataHemorragia${id}`] : null
                }
                label="Data"
                name={`dataHemorragia${id}`}
                onBlur={fContext.handleBlur}
                onChange={fContext.handleChange}
                type="date"
                value={infos?.data_complicacao ?? fContext.values[`dataHemorragia${id}`]}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>}
    </>
  )
}

const DeleteAction = (props) => {
  const classes = useStyles();
  return (
    <IconButton onClick={() => props.onClick()}>
      <DeleteIcon className={classes.deleteIcon} />
    </IconButton >
  )
}
