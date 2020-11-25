import React, { forwardRef, useImperativeHandle } from 'react';

const DailyEvolutionForm = (props, ref) => {
  useImperativeHandle(ref, () => {
    return {};
  });

  return <h1>Teste Form</h1>;
};

export default forwardRef(DailyEvolutionForm);
