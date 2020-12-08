import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { useFormikContext } from 'formik';
import TrueFalseRadioRow from 'components/Forms/TrueFalseRadioRow';
import InputNumberLabel from 'components/Forms/InputNumberLabel';
import ChipTextMany from 'components/Forms/ChipTextMany';
import InputDoencas from 'views/Comorbidities/Form/FieldsForm/InputDoencas';
import InputDoencasAdicionais from 'views/Comorbidities/Form/FieldsForm/InputDoencasAdicionais';
import InputDoencasAdicionaisDetalhes from 'views/Comorbidities/Form/FieldsForm/InputDoencasAdicionaisDetalhes';
import InputOrgaosTransplantados from 'views/Comorbidities/Form/FieldsForm/InputOrgaosTransplantados';
import InputCorticosteroidesDetalhes from 'views/Comorbidities/Form/FieldsForm/InputCorticosteroidesDetalhes';
import useStyle from '../styles';

const FormBodyComorbidade = () => {
  const classes = useStyle();
  const { values } = useFormikContext();

  return (
    <>
      <Grid
        className={classes.paper}
        component={Paper}
        container
        item
        spacing={2}
        xs={8}
      >
        <Grid
          item
          xs={12}
        >
          <InputDoencas />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <InputDoencasAdicionais />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <InputDoencasAdicionaisDetalhes />
        </Grid>

        <Grid
          item
          xs={12}
        >
          <TrueFalseRadioRow
            classes={classes}
            label="Quimioterapia"
            name="quimioterapia"
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <TrueFalseRadioRow
            classes={classes}
            label="Transplantado"
            name="transplantado"
          />
        </Grid>
        {values.transplantado === 'sim' && (
          <Grid
            item
            xs={12}
          >
            <InputOrgaosTransplantados />
          </Grid>
        )}

        <Grid
          item
          xs={12}
        >
          <TrueFalseRadioRow
            classes={classes}
            label="Faz uso crônico de corticóides?"
            name="corticosteroide"
          />
        </Grid>

        {values.corticosteroide === 'sim' && (
          <Grid
            item
            xs={12}
          >
            <InputCorticosteroidesDetalhes classes={classes} />
          </Grid>
        )}

        <Grid
          item
          xs={12}
        >
          <TrueFalseRadioRow
            classes={classes}
            label="Gestação"
            name="gestacao"
          />
        </Grid>
        {values.gestacao === 'sim' && (
          <Grid
            item
            xs={12}
          >
            <InputNumberLabel
              classes={classes}
              label="Há quantas semanas?"
              name="gestacao_semanas"
            />
          </Grid>
        )}
        <Grid
          item
          xs={12}
        >
          <TrueFalseRadioRow
            classes={classes}
            label="Puerpério"
            name="puerperio"
          />
        </Grid>
        {values.puerperio === 'sim' && (
          <Grid
            item
            xs={12}
          >
            <InputNumberLabel
              classes={classes}
              label="Há quantas semanas?"
              name="puerperio_semanas"
            />
          </Grid>
        )}
        <Grid
          item
          xs={12}
        >
          <ChipTextMany
            classes={classes}
            label="Outras condições"
            name="outras_condicoes"
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <ChipTextMany
            classes={classes}
            label="Medicações de uso contínuo"
            name="medicacoes"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default FormBodyComorbidade;
