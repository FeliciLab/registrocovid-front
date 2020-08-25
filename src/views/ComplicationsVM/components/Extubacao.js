import React, { useContext } from 'react';
import {formContext} from './Form'

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Grid,
  FormGroup,
  FormLabel,
  TextField
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from '../styles';

export const Extubacao = (props) => {
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
        <Accordion expanded={isNew ? true : undefined}>
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
                <Typography variant="h3">Extubação acidental</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Data: {Date()}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails >
            <FormGroup className={classes.formGroup}>
              <FormLabel>
                <Typography variant="h5">Data de extubação acidental:</Typography>
              </FormLabel>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                error={(fContext.errors[`dataExtubacao${props.id}`] && fContext.touched[`dataExtubacao${props.id}`])}
                helperText={
                  (fContext.errors[`dataExtubacao${props.id}`] && fContext.touched[`dataExtubacao${props.id}`]) ? fContext.errors[`dataExtubacao${props.id}`] : null
                }
                className={classes.dateField}
                label="Data"
                onBlur={fContext.handleBlur}
                onChange={fContext.handleChange}
                name={`dataExtubacao${props.id}`}
                value={fContext.values[`dataExtubacao${props.id}`]}
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
