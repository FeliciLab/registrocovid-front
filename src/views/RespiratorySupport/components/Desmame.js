import React, { useContext } from 'react';

import { formContext } from './Form';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  TextField,
  FormGroup,
  FormLabel,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DeleteAction from './DeleteIcon';

import useStyles from '../styles';

export const Desmame = (props) => {
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
                <Typography variant="h4">Desmame</Typography>
              </Grid>
              <Grid
                item
                lg={1}
              />
              <Grid item>
                <Typography variant="body2">Data: {infos?.data_inclusao_desmame.split('-').reverse().join('/') ?? undefined} </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            <FormGroup className={classes.formGroup}>
              <FormLabel>
                <Typography variant="h5">Em caso afirmativo, informe a data da inclusão do paciente no desmame</Typography>
              </FormLabel>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.dateField}
                disabled={!isNew}
                error={(fContext.errors[`data_inclusao_desmame#${id}`] && fContext.touched[`data_inclusao_desmame#${id}`])}
                helperText={
                  (fContext.errors[`data_inclusao_desmame#${id}`] && fContext.touched[`data_inclusao_desmame#${id}`]) ? fContext.errors[`data_inclusao_desmame#${id}`] : null
                }
                label="Data"
                name={`data_inclusao_desmame#${id}`}
                onBlur={fContext.handleBlur}
                onChange={fContext.handleChange}
                type="date"
                value={infos?.data_inclusao_desmame ?? fContext.values[`data_inclusao_desmame#${id}`]}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      }
    </>
  )
}
