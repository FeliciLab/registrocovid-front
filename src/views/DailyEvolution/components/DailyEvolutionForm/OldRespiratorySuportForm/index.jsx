import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  AccordionActions,
} from '@material-ui/core';
import { useFormikContext } from 'formik';
import { DeleteIcon, ExpandMoreIcon } from 'icons';
import { getDataSuporteRespiratorio } from 'models/evolucoesDiarias/EvolucaoDiariaService';
import React from 'react';
import FieldFormikComposer from '../FieldFormikComposer';
import useStyles from './styles';

function OldRespiratorySuportForm({ descricao, index, remove, tipo, name }) {
  const classes = useStyles();

  const { values } = useFormikContext();

  return (
    <Accordion className={classes.root}>
      <AccordionSummary
        aria-controls="panel1a-content"
        expandIcon={<ExpandMoreIcon />}
        id="panel1a-header"
      >
        <section className={classes.summary}>
          <Typography variant="h4">{descricao}</Typography>
          <Typography className={classes.date} variant="subtitle2">
            {/* TODO: melhorar isso aqui */}
              Data: {getDataSuporteRespiratorio(values[name][index])}
          </Typography>
        </section>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container item>
          {[1, 2, 4].some(id => tipo === id) && (
            <Grid container item spacing={2}>
              <FieldFormikComposer
                field="fluxo_o2"
                name={`${name}.${index}.fluxo_o2`}
              />
            </Grid>
          )}
          {[3].some(id => tipo === id) && (
            <Grid container item spacing={2}>
              <FieldFormikComposer
                field="fluxo_o2"
                name={`${name}.${index}.fluxo_o2`}
              />
              <FieldFormikComposer
                field="concentracao_o2"
                name={`${name}.${index}.concentracao_o2`}
              />
            </Grid>
          )}
          {[6].some(id => tipo === id) && (
            <Grid container item spacing={2}>
              <FieldFormikComposer
                field="menos_24h_vmi"
                name={`${name}.${index}.menos_24h_vmi`}
              />
            </Grid>
          )}
          {[9].some(id => tipo === id) && (
            <Grid container item spacing={2}>
              <FieldFormikComposer
                field="fluxo_sangue"
                name={`${name}.${index}.fluxo_sangue`}
              />
              <FieldFormikComposer
                field="fluxo_gasoso"
                name={`${name}.${index}.in`}
              />
              <FieldFormikComposer
                field="fio2"
                name={`${name}.${index}.fio2`}
              />
            </Grid>
          )}
          {[10].some(id => tipo === id) && (
            <Grid container item spacing={2}>
              <FieldFormikComposer
                field="quantidade_horas"
                name={`${name}.${index}.quantidade_horas`}
              />
            </Grid>
          )}
          {[5, 7, 8, 11].some(id => tipo === id) && (
            <Grid container item spacing={2} />
          )}
        </Grid>
      </AccordionDetails>
      <AccordionActions>
        <Button
          aria-label="delete"
          color="secondary"
          onClick={() => remove(index)}
          startIcon={<DeleteIcon />}
          variant="contained"
        >
            Delete
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default OldRespiratorySuportForm;
