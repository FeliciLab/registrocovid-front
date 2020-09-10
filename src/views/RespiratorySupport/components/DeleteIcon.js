import React from 'react';

import { IconButton } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from '../styles';

const DeleteAction = (props) => {
  const classes = useStyles();

  return (
    <IconButton onClick={() => props.onClick()}>
      <DeleteIcon className={classes.deleteIcon} />
    </IconButton >
  )
}

export default DeleteAction;
