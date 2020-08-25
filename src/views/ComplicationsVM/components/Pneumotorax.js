import React from 'react';

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
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from '../styles';

export const Pneumotorax = (props) => {
  const classes = useStyles();
  const { visible, isNew, handleDelete } = props;

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
                InputLabelProps={{
                  shrink: true,
                }}
                // error={(formik.errors.temperatura && formik.touched.temperatura)}
                // helperText={
                //   (formik.errors.temperatura && formik.touched.temperatura) ? formik.errors.temperatura : null
                // }
                className={classes.dateField}
                label="Data"
                // onBlur={formik.handleBlur}
                // onChange={formik.handleChange}
                name={`dataPneumotorax${props.key}`}
                // value={formik.values.temperatura}
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
