import React from 'react'
import { useFormikContext } from 'formik';
import useStyle from 'views/Comorbidities/styles'
import {
  InputLabel,
  Chip,
} from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import CancelIcon from '@material-ui/icons/Cancel'
import randomIndex from 'helpers/randomIndex'

const InputDoencas = () => {
  const classes = useStyle()
  const { values, setFieldValue } = useFormikContext();

  const doencas = [
    { id: 'diabetes', label: 'Diabetes' },
    { id: 'obesidade', label: 'Obesidade' },
    { id: 'hipertensao', label: 'Hipertensão' },
    { id: 'HIV', label: 'HIV Positivo' },
    { id: 'tuberculose', label: 'Tuberculose' }
  ];

  const getColorChip = (d) => values[d] ? 'primary' : 'default'
  const getIconChip = (d) => values[d] ? <DoneIcon /> : <></>
  const getDeleteIcon = (d) => values[d] ? <CancelIcon /> : <></>

  return (
    <>
      <InputLabel
        className={classes.label}
        htmlFor="chips"
      >
        Selecione as doenças que o paciente apresenta
      </InputLabel>
      <div
        className={classes.chipWrapper}
        id="chips"
      >
        {doencas.map(({ id, label }) => (
          <Chip
            key={randomIndex()}
            color={getColorChip(id)}
            icon={getIconChip(id)}
            label={label}
            onClick={() => setFieldValue(id, !values[id])}
            onDelete={() => setFieldValue(id, !values[id])}
            deleteIcon={getDeleteIcon(id)}
            clickable
          />
        ))}
      </div>
    </>
  )
}

export default InputDoencas