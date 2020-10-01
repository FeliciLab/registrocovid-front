import React from 'react';
import { Grid } from '@material-ui/core';
import RespiratorySuportItem from '../RespiratorySuportItem/RespiratorySuportItem';

const RespiratorySuportItemList = props => {
  const {list, descricao} = props;

  if (list.length === 0) return null;

  return (
    <Grid
      item
    >
      {list.map((item, index) => (
        <RespiratorySuportItem
          descricao={descricao}
          key={index}
          suporteRespiratorio={item}
        />
      ))}
    </Grid>
  );
}

export default RespiratorySuportItemList;
