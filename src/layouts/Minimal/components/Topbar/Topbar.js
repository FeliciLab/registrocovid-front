import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none'
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImg: {
    marginRight: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/" className={classes.logoLink}>
          <img className={classes.logoImg}
            alt="Logo"
            src="/images/logos/logo-registro-covid.svg"
          />
          <Typography variant="h3" color="initial">
            Registro Covid
          </Typography>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
