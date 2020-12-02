import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import PatientInfo from 'components/PatientInfo';
import { useParams } from 'react-router-dom';
import DailyEvolutionBreadcrumbs from './components/DailyEvolutionBreadcrumbs';
import useStyles from './styles';
import DailyEvolutionForm from './components/DailyEvolutionForm';
import useQuery from 'hooks/useQuery';
import RespiratorySuportItemList from './components/RespiratorySuportItemList';
import {
  buscarTiposSuporteRespiratorio,
  buscarSuportesRespiratorios,
} from 'services/requests/datasRequests';

const DailyEvolution = () => {
  const classes = useStyles();

  const { id } = useParams();

  const query = useQuery();
  const date = query.get('date');

  // ref para o Fomulário
  const formRef = useRef(null);

  /// TODO: saber ainda o que vou fazer com isso
  const disableSaveButton = false;

  const [tiposSuportesRespiratorios, setTiposSuportesRespiratorios] = useState(
    [],
  );

  const handleFetchTiposSuportesRespiratorios = useCallback(async () => {
    try {
      const response = await buscarSuportesRespiratorios(id, date);
      setTiposSuportesRespiratorios.set(response);
      console.log(response);
    } catch (error) {
      // TODO: melhorar isso aqui
      console.log(error);
    }
  }, [id, date]);

  // TODO: colocar aqui para buscar peli id o paciente e pela data
  const handleFetchSuportesRespiratorios = useCallback(async () => {
    try {
      const response = await buscarTiposSuporteRespiratorio();
      setTiposSuportesRespiratorios.set(response);
      console.log(response);
    } catch (error) {
      // TODO: melhorar isso aqui
      console.log(error);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    formRef.current.handleSubmit();
  }, []);

  useEffect(() => {
    handleFetchTiposSuportesRespiratorios();
  }, [handleFetchTiposSuportesRespiratorios]);

  useEffect(() => {
    handleFetchSuportesRespiratorios();
  }, [handleFetchSuportesRespiratorios]);

  return (
    <div className={classes.root}>
      <DailyEvolutionBreadcrumbs id={id} />
      <div>
        <div className={classes.titleWrapper}>
          <Typography variant="h3">Evolução diária</Typography>
          <div className={classes.rightContent}>
            <PatientInfo />
            <Button
              className={classes.buttonSave}
              color="secondary"
              disabled={disableSaveButton}
              onClick={handleSubmit}
              type="submit"
              variant="contained"
            >
              Salvar
            </Button>
          </div>
        </div>
        <DailyEvolutionForm ref={formRef} />

        {tiposSuportesRespiratorios.map((tipo, index) => (
          <RespiratorySuportItemList
            descricao="Teste"
            key={index}
            list={[]}
          />
        ))}
      </div>
    </div>
  );
};

export default DailyEvolution;
