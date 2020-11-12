import React, { useState, useEffect } from 'react'
import CheckboxLabel from 'components/Forms/CheckboxLabel'
import DataRequest from 'services/requests/datasRequests'
import useStyle from 'views/Comorbidities/styles'

const InputOrgaosTransplantados = () => {
  const classes = useStyle()
  const [orgaos, setOrgaos] = useState([])

  const handleEffect = () => {
    DataRequest.buscarOrgaos()
      .then(result => setOrgaos([...result]))
  }

  useEffect(() => {
    handleEffect()
  }, [])

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