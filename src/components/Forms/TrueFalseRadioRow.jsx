import React from 'react'
import {
  InputLabel,
  Radio,
  FormControlLabel
} from '@material-ui/core'
import { Field } from 'formik'
import { RadioGroup } from 'formik-material-ui'
import PropTypes from 'prop-types'

const TrueFalseRadioRow = (props) => {
  const {
    classes,
    name,
    label
  } = props

  return (
    <>
      <InputLabel
        className={classes.label}
        htmlFor={name}
      >
        {label}
      </InputLabel>
      <Field
        component={RadioGroup}
        name={name}
        row
      >
        <FormControlLabel
          control={<Radio />}
          label={'Sim'}
          value={'sim'}
        />
        <FormControlLabel
          control={<Radio />}
          label={'Não'}
          value={'nao'}
        />
      </Field>
    </>
  )
}

TrueFalseRadioRow.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default TrueFalseRadioRow