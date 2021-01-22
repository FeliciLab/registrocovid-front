import {
  Button,
  Card,
  FormControl,
  Grid,
  MenuItem,
  Typography,
} from '@material-ui/core';
import GenericDateField from 'components/Forms/GenericDateField';
import GenericNumberField from 'components/Forms/GenericNumberField';
import GenericSelectField from 'components/Forms/GenericSelectField';
import GenericSwitchField from 'components/Forms/GenericSwitchField';
import { Form, useFormikContext } from 'formik';
import React from 'react';
import Gasometria from '../Gasometria';
import useStyles from './styles';

const GeneralInfoForm = props => {
  const classes = useStyles();

  const { patient, instituicoes, tiposSuporteRespiratorio } = props;

  const { values, isSubmitting } = useFormikContext();

  return (
    <Form component={FormControl}>
      <div className={classes.titleWrapper}>
        <Typography variant="h1">Informações Gerais</Typography>
        <Button
          className={classes.buttonSave}
          color="secondary"
          disabled={!!patient.prontuario || isSubmitting}
          type="submit"
          variant="contained"
        >
          Salvar
        </Button>
      </div>
      <Grid
        className={classes.card}
        component={Card}
        container
        item
        lg={8}
        spacing={2}
      >
        <Grid
          item
          md={6}
          sm={12}
        >
          <GenericNumberField
            label="Número do prontuário"
            name="prontuario"
            title="Número do prontuário"
          />
        </Grid>
        <Grid
          item
          md={6}
          sm={12}
        >
          <GenericDateField
            label="Data de internação"
            name="data_internacao"
            title="Data de internação"
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <GenericSelectField
            label="Unidade de Saúde"
            name="unidade_primeiro_atendimento"
            title="Nome do serviço / Unidade de Saúde onde o paciente
                      recebeu o primeiro atendimento"
          >
            {instituicoes.map(({ id, nome }) => (
              <MenuItem
                key={id}
                value={id}
              >
                {nome}
              </MenuItem>
            ))}
          </GenericSelectField>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <GenericSelectField
            label="Unidade de Saúde"
            name="unidade_de_saude"
            title="Nome do serviço / Unidade de Saúde que referenciou o
                      paciente"
          >
            {instituicoes.map(({ id, nome }) => (
              <MenuItem
                key={id}
                value={id}
              >
                {nome}
              </MenuItem>
            ))}
          </GenericSelectField>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <GenericDateField
            name="data_atendimento"
            title="Data do atendimento na unidade que referenciou o
                      paciente"
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <GenericSwitchField
            label="Paciente chegou com suplementação de oxigênio?"
            name="suporte_respiratorio"
          />
          <GenericSelectField
            disabled={!values.suporte_respiratorio}
            label="Tipo suporte respiratorio"
            name="tipo_suport_respiratorio"
            title="Em caso afirmativo, qual o suporte respiratório?"
          >
            {tiposSuporteRespiratorio.map(({ id, nome }) => (
              <MenuItem
                key={id}
                value={id}
              >
                {nome}
              </MenuItem>
            ))}
          </GenericSelectField>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <GenericNumberField
            disabled={!values.suporte_respiratorio}
            name="fluxo_o2"
            title="Fluxo O2"
          />
        </Grid>
        <Grid
          item
          xs={6}
        >
          <GenericNumberField
            disabled={!values.suporte_respiratorio}
            name="fio2"
            title="FiO2"
          />
        </Grid>
        <Gasometria />
        <Grid
          item
          xs={12}
        >
          <GenericNumberField
            endAdornment="mL/24h"
            name="debito_urinario"
            title="Débito urinário nas primeiras 24 horas da internação hospitalar"
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <GenericSwitchField
            label="Paciente chegou traqueostomizado?"
            name="chegou_traqueostomizado"
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <GenericSwitchField
            label="Reinternação?"
            name="reinternacao"
          />
        </Grid>
      </Grid>
    </Form>
  );
};

export default GeneralInfoForm;
