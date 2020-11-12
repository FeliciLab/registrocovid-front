import React, { useEffect, useState } from 'react'
import CheckboxLabel from 'components/Forms/CheckboxLabel'
import DatasRequests from 'services/requests/datasRequests'

const InputCorticosteroidesDetalhes = ({classes}) => {
  const [corticosteroides, setCorticosteroides] = useState([])

  const handleEffect = () => {
    DatasRequests.buscarCorticosteroides()
      .then(result => setCorticosteroides([...result]))
  }
  useEffect(() => {
    handleEffect()
  }, [])

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