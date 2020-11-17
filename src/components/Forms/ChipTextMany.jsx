import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import {
  TextField,
  FormGroup,
  Chip,
  FormLabel,
  Button
} from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import randomIndex from 'helpers/randomIndex'


const ChipsTexts = ({ name }) => {
  const { setFieldValue, values } = useFormikContext()

  const handleRemove = (item) => {
    const old = values[name] || [item]
    setFieldValue(name, [...old.filter(value => value !== item)])
  }

  return (
    <>
      {values[name].map(item => (
        <Chip
          color="primary"
          key={randomIndex()}
          label={item}
          onDelete={() => handleRemove(item)}
        />
      ))}
    </>
  )
}

ChipsTexts.propTypes = {
  name: PropTypes.string.isRequired
}

const ChipTextMany = ({
  classes,
  name,
  label
}) => {
  const {
    setFieldValue,
    values
  } = useFormikContext()

  const [text, setText] = useState('')

  const handleAdd = () => {
    const old = values[name] || []
    if (old.find(item => item === text)) {
      return
    }

    setFieldValue(name, [...old, text])
    setText('')
  }

  return (
    <>
      <FormGroup className={classes.control} component="fieldset">
        <FormLabel className={classes.label} component="legend">
          {label}
        </FormLabel>

        <div className={classes.buttonWrapper}>
          <TextField
            className={classes.textFieldWithButton}
            label={label}
            value={text}
            onChange={({ target }) => setText(target.value)}
            variant="filled"
          />

          <Button
            className={classes.buttonAdd}
            color="secondary"
            onClick={() => handleAdd()}
            startIcon={<Add />}
            type="button"
            variant="contained"
          >
            Adicionar
          </Button>
        </div>
      </FormGroup>

      <div className={classes.chipWrapper}>
        {<ChipsTexts name={name} />}
      </div>
    </>
  )
}

ChipTextMany.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired
}

export default ChipTextMany