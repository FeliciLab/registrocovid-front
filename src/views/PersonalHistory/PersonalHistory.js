import React from 'react';
import useStyles from './styles';

// Material-UI Components
import {
  Typography,
} from '@material-ui/core';

import CustonBreadcrumbs from 'components/CustonBreadcrumbs';
import PatientInfo from 'components/PatientInfo';

const PersonalHistory = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            { label: 'História Pessoal', route: '/categorias/historia-pessoal' },
          ]}
        />
      </div>
      <div className={classes.titleWrapper}>
        <Typography variant="h1">História Pessoal</Typography>

        <PatientInfo />
      </div>
    </div>
  );
}

export default PersonalHistory;
