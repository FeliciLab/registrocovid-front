import React from 'react';

import { IconButton } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from '../styles';

const DeleteAction = ({ onClick }) => {
  const classes = useStyles();

  return (
    <IconButton
      aria-label="delete"
      onClick={() => onClick()}
    >
      <DeleteIcon className={classes.deleteIcon} />
    </IconButton >
  )
}

export default DeleteAction;
