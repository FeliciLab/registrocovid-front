import React, { useState, useEffect } from 'react'
import { useFormikContext } from 'formik'
import CheckboxLabel from 'components/Forms/CheckboxLabel'
import DataRequest from 'services/requests/datasRequests'
import useStyle from 'views/Comorbidities/styles'
import setDefaultCheckboxValues from 'helpers/defaultCheckboxValues'

const InputOrgaosTransplantados = () => {
  const classes = useStyle()
  const [orgaos, setOrgaos] = useState([])
  const { values, setFieldValue } = useFormikContext()

  const handleEffect = () => {
    DataRequest.buscarOrgaos()
      .then(result => {
        setOrgaos([...result])
        setDefaultCheckboxValues(
          [...result],
          values.orgaos || [],
          'orgaos',
          setFieldValue
        )
      })
  }

  useEffect(handleEffect, [])

  return (
    <CheckboxLabel
      name="orgaos"
      label="Quais órgãos?"
      opcoes={orgaos}
      classes={classes}
    />
  )
}

export default InputOrgaosTransplantados