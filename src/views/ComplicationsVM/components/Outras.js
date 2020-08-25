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
  FormLabel
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from '../styles';

export const Outras = (props) => {
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
                <Typography variant="h3">Outra complicação</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Data: {Date()}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails} >
            <FormGroup className={classes.formGroup}>
              <FormLabel>
                <Typography variant="h5">Em caso afirmativo para outra complicação, qual?</Typography>
              </FormLabel>
              <TextField
                // InputLabelProps={{
                //   shrink: true,
                // }}
                error={(fContext.errors[`localOutras${props.id}`] && fContext.touched[`localOutras${props.id}`])}
                helperText={
                  (fContext.errors[`localOutras${props.id}`] && fContext.touched[`localOutras${props.id}`]) ? fContext.errors[`localOutras${props.id}`] : null
                }
                className={classes.dateField}
                label="Outras Complicações"
                onBlur={fContext.handleBlur}
                onChange={fContext.handleChange}
                name={`localOutras${props.id}`}
                value={fContext.values[`localOutras${props.id}`]}
                variant={'outlined'}
                type="text"
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
                error={(fContext.errors[`dataOutros${props.id}`] && fContext.touched[`dataOutros${props.id}`])}
                helperText={
                  (fContext.errors[`dataOutros${props.id}`] && fContext.touched[`dataOutros${props.id}`]) ? fContext.errors[`dataOutros${props.id}`] : null
                }
                className={classes.dateField}
                label="Data"
                onBlur={fContext.handleBlur}
                onChange={fContext.handleChange}
                name={`dataOutros${props.id}`}
                value={fContext.values[`dataOutros${props.id}`]}
                // variant={'outlined'}
                type="date"
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
