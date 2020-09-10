import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
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
  MenuItem,
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
  const [oldComplications, setOldComplications] = useState([]);
  const [transfusions, setTransfusions] = useState([]);
  const [newsComplications, setNewsComplications] = useState([]);
  const [complicationId, setComplicationId] = useState(0);

  const handleInfos = useCallback(async () => {
    try {
      setLoading(true);

      const [complications, complicationsPatient] = await Promise.all([
        api.get('/tipos-complicacao-vm'),
        api.get(`pacientes/${patient.id}/ventilacao-mecanica`),
      ]);
      console.log(complicationsPatient);
      let ordenedByDate = await orderByDate(
        complicationsPatient.data.transfussoes_ocorrencia,
      );

      setComplicationsTypes(complications.data);
      setOldComplications(
        complicationsPatient.data.complicacoes_ventilacao_mecanica,
      );
      setTransfusions(ordenedByDate);
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

  const handleSelect = event => {
    selectedComplication.current = event.target.value;
  };

  const handleNewComplication = () => {
    if (selectedComplication.current) {
      const newComplication = {
        id: complicationId,
        complication: selectedComplication.current,
      };

      setComplicationId(oldState => oldState + 1);
      setNewsComplications(oldState => [newComplication, ...oldState]);
    }
  };

  const handleDelete = complicationId => {
    const updatedComplications = newsComplications.filter(
      ({ id }) => id !== complicationId,
    );
    setNewsComplications(updatedComplications);

    formRef.current.setValues(complicationId);
  };

  const handleSubmit = () => {
    formRef.current.submit();
  };

  const orderByDate = array => {
    return array.sort((a, b) => {
      if (
        a.data_complicacao > b.data_complicacao ||
        a.data_transfusao > b.data_transfusao
      )
        return 1;
      if (
        a.data_complicacao < b.data_complicacao ||
        a.data_transfusao < b.data_transfusao
      )
        return -1;
      return 0;
    });
  };

  const groupedOldComplications = useMemo(() => {
    const ordernedByDate = orderByDate(oldComplications);

    return ordernedByDate.reduce((acc, object) => {
      let key = object.tipo_complicacao['id'];
      if (key !== 4) {
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(object);
      }
      return acc;
    }, {});
  }, [oldComplications]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'Complicações relacionadas à ventilação mecânica',
              route: '/categorias/complicacoes-vm',
            },
          ]}
        />
      </div>

      <div>
        <div className={classes.titleWrapper}>
          <Typography variant="h3">
            Complicações (Ventilação Mecânica)
          </Typography>

          <div className={classes.rightContent}>
            <PatientInfo />

            <Button
              className={classes.buttonSave}
              color="secondary"
              onClick={handleSubmit}
              type="submit"
              variant="contained">
              Salvar
            </Button>
          </div>
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <div className="container">
            <Grid container justify={'center'}>
              <Paper className={classes.centralPaper}>
                <FormLabel>
                  <Typography variant="h4">
                    Escolher tipo de complicação (ventilação mecânica):
                  </Typography>
                </FormLabel>

                <div className={classes.headerForm}>
                  <Grid item lg={8}>
                    <FormGroup>
                      <FormControl variant={'outlined'}>
                        <Select
                          className={classes.selectField}
                          name="complication"
                          onChange={handleSelect}
                          value={selectedComplication.current}>
                          <MenuItem disabled value={0}>
                            Escolher tipo de complicação (ventilação mecânica)
                          </MenuItem>
                          {complicationsTypes.map(complication => (
                            <MenuItem
                              key={complication.id}
                              value={complication.id}>
                              {complication.descricao}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Grid>

                  <Grid item lg={4}>
                    <Button
                      className={classes.buttonSave}
                      color="secondary"
                      onClick={handleNewComplication}
                      startIcon={<AddIcon />}
                      type="button"
                      variant="contained">
                      Adicionar Ocorrência
                    </Button>
                  </Grid>
                </div>

                <Form className={classes.examsFormGroup} ref={formRef}>
                  {newsComplications.map(item => (
                    <Complications
                      handleDelete={() => handleDelete(item.id)}
                      id={item.id}
                      isNew
                      key={String(item.id)}
                      newComplication={item.complication}
                      visible
                    />
                  ))}

                  {Object.entries(groupedOldComplications).map(element => {
                    return [
                      element[1].map(item => {
                        return (
                          <Complications
                            id={item.id}
                            infos={item}
                            isNew={false}
                            key={String(item.id)}
                            newComplication={item.tipo_complicacao.id}
                            visible
                          />
                        );
                      }),
                      <div className={classes.newExpPanel} />,
                    ];
                  })}

                  {transfusions?.map(item => (
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
};

export default ComplicationsVM;
