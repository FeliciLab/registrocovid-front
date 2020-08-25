import React, { useContext } from 'react';
import {formContext} from './Form'

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
  const { visible, isNew, handleDelete } = props;
  const fContext = useContext(formContext);

  // const handleDelete = () => {
  //   console.log(props);
  //   props.onDelete(props.id);
  // };

  return (
    <>
      {visible &&
        <Accordion 
          elevation={4}
          expanded={isNew ? true : undefined} 
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            expandIcon={props.isNew ? <DeleteAction onClick={handleDelete} /> : <ExpandMoreIcon />}
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
                <Typography variant="h3">Hemorragia</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Data: {Date()}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails} >
            <FormGroup className={classes.formGroup}>
              <FormLabel>
                <Typography variant="h5">Em caso afirmativo para hemorragia, especificar o local:</Typography>
              </FormLabel>
              <TextField
                // InputLabelProps={{
                //   shrink: true,
                // }}
                error={(fContext.errors[`localHemorragia${props.id}`] && fContext.touched[`localHemorragia${props.id}`])}
                helperText={
                  (fContext.errors[`localHemorragia${props.id}`] && fContext.touched[`localHemorragia${props.id}`]) ? fContext.errors[`localHemorragia${props.id}`] : null
                }
                className={classes.dateField}
                label="Local de Hemorragia"
                onBlur={fContext.handleBlur}
                onChange={fContext.handleChange}
                name={`localHemorragia${props.id}`}
                value={fContext.values[`localHemorragia${props.id}`]}
                variant={'outlined'}
                type="text"
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
                error={(fContext.errors[`dataHemorragia${props.id}`] && fContext.touched[`dataHemorragia${props.id}`])}
                helperText={
                  (fContext.errors[`dataHemorragia${props.id}`] && fContext.touched[`dataHemorragia${props.id}`]) ? fContext.errors[`dataHemorragia${props.id}`] : null
                }
                className={classes.dateField}
                label="Data"
                onBlur={fContext.handleBlur}
                onChange={fContext.handleChange}
                name={`dataHemorragia${props.id}`}
                value={fContext.values[`dataHemorragia${props.id}`]}
                // variant={'outlined'}
                type="date"
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
