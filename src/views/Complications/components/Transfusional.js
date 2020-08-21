import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Grid
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete'

import useStyles from '../styles';
export const Transfusional = (props) => {
  const classes = useStyles();
  const handleDelete = () => {
    console.log(props);
    props.onDelete(props.id);
  };

  return (
    <>
      {props.visible &&
        <Accordion expanded={props.isNew ? true : undefined}>
          <AccordionSummary
            aria-controls="panel1a-content"
            expandIcon={props.isNew ? <DeleteAction onClick={handleDelete} /> : <ExpandMoreIcon />}
            id="panel1a-header"
          >
            <Grid container alignItems={"center"}>
              <Grid item lg={4}>
                <Typography variant="h3">Necessidade transfusional</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Data: {Date()}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails />
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