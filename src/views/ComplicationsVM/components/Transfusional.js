import React, { useState, useEffect, useCallback, useContext } from 'react';

import { formContext } from './Form';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Grid,
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  TextField,
  RadioGroup,
  Radio,
  CircularProgress
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

import api from 'services/api';

import { useToast } from 'hooks/toast';

import useStyles from '../styles';

export const Transfusional = (props) => {
  const classes = useStyles();
  const { addToast } = useToast();
  const fContext = useContext(formContext);

  const [loading, setLoading] = useState(false);
  const [transfusionTypes, setTransfusionTypes] = useState([]);

  const { id, visible, isNew, handleDelete, infos } = props;

  const handleTransfusionTypes = useCallback(async () => {
    try {
      setLoading(true);
      const transfusions = localStorage.getItem('@RegistroCovid:transfusions');

      if (!transfusions) {
        const { data } = await api.get('/tipos-transfusao');
        localStorage.setItem('@RegistroCovid:transfusions', JSON.stringify(data));
        setTransfusionTypes(data);
        return;
      }

      setTransfusionTypes(JSON.parse(transfusions));

    } catch (err) {
      addToast({
        type: 'error',
        message: 'Erro ao tentar carregar tipos de transfusão, tente novamente',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    handleTransfusionTypes();
  }, [handleTransfusionTypes]);

  return (
    <>
      {visible && !loading ? (
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
                <Typography variant="h4">Necessidade transfusional</Typography>
                <input
                  name={`tipo_complicacao_id#${id}`}
                  type="hidden"
                  value={fContext.values[`tipo_complicacao_id#${id}`] || 4}
                />
              </Grid>
              <Grid
                item
                lg={1}
              />
              <Grid item >
                <Typography variant="body2">Data: {infos?.data_transfusao.split('-').reverse().join('/') ?? undefined} </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails} >
            <FormControl
              className={classes.formGroup}
              component="fieldset"
            >
              <FormLabel>
                <Typography variant="h5">Em caso afirmativo para necessidade transfusional, especificar o tipo
                </Typography>
              </FormLabel>

              <RadioGroup
                name={`tipo_transfusao_id#${id}`}
                row
                value={infos?.tipos_transfusao.id ?? parseInt(fContext.values[`tipo_transfusao_id#${id}`])}
              >
                <Grid
                  container
                  spacing={1}
                >
                  {transfusionTypes.map(item => (
                    <Grid
                      item
                      lg={4}
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            onChange={fContext.handleChange}
                            value={item.id}
                          />
                        }
                        key={String(item.id)}
                        label={item.descricao}
                      />
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>

            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                lg={6}
              >
                <FormGroup className={classes.formGroup}>
                  <FormLabel>
                    <Typography variant="h5">Volume da transfusão (em ml)</Typography>
                  </FormLabel>
                  <TextField
                    className={classes.dateField}
                    error={(fContext.errors[`volumeTransfusional#${id}`] && fContext.touched[`volumeTransfusional#${id}`])}
                    helperText={
                      (fContext.errors[`volumeTransfusional#${id}`] && fContext.touched[`volumeTransfusional#${id}`]) ? fContext.errors[`volumeTransfusional#${id}`] : null
                    }
                    label="Volume de transfusão"
                    name={`volumeTransfusional#${id}`}
                    onBlur={fContext.handleBlur}
                    onChange={fContext.handleChange}
                    type="number"
                    value={infos?.volume_transfusao ?? fContext.values[`volumeTransfusional#${id}`]}
                    variant={'outlined'}
                  />
                </FormGroup>
              </Grid>
              <Grid
                item
                lg={6}
              >
                <FormGroup className={classes.formGroup}>
                  <FormLabel>
                    <Typography variant="h5">Data de hemorragia:</Typography>
                  </FormLabel>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.dateField}
                    error={(fContext.errors[`dataTransfusional#${id}`] && fContext.touched[`dataTransfusional#${id}`])}
                    helperText={
                      (fContext.errors[`dataTransfusional#${id}`] && fContext.touched[`dataTransfusional#${id}`]) ? fContext.errors[`dataTransfusional#${id}`] : null
                    }
                    label="Data"
                    name={`dataTransfusional#${id}`}
                    onBlur={fContext.handleBlur}
                    onChange={fContext.handleChange}
                    type="date"
                    value={infos?.data_transfusao ?? fContext.values[`dataTransfusional#${id}`]}
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : (
        <CircularProgress />
      )}
    </>
  )
};

const DeleteAction = (props) => {
  const classes = useStyles();
  return (
    <IconButton onClick={() => props.onClick()}>
      <DeleteIcon className={classes.deleteIcon} />
    </IconButton >
  )
}
