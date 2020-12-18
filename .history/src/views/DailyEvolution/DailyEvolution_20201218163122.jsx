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
import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';

const DailyEvolution = () => {
  const classes = useStyles();

  const { id } = useParams(); // esse é o id da Evolução Diária

  const { patient } = usePatient(); // dados do paciente

  const { addToast } = useToast();

  // ref para o Fomulário
  const formRef = useRef(null);

  const disableSaveButton = !!id;

  const [tiposSuportesRespiratorios, setTiposSuportesRespiratorios] = useState(
    [],
  );

  const [suportesRespiratorios, setSuportesRespiratorios] = useState([]);
  const [desmames, setDesmames] = useState([]);
  const [pronacoes, setPronacoes] = useState([]);

  const handleFetchTiposSuportesRespiratorios = useCallback(async () => {
    try {
      const response = await buscarTiposSuporteRespiratorio();
      setTiposSuportesRespiratorios(response);
    } catch (error) {
      console.log(error);
      addToast({
        type: 'error',
        message: 'Erro ao tentar carregar os tipos de Suporte Respiratório',
      });
    }
  }, [addToast]);

  const handleSubmit = useCallback(() => {
    formRef.current.handleSubmit();
  }, []);

  useEffect(() => {
    handleFetchTiposSuportesRespiratorios();
  }, [handleFetchTiposSuportesRespiratorios])

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
        <DailyEvolutionForm
          ref={formRef}
          tiposSuportesRespiratorios={tiposSuportesRespiratorios}
        />

        {tiposSuportesRespiratorios.map((tipo, index) => (
          <RespiratorySuportItemList
            descricao={tipo.descricao}
            key={index}
            list={suportesRespiratorios}
          />
        ))}

        <RespiratorySuportItemList
          descricao="Pronação"
          list={pronacoes}
        />

        <RespiratorySuportItemList
          descricao="Desmames"
          list={desmames}
        />
      </div>
    </div>
  );
};

export default DailyEvolution;
