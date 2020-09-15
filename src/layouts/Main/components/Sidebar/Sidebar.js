import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer, Typography } from '@material-ui/core';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import PeopleIcon from '@material-ui/icons/People';
// import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
// import TextFieldsIcon from '@material-ui/icons/TextFields';
// import ImageIcon from '@material-ui/icons/Image';
// import AccountBoxIcon from '@material-ui/icons/AccountBox';
// import SettingsIcon from '@material-ui/icons/Settings';
// import LockOpenIcon from '@material-ui/icons/LockOpen';
import { IconButton } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import PeopleIcon from '@material-ui/icons/People';
import useAuth from 'context/hooks/useAuth';
import Button from '@material-ui/core/Button';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
  signOutButton: {
    marginTop: 'auto',
  },
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const { handleLogout } = useAuth();

  const classes = useStyles();

  const pages = [
    // {
    //   title: 'Dashboard',
    //   href: '/dashboard',
    //   icon: <DashboardIcon />
    // },
    // {
    //   title: 'Users',
    //   href: '/users',
    //   icon: <PeopleIcon />
    // },
    // {
    //   title: 'Products',
    //   href: '/products',
    //   icon: <ShoppingBasketIcon />
    // },
    {
      title: 'Meus pacientes',
      href: '/meus-pacientes',
      icon: <PeopleIcon />,
    },
    // {
    //   title: 'Authentication',
    //   href: '/sign-in',
    //   icon: <LockOpenIcon />
    // },
    // {
    //   title: 'Typography',
    //   href: '/typography',
    //   icon: <TextFieldsIcon />
    // },
    // {
    //   title: 'Icons',
    //   href: '/icons',
    //   icon: <ImageIcon />
    // },
    // {
    //   title: 'Account',
    //   href: '/account',
    //   icon: <AccountBoxIcon />
    // },
    // {
    //   title: 'Settings',
    //   href: '/settings',
    //   icon: <SettingsIcon />
    // },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}>
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />

        <Button
          className={classes.signOutButton}
          color="primary"
          onClick={handleLogout}
          startIcon={<InputIcon />}>
          SAIR
        </Button>
        {/* <UpgradePlan /> */}
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
