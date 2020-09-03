import React, { memo } from 'react';

import PropTypes from 'prop-types';

import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  FormGroup,
  FormLabel,
  TextField,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import useStyles from './styles';

function IRASItem({ iras }) {
  const classes = useStyles();

  return (
    <Accordion>
      <AccordionSummary
        aria-controls="panel1a-content"
        expandIcon={<ExpandMoreIcon />}
        id="panel1a-header"
      >
        <div className={classes.heading}>
          <Typography
            className={classes.headingLabel}
            variant="h4"
          >
            {iras.tipo_iras_descricao}
          </Typography>
          <Typography variant="caption">
            Data da coleta:{' '}
            {iras.data
              .split('-')
              .reverse()
              .join('/')}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {/* data */}
        <Grid
          item
          sm={12}
        >
          <FormGroup>
            <FormLabel>
              <Typography variant="h4">Data</Typography>
            </FormLabel>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              contentEditable={false}
              label="Data"
              type="date"
              value={iras.data}
            />
          </FormGroup>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

IRASItem.propTypes = {
  iras: PropTypes.exact({
    id: PropTypes.number.isRequired,
    data: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    tipo_iras_id: PropTypes.number.isRequired,
    tipo_iras_descricao: PropTypes.string.isRequired,
  }),
};

export default memo(IRASItem);
