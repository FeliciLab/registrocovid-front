import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { useFormikContext, Field, FieldArray } from 'formik'
import { TextField, CheckboxWithLabel } from 'formik-material-ui'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  InputLabel
} from '@material-ui/core'

const Diseases = (props) => {
  console.log(props)

  return (
    <Grid
      item
      xs={12}
    >
      <Card>
        <CardHeader
          title={props.header}
          titleTypographyProps={{variant: 'h2'}}
        />
        <CardContent>
          <InputLabel htmlFor={props.header} >
            Selecione a(s) doença(s) que o paciente apresenta
          </InputLabel>
          <FieldArray
            id={props.header}
            name={'doencas'}
            render={() => (
              props.doencas.map((doenca, index) =>
                (<Field
                  Label={{ label: doenca.descricao }}
                  component={CheckboxWithLabel}
                  key={index}
                  name={`doencas.${doenca.id - 1}`}
                  type={'checkbox'}
                />)
              )
            )}
          />
        </CardContent>
      </Card>
      
    </Grid>
      
  )
}

Diseases.defaultProps = {
  header: PropTypes.string.isRequired,
  doencas: PropTypes.array.isRequired
}
export default memo(Diseases);