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
  FormLabel
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from '../styles';

export const Outras = (props) => {
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
                <Typography variant="h4">Outra complicação</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Data: {infos?.data_complicacao.split('-').reverse().join('/') ?? undefined} </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails} >
            <FormGroup className={classes.formGroup}>
              <FormLabel>
                <Typography variant="h5">Em caso afirmativo para outra complicação, qual?</Typography>
              </FormLabel>
              <TextField
                className={classes.dateField}
                error={(fContext.errors[`localOutras${id}`] && fContext.touched[`localOutras${id}`])}
                helperText={
                  (fContext.errors[`localOutras${id}`] && fContext.touched[`localOutras${id}`]) ? fContext.errors[`localOutras${id}`] : null
                }
                label="Outras complicações"
                name={`localOutras${id}`}
                onBlur={fContext.handleBlur}
                onChange={fContext.handleChange}
                type="text"
                value={infos?.descricao ?? fContext.values[`localOutras${id}`]}
                variant={'outlined'}
              />
            </FormGroup>
            <FormGroup className={classes.formGroup}>
              <FormLabel>
                <Typography variant="h5">Data de outra(s) complicação(ões):</Typography>
              </FormLabel>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.dateField}
                error={(fContext.errors[`dataOutros${id}`] && fContext.touched[`dataOutros${id}`])}
                helperText={
                  (fContext.errors[`dataOutros${id}`] && fContext.touched[`dataOutros${id}`]) ? fContext.errors[`dataOutros${id}`] : null
                }
                label="Data"
                name={`dataOutros${id}`}
                onBlur={fContext.handleBlur}
                onChange={fContext.handleChange}
                type="date"
                value={infos?.data_complicacao ?? fContext.values[`dataOutros${id}`]}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      }
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
