import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  FormLabel,
  MenuItem,
  TextField,
  Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import useStyles from '../styles';
import api from 'services/api';

const FormAddNewComplication = ({ onSubmit }) => {
  const classes = useStyles();

  const [complicationsTypes, setComplicationsTypes] = useState([]);
  const [complication, setComplication] = useState(0);

  const handleEffect = () => {
    api.get('/tipos-complicacao-vm')
      .then((result) => {
        setComplicationsTypes([ 
          {
            id: 0, 
            descricao: 'Escolher tipo de complicação (ventilação mecânica)'
          },
          ...result.data
        ])
      });
  }

  useEffect(() => handleEffect(), [])

  return (
    <>
      <Grid 
        container 
        justify="center"
      >
        <Grid
          item
          xs={12}
        >
          <FormLabel>
            <Typography variant="h4">
              Escolher tipo de complicação (ventilação mecânica):
            </Typography>
          </FormLabel>
        </Grid>

        <Grid 
          item 
          lg={8}
        >
          <TextField
            className={classes.selectField}
            id="standard-select-currency"
            onChange={(event) => setComplication(event.target.value)}
            select
            value={complication}
            variant="outlined"
          >
            {complicationsTypes.map((option) => (
              <MenuItem 
                key={option.id} 
                value={option.id}
              >
                {option.descricao}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        
        <Grid
          item
          lg={4}
        >
          <Button
            className={classes.buttonSave}
            color="secondary"
            onClick={() => {
              if (complication === 0) {
                return false;
              }

              return onSubmit({ id: complication, value: complication });
            }}
            startIcon={<AddIcon />}
            type="button"
            variant="contained"
          >
            Adicionar Ocorrência
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FormAddNewComplication;
