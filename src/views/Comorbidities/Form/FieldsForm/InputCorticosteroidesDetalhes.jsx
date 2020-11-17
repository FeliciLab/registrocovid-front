import React, { useEffect, useState } from 'react'
import { useFormikContext } from 'formik'
import CheckboxLabel from 'components/Forms/CheckboxLabel'
import DatasRequests from 'services/requests/datasRequests'
import setDefaultCheckboxValues from 'helpers/defaultCheckboxValues'

const InputCorticosteroidesDetalhes = ({ classes }) => {
  const [corticosteroides, setCorticosteroides] = useState([])
  const { values, setFieldValue } = useFormikContext()

  const handleEffect = () => {
    DatasRequests.buscarCorticosteroides()
      .then(result => {
        setCorticosteroides([...result])
        setDefaultCheckboxValues(
          [...result],
          values.corticosteroides || [],
          'corticosteroides',
          setFieldValue
        )
      })
  }

  useEffect(handleEffect, [])

  return (
    <CheckboxLabel
      classes={classes}
      name="corticosteroides"
      label="Quais corticosteroides?"
      opcoes={corticosteroides}
    />
  )
}

export default InputCorticosteroidesDetalhes