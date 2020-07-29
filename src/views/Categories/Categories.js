import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles';

// Icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// Material-UI Components
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  Breadcrumbs,
  Link as MuiLink,
  CircularProgress,
} from '@material-ui/core';

const Categories = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={
            <NavigateNextIcon fontSize="small" />
          }
        >
          <MuiLink
            color="textPrimary"
            component={Link}
            to="/meus-pacientes"
          >
            Meus pacientes
          </MuiLink>
          <MuiLink
            color="textPrimary"
            component={Link}
            to="/categorias"
          >
            Categorias
          </MuiLink>
        </Breadcrumbs>
      </div>
      <div className={classes.titleWrapper}>
        <Typography variant="h1">Categorias</Typography>
      </div>
    </div>
  );
}

export default Categories;
