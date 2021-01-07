import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  Switch,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputAdornment,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import formatDate from '../../../../helpers/formatDate';
import useStyles from './styles';

const UTIItem = ({ complicationData, separator }) => {
  const classes = useStyles();

  return (
    <Accordion className={separator ? classes.typeSeparator : ''}>
      <AccordionSummary
        aria-controls="panel1a-content"
        expandIcon={<ExpandMoreIcon />}
        id="panel1a-header"
      >
        <Grid
          className={classes.heading}
          container
        >
          <Grid
            item
            xs={10}
          >
            <Typography
              className={classes.headingLabel}
              variant="h4"
            >
              Admissão na Unidade de Terapia Intensiva (UTI)
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <Typography variant="caption">
              {complicationData ? formatDate(complicationData.data) : ''}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <Grid
          className={classes.gridContainer}
          item
          xs={12}
        >
          <Typography
            className={classes.headingLabel}
            variant="h4"
          >
            Escala de Glasgow
          </Typography>
          <TextField
            className={classes.textField}
            defaultValue={
              complicationData ? complicationData.glasgow_admissao_uti : ''
            }
            InputLabelProps={{
              shrink: true,
            }}
            type="text"
          />
        </Grid>
        <Grid
          className={classes.gridContainer}
          item
          xs={12}
        >
          <Grid
            container
            item
            spacing={2}
          >
            <Grid
              item
              xs={6}
            >
              <Typography
                className={classes.formSubtitle}
                variant="h4"
              >
                Admissão Em UTI
              </Typography>
              <TextField
                defaultValue={complicationData ? complicationData.data : ''}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                label="Data"
                name="admissao_uti"
                type="date"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <Typography
                className={classes.formSubtitle}
                variant="h4"
              >
                Saída de UTI
              </Typography>
              <TextField
                defaultValue={
                  complicationData ? complicationData.data_termino : ''
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                label="Data"
                name="saida_uti"
                type="date"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          spacing={2}
        >
          <Grid
            item
            xs={3}
          >
            <Typography
              className={classes.formSubtitle}
              variant="h4"
            >
              pH
            </Typography>
            <TextField
              name="ph"
              value={complicationData.ph || undefined}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            xs={3}
          >
            <Typography
              className={classes.formSubtitle}
              variant="h4"
            >
              PaO2
            </Typography>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mmHg</InputAdornment>
                ),
              }}
              name="pao2"
              value={complicationData.pao2 || undefined}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            xs={3}
          >
            <Typography
              className={classes.formSubtitle || undefined}
              variant="h4"
            >
              PaCO2
            </Typography>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mmHg</InputAdornment>
                ),
              }}
              name="paco2"
              value={complicationData.paco2 || undefined}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            xs={3}
          >
            <Typography
              className={classes.formSubtitle || undefined}
              variant="h4"
            >
              HCO3
            </Typography>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mEq/L</InputAdornment>
                ),
              }}
              name="hco3"
              value={complicationData.hco3 || undefined}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            xs={3}
          >
            <Typography
              className={classes.formSubtitle}
              variant="h4"
            >
              BE
            </Typography>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mEq/L</InputAdornment>
                ),
              }}
              name="be"
              value={complicationData.be || undefined}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            xs={3}
          >
            <Typography
              className={classes.formSubtitle || undefined}
              variant="h4"
            >
              SaO2
            </Typography>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                ),
              }}
              name="sao2"
              value={complicationData.sao2 || undefined}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            xs={3}
          >
            <Typography
              className={classes.formSubtitle}
              variant="h4"
            >
              Lactato
            </Typography>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mmol/L</InputAdornment>
                ),
              }}
              name="lactato"
              value={complicationData.lactato || undefined}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography
              className={classes.formSubtitle}
              variant="h4"
            >
              Débito urinário nas primeiras 24 horas da admissão da UTI
            </Typography>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mL/24h</InputAdornment>
                ),
              }}
              name="lactato"
              value={complicationData.debito_urinario || undefined}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Typography
            className={classes.formSubtitle}
            variant="h4"
          >
            Paciente permaneceu menos de 24h na UTI?
          </Typography>
          <Switch
            checked={complicationData && complicationData.menos_24h_uti}
            color="primary"
            name="menos_24h_uti"
          />
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default UTIItem;
