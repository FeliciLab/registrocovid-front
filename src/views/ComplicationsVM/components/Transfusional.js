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
  TextField,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from '../styles';

export const Transfusional = (props) => {
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
                <Typography variant="h3">Necessidade transfusional</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Data: {Date()}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails} >
            <FormGroup className={classes.formGroup}>
              <FormLabel>
                <Typography variant="h5">Em caso afirmativo para necessidade transfusional, especificar o tipo</Typography>
              </FormLabel>
              {/* <TextField
                // InputLabelProps={{
                //   shrink: true,
                // }}
                // error={(formik.errors.temperatura && formik.touched.temperatura)}
                // helperText={
                //   (formik.errors.temperatura && formik.touched.temperatura) ? formik.errors.temperatura : null
                // }
                className={classes.dateField}
                label="Local de Hemorragia"
                // onBlur={formik.handleBlur}
                // onChange={formik.handleChange}
                name={`localHemorragia${props.id}`}
                // value={formik.values.temperatura}
                variant={'outlined'}
                type="text"
              /> */}
            </FormGroup>
            {/* adicionar radio acima */}
            <Grid container spacing={2}>
              <Grid item lg={6}>
                <FormGroup className={classes.formGroup}>
                  <FormLabel>
                    <Typography variant="h5">Volume da transfusão (em ml)</Typography>
                  </FormLabel>
                  <TextField
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    error={(fContext.errors[`volumeTransfusional${props.id}`] && fContext.touched[`volumeTransfusional${props.id}`])}
                    helperText={
                      (fContext.errors[`volumeTransfusional${props.id}`] && fContext.touched[`volumeTransfusional${props.id}`]) ? fContext.errors[`volumeTransfusional${props.id}`] : null
                    }
                    className={classes.dateField}
                    label="Volume de transfusão"
                    onBlur={fContext.handleBlur}
                    onChange={fContext.handleChange}
                    name={`volumeTransfusional${props.id}`}
                    value={fContext.values[`volumeTransfusional${props.id}`]}
                    variant={'outlined'}
                    type="text"
                  />
                </FormGroup>
              </Grid>
              <Grid item lg={6}>
                <FormGroup className={classes.formGroup}>
                  <FormLabel>
                    <Typography variant="h5">Data de hemorragia:</Typography>
                  </FormLabel>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={(fContext.errors[`dataTransfusional${props.id}`] && fContext.touched[`dataTransfusional${props.id}`])}
                    helperText={
                      (fContext.errors[`dataTransfusional${props.id}`] && fContext.touched[`dataTransfusional${props.id}`]) ? fContext.errors[`dataTransfusional${props.id}`] : null
                    }
                    className={classes.dateField}
                    label="Data"
                    onBlur={fContext.handleBlur}
                    onChange={fContext.handleChange}
                    name={`dataTransfusional${props.id}`}
                    value={fContext.values[`dataTransfusional${props.id}`]}
                    // variant={'outlined'}
                    type="date"
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

const DeleteAction = (props) => {
  const classes = useStyles();
  return (
    <IconButton onClick={() => props.onClick()}>
      <DeleteIcon className={classes.deleteIcon} />
    </IconButton >
  )
}
