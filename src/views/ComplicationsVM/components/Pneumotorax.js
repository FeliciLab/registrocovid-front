import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Grid,
  TextField,
  FormLabel,
  FormGroup
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete'

import useStyles from '../styles';
export const Pneumotorax = (props) => {
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
                <Typography variant="h3">Pneumotórax</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Data: {Date()}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails >
            <FormGroup className={classes.formGroup}>
              <FormLabel>
                <Typography variant="h5">Data de pneumotórax:</Typography>
              </FormLabel>
              <TextField
                className={classes.dateField}
                // error={(formik.errors.temperatura && formik.touched.temperatura)}
                // helperText={
                //   (formik.errors.temperatura && formik.touched.temperatura) ? formik.errors.temperatura : null
                // }
                label="Data"
                name={`dataPneumotorax${props.key}`}
                // onBlur={formik.handleBlur}
                // onChange={formik.handleChange}
                type="date"
                // value={formik.values.temperatura}
                // variant={'outlined'}
                InputLabelProps={{
                  shrink: true,
                }}
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