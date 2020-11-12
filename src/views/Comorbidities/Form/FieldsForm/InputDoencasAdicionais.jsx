import React, { useState, useEffect } from 'react'
import {
  TextField,
  Grid,
  InputLabel,
  MenuItem,
  Button
} from '@material-ui/core'
import {
  useFormikContext
} from 'formik'
import Add from '@material-ui/icons/Add'
import useStyle from 'views/Comorbidities/styles'
import DatasRequests from 'services/requests/datasRequests'
import randomIndex from 'helpers/randomIndex'

const InputDoencasAdicionais = () => {
  const classes = useStyle()

  const [doenca, setDoenca] = useState('')
  const [tiposDoencas, setTiposDoencas] = useState([])

  const { setFieldValue, values } = useFormikContext()

  const getTiposDoencas = () => {
    return DatasRequests.buscarTiposDoencas()
      .then((result) => {
        setTiposDoencas([...result])
      })
      .catch(err => console.log('deu ruim', err))
      // .catch(() => showToast({
        // message: 'Ocorreu um erro ao carregar os tipos de doenças, por favor tente novamente.'
      // }));
  }

  useEffect(() => {
    getTiposDoencas()
  }, [])

  const handleAdd = () => {
    const tipo_doencas = values.tipo_doencas || []
    if (tipo_doencas.find(item => item.id === doenca)) {
      return
    }

    setFieldValue('tipo_doencas', [...tipo_doencas, tiposDoencas.find(item => item.id === doenca)])
    setFieldValue(`doenca_${doenca.id}`, true)
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InputLabel className={classes.label} htmlFor="diseaseTypeSelect">
              Acrescente outras doenças que o paciente apresenta
          </InputLabel>
        </Grid>

        <Grid item xs={12}>
          <Grid alignItems={'center'} container>
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                className={classes.textFieldWithButton}
                label="Escolher tipo de doença"
                select
                value={doenca}
                onChange={(e) => setDoenca(e.target.value)}
                variant="filled"
              >
                {tiposDoencas.map(({ id, descricao }) => (
                  <MenuItem 
                    key={randomIndex()} 
                    value={id}
                  >
                    {descricao}
                  </MenuItem>
                  ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Button
                  className={classes.buttonAdd}
                  color="secondary"
                  disabled={doenca < 0 || doenca === '' || doenca === undefined}
                  onClick={() => handleAdd()}
                  startIcon={<Add />}
                  type="button"
                  variant="contained"
              >
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default InputDoencasAdicionais