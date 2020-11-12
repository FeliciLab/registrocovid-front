import React, { useEffect, useState } from 'react'
import {
  Grid
} from '@material-ui/core'
import {
  useFormikContext
} from 'formik'
import InputDoencaAdicionalDetalhe from 'views/Comorbidities/Form/FieldsForm/InputDoencaAdicionalDetalhe'
import DatasRequests from 'services/requests/datasRequests'
import randomIndex from 'helpers/randomIndex'

const InputDoencasAdicionaisDetalhes = () => {
  const [listaDoencas, setListaDoencas] = useState([])
  const { values } = useFormikContext()

  const handleEffect = () => {
    DatasRequests.buscarDoencas()
      .then(result => {
        setListaDoencas([...result])
      })
  }

  useEffect(() => {
    handleEffect()
  }, [])

  const getDoencas = (tipoDoenca) => {
    return listaDoencas.filter((item) => item.tipo_doenca_id === tipoDoenca.id)
  }

  if (listaDoencas.length === 0 || (values && (!values.tipo_doencas || (values.tipo_doencas &&  values.tipo_doencas.length <= 0)))) {
    return (<></>);
  }

  return (<Grid container spacing={4}>
    {values.tipo_doencas.map((tipoDoenca) => (
      <Grid item xs={12} key={randomIndex()}>
        <InputDoencaAdicionalDetalhe
          header={tipoDoenca.descricao}
          doencas={getDoencas(tipoDoenca)}
          tipoDoenca={tipoDoenca}
        />
      </Grid>
    ))}
  </Grid>)
}

export default InputDoencasAdicionaisDetalhes