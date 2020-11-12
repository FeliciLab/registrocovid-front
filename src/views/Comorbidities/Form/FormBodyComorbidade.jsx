import React from 'react'
import {
  Grid,
  Paper
} from '@material-ui/core'
import {
  useFormikContext
} from 'formik'
import TrueFalseRadioRow from 'components/Forms/TrueFalseRadioRow'
import InputNumberLabel from 'components/Forms/InputNumberLabel'
import ChipTextMany from 'components/Forms/ChipTextMany'
import InputDoencas from 'views/Comorbidities/Form/FieldsForm/InputDoencas'
import InputDoencasAdicionais from 'views/Comorbidities/Form/FieldsForm/InputDoencasAdicionais'
import InputDoencasAdicionaisDetalhes from 'views/Comorbidities/Form/FieldsForm/InputDoencasAdicionaisDetalhes'
import InputOrgaosTransplantados from 'views/Comorbidities/Form/FieldsForm/InputOrgaosTransplantados'
import InputCorticosteroidesDetalhes from 'views/Comorbidities/Form/FieldsForm/InputCorticosteroidesDetalhes'
import useStyle from '../styles'

const FormBodyComorbidade = () => {
  const classes = useStyle()
  const { values } = useFormikContext()

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
        <Grid item xs={12}>
          <InputDoencas />
        </Grid>
        <Grid item xs={12}>
          <InputDoencasAdicionais />
        </Grid>
        <Grid item xs={12}>
          <InputDoencasAdicionaisDetalhes />
        </Grid>


        <Grid item xs={12}>
          <TrueFalseRadioRow
            name='quimioterapia'
            label='Quimioterapia'
            classes={classes}
          />
        </Grid>
        <Grid item xs={12}>
          <TrueFalseRadioRow
            name='transplantado'
            label='Transplantado'
            classes={classes}
          />
        </Grid>
        {values.transplantado === 'sim' && (
          <Grid item xs={12}>
            <InputOrgaosTransplantados />
          </Grid>
        )}

        <Grid item xs={12}>
          <TrueFalseRadioRow
            name='corticosteroide'
            label='Faz uso crônico de corticóides?'
            classes={classes}
          />
        </Grid>

        {values.corticosteroide === 'sim' && (
          <Grid item xs={12}>
            <InputCorticosteroidesDetalhes classes={classes} />
          </Grid>
        )}

        <Grid item xs={12}>
          <TrueFalseRadioRow
            name="gestacao"
            label="Gestação"
            classes={classes}
          />
        </Grid>


        {values.gestacao === 'sim' && (
          <Grid item xs={12}>
            <InputNumberLabel
              name="gestacao_semanas"
              label="Há quantas semanas?"
              classes={classes}
            />
          </Grid>
        )}


        <Grid item xs={12}>
          <TrueFalseRadioRow
            name="puerperio"
            label="Puerpério"
            classes={classes}
          />
        </Grid>

        {values.puerperio === 'sim' && (
          <Grid item xs={12}>
            <InputNumberLabel
              name="puerperio_semanas"
              label="Há quantas semanas?"
              classes={classes}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <ChipTextMany
            classes={classes}
            name="outras_condicoes"
            label="Outras condições"
          />
        </Grid>

        <Grid item xs={12}>
          <ChipTextMany
            classes={classes}
            name="medicacoes"
            label="Medicações de uso contínuo"
          />
        </Grid>
      </Grid>
    </>
  )
}

export default FormBodyComorbidade
