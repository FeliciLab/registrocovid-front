import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Field, useFormikContext } from 'formik'
import { CheckboxWithLabel } from 'formik-material-ui'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import randomIndex from 'helpers/randomIndex'

const InputDoencaAdicionalDetalhe = (props) => {
  const { header, doencas, tipoDoenca } = props
  const { setFieldValue, values } = useFormikContext()

  const removerDoencas = () => {
    const old = values.doencas
    const novo = Object.keys(old)
      .filter(o => !doencas.find(d => d.id.toString() === o))
      .reduce((acc, curr) => {
        acc[curr] = old[curr]
        return acc
      }, {})

    setFieldValue('doencas', { ...novo })
  }

  const removerTipoDoenca = (tipoDoenca) => {
    const tipos = values.tipo_doencas.filter(item => item.id !== tipoDoenca.id)
    setFieldValue('tipo_doencas', [...tipos])
    removerDoencas()
  }

  if (doencas.length === 0) {
    return <></>
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h4" >
                  {header}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton aria-label="delete" onClick={() => removerTipoDoenca(tipoDoenca)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" >
              Selecione a(s) doença(s) que o paciente apresenta
            </Typography >
          </Grid>
          <Grid item xs={12}>
            {doencas.map((doenca) => {
              const name = `doencas.${doenca.id}`
              return (
                <Field
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name={name}
                  key={randomIndex()}
                  Label={{ label: doenca.descricao }}
                />
              )
            })}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

InputDoencaAdicionalDetalhe.defaultProps = {
  header: PropTypes.string.isRequired,
  doencas: PropTypes.array.isRequired
}

export default memo(InputDoencaAdicionalDetalhe);
