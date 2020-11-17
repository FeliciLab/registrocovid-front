import React, { createContext, useState } from 'react'

export const FormComorbidadeContext = createContext()

const FormComorbidadeProvider = ({
  initValues, 
  children
}) => {
  const [initFormValues, setInitFormValues] = useState(initValues || {})

  const actions = {
    setInitValues: setInitFormValues
  }

  const valuesProvider = {
    initValues: initFormValues, 
    actions
  }

  return <FormComorbidadeContext.Provider
    value={valuesProvider}
  >
    {children}
  </FormComorbidadeContext.Provider>
}

export default FormComorbidadeProvider 