import React, { useState } from 'react';
import { Card, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './styles';
import PropTypes from 'prop-types';

function CardInfo({ title, items }) {
  const classes = useStyles();

  const [showCard, setShowCard] = useState(true);

  if (!showCard) {
    return null;
  }

  return (
    <Card className={classes.cardInfo}>
      <div className={classes.titleContainer}>
        <Typography
          className={classes.title}
          variant="subtitle1"
        >
          {title}
        </Typography>

        <IconButton
          aria-label="delete"
          onClick={() => setShowCard(state => !state)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>

      {items.map((item, index) => (
        <div
          key={index}
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <Typography
            className={classes.label}
            variant="subtitle1"
          >
            {item.label}
          </Typography>
          <Typography
            className={classes.description}
            variant="subtitle1"
          >
            {item.description}
          </Typography>
        </div>
      ))}
    </Card>
  );
}

CardInfo.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
  title: PropTypes.string,
};

export default CardInfo;
