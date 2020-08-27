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
                <input 
                  name={`tipo_complicacao_id#${id}`} 
                  type="hidden" 
                  value={fContext.values[`tipo_complicacao_id#${id}`] || 5}
                />
              </Grid>
              <Grid 
                item 
                lg={1} 
              />
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
                error={(fContext.errors[`descricao#${id}`] && fContext.touched[`descricao#${id}`])}
                helperText={
                  (fContext.errors[`descricao#${id}`] && fContext.touched[`descricao#${id}`]) ? fContext.errors[`descricao#${id}`] : null
                }
                label="Outras complicações"
                name={`descricao#${id}`}
                onBlur={fContext.handleBlur}
                onChange={fContext.handleChange}
                type="text"
                value={infos?.descricao ?? fContext.values[`descricao#${id}`]}
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
                error={(fContext.errors[`data_complicacao#${id}`] && fContext.touched[`data_complicacao#${id}`])}
                helperText={
                  (fContext.errors[`data_complicacao#${id}`] && fContext.touched[`data_complicacao#${id}`]) ? fContext.errors[`data_complicacao#${id}`] : null
                }
                label="Data"
                name={`data_complicacao#${id}`}
                onBlur={fContext.handleBlur}
                onChange={fContext.handleChange}
                type="date"
                value={infos?.data_complicacao ?? fContext.values[`data_complicacao#${id}`]}
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
