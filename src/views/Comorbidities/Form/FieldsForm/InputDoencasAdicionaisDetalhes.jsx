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
import setDefaultCheckboxValues from 'helpers/defaultCheckboxValues'

const InputDoencasAdicionaisDetalhes = () => {
  const [listaDoencas, setListaDoencas] = useState([])
  const { setFieldValue, values } = useFormikContext()

  const handleEffect = () => {
    DatasRequests.buscarDoencas()
      .then(result => {
        setListaDoencas([...result])
        setDefaultCheckboxValues(
          [...result], values.doencas || [],
          'doencas',
          setFieldValue
        )
      })
  }

  useEffect(handleEffect, [])

  const getDoencas = (tipoDoenca) => {
    const doencas = listaDoencas.filter((item) => item.tipo_doenca_id === tipoDoenca.id)
    return [...doencas]
  }

  if (listaDoencas.length === 0 || (values && (!values.tipo_doencas || (values.tipo_doencas && values.tipo_doencas.length <= 0)))) {
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