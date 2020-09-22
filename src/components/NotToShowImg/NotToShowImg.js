import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  image: {
    marginBottom: theme.spacing(4),
  },
}));

/**
 * Componete para mostar uma IMG quando não tem nada para mostar.
 */
const NotToShowImg = props => {
  const { label } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        alt="nenhum paciente cadastrado"
        className={classes.image}
        src="/images/not_to_show.svg"
      />
      <Typography
        className={classes.label}
        variant="h2"
      >
        {label}
      </Typography>
    </div>
  );
};

NotToShowImg.propTypes = {
  label: PropTypes.string.isRequired,
};

export default NotToShowImg;
