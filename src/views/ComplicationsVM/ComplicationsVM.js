import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useHistory } from 'react-router-dom';

import {
  Typography,
  Button,
  CircularProgress,
  Paper,
  Grid,
  FormGroup,
  FormLabel,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import CustonBreadcrumbs from 'components/CustonBreadcrumbs';
import PatientInfo from 'components/PatientInfo';
import Form from './components/Form';

import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';

import Complications from './components';

import api from 'services/api';

import useStyles from './styles';

const ComplicationsVM = () => {
  const classes = useStyles();
  const history = useHistory();
  const { addToast } = useToast();
  const { patient } = usePatient();

  const formRef = useRef(null);
  const selectedComplication = useRef();

  const [loading, setLoading] = useState(false);
  const [complicationsTypes, setComplicationsTypes] = useState([]);
  const [oldsComplications, setOldsComplications] = useState([]);
  const [transfusions, setTransfusions] = useState([]);
  const [newsComplications, setNewsComplications] = useState([]);
  const [complicationId, setComplicationId] = useState(0)

  const handleInfos = useCallback(async () => {
    try {
      setLoading(true);

      const [complications, complicationsPatient] = await Promise.all([
        api.get('/tipos-complicacao-vm'),
        api.get(`pacientes/${patient.id}/ventilacao-mecanica`)
      ]);

      setComplicationsTypes(complications.data);
      setOldsComplications(complicationsPatient.data.complicacoes_ventilacao_mecanica);
      setTransfusions(complicationsPatient.data.transfussoes_ocorrencia);
    } catch {
      addToast({
        type: 'error',
        message: 'Erro ao tentar carregar informações, tente novamente',
      });

      history.goBack();
    } finally {
      setLoading(false);
    }
  }, [addToast, history, patient.id]);

  useEffect(() => {
    handleInfos();
  }, [handleInfos]);

  const handleSelect = (event) => {
    selectedComplication.current = event.target.value;
  };

  const handleNewComplication = () => {
    if (selectedComplication.current) {
      const newComplication = {
        id: complicationId,
        complication: selectedComplication.current
      };

      setComplicationId(oldState => oldState + 1);
      setNewsComplications(oldState => [newComplication, ...oldState]);
    }
  };

  const handleDelete = (complicationId) => {
    const updatedComplications = newsComplications.filter(({ id }) => id !== complicationId);

    setNewsComplications(updatedComplications);
  };

  const handleSubmit = () => {
    formRef.current.submit();
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            { label: 'Complicações relacionadas à ventilação mecânica', route: '/categorias/complicacoes-vm' },
          ]}
        />
      </div>

      <div>
        <div className={classes.titleWrapper}>
          <Typography variant="h1">Complicações</Typography>

          <div className={classes.rightContent}>
            <PatientInfo />

            <Button
              className={classes.buttonSave}
              color="secondary"
              onClick={handleSubmit}
              type="submit"
              variant="contained"
            >
              Salvar
            </Button>
          </div>
        </div>

        {loading ? <CircularProgress /> : (
          <div className="container">
            <Grid
              container
              justify={'center'}
            >
              <Paper className={classes.centralPaper}>
                <FormLabel>
                  <Typography variant="h4">Escolher tipo de complicação (ventilação mecânica):</Typography>
                </FormLabel>

                <div className={classes.headerForm}>
                  <Grid
                    item
                    lg={8}
                  >
                    <FormGroup>
                      <FormControl variant={'outlined'}>
                        <Select
                          className={classes.selectField}
                          name="complication"
                          onChange={handleSelect}
                          value={selectedComplication.current}
                        >
                          <MenuItem
                            disabled
                            value={0}
                          >
                            Escolher tipo de complicação (ventilação mecânica)
                          </MenuItem>
                          {complicationsTypes.map((complication) => (
                            <MenuItem
                              key={complication.id}
                              value={complication.id}
                            >
                              {complication.descricao}
                            </MenuItem>
                          )
                          )}
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Grid>

                  <Grid
                    item
                    lg={4}
                  >
                    <Button
                      className={classes.buttonSave}
                      color="secondary"
                      onClick={handleNewComplication}
                      type="button"
                      variant="contained"
                    >
                      <AddIcon style={{ marginRight: 8 }} />
                      Adicionar Ocorrência
                    </Button>
                  </Grid>

                </div>

                <Form
                  className={classes.examsFormGroup}
                  ref={formRef}
                >
                  {newsComplications.map((item) => (
                    <Complications
                      handleDelete={() => handleDelete(item.id)}
                      id={item.id}
                      isNew
                      key={String(item.id)}
                      newComplication={item.complication}
                      visible
                    />
                  ))}

                  {oldsComplications?.map((item) => (
                    <Complications
                      id={item.id}
                      infos={item}
                      isNew={false}
                      key={String(item.id)}
                      newComplication={item.tipo_complicacao.id}
                      visible
                    />
                  ))}

                  {transfusions?.map((item) => (
                    <Complications
                      id={item.id}
                      infos={item}
                      isNew={false}
                      key={String(item.id)}
                      newComplication={4}
                      visible
                    />
                  ))}
                </Form>
              </Paper>
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplicationsVM;
