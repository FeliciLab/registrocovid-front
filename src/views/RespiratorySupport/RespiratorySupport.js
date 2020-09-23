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

import CustomBreadcrumbs from 'components/CustomBreadcrumbs';
import PatientInfo from 'components/PatientInfo';
import Form from './components/Form';

import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';

import Records from './components';

import api from 'services/api';

import useStyles from './styles';

const RespiratorySupport = () => {
  const classes = useStyles();
  const history = useHistory();
  const { addToast } = useToast();
  const { patient } = usePatient();

  const formRef = useRef(null);
  const selectedTratament = useRef();

  const [loading, setLoading] = useState(false);
  const [supportsTypes, setSupportsTypes] = useState([]);
  const [oldRecords, setOldRecords] = useState([]);
  const [pronacao, setPronacao] = useState([]);
  const [desmame, setDesmame] = useState([]);
  const [newsRecords, setNewsRecords] = useState([]);
  const [recordId, setRecordId] = useState(0);

  const handleInfos = useCallback(async () => {
    try {
      setLoading(true);

      const [supports, patientRecords] = await Promise.all([
        api.get('/suportes-respiratorios'),
        api.get(`pacientes/${patient.id}/suportes-respiratorios`),
      ]);

      setSupportsTypes(supports.data);

      const tratamentoRecords = orderByDate(
        patientRecords.data.tratamento_suporte,
      );
      const pronacaoRecords = orderByDate(
        patientRecords.data.tratamento_pronacao,
      );
      const desmameRecords = orderByDate(
        patientRecords.data.tratamento_inclusao_desmame,
      );
      setOldRecords(tratamentoRecords);
      setPronacao(pronacaoRecords);
      setDesmame(desmameRecords);
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
    selectedTratament.current = event.target.value;
  };

  const handleNewComplication = () => {
    if (selectedTratament.current) {
      const newTratament = {
        id: recordId,
        tratament: selectedTratament.current,
      };

      setRecordId(oldState => oldState + 1);
      setNewsRecords(oldState => [newTratament, ...oldState]);
    }
  };

  const handleDelete = recordId => {
    const updatedComplications = newsRecords.filter(
      ({ id }) => id !== recordId,
    );
    setNewsRecords(updatedComplications);

    formRef.current.setValues(recordId);
  };

  const handleSubmit = () => {
    formRef.current.submit();
  };

  const orderByDate = array => {
    if (!array) {
      return [];
    }

    return array.sort((a, b) => {
      if (
        a.data_inicio > b.data_inicio ||
        a.data_pronacao > b.data_pronacao ||
        a.data_inclusao_desmame > b.data_inclusao_desmame
      )
        return 1;
      if (
        a.data_inicio < b.data_inicio ||
        a.data_pronacao < b.data_pronacao ||
        a.data_inclusao_desmame < b.data_inclusao_desmame
      )
        return -1;
      return 0;
    });
  };

  const groupedOldRecords = useMemo(() => {
    return oldRecords.reduce((acc, object) => {
      let key = object['tipo_suporte_id'];

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(object);

      return acc;
    }, {});
  }, [oldRecords]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustomBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'Suporte respiratório',
              route: '/categorias/suporte-respiratorio',
            },
          ]}
        />
      </div>

      <div>
        <div className={classes.titleWrapper}>
          <Typography variant="h2">Suporte respiratório</Typography>

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

        {loading ? (
          <CircularProgress />
        ) : (
          <div className="container">
            <Grid
              container
              justify={'center'}
            >
              <Paper className={classes.centralPaper}>
                <FormLabel>
                  <Typography variant="h4">
                    Escolher tipo de suporte ou procedimento:
                  </Typography>
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
                          value={selectedTratament.current}
                        >
                          <MenuItem
                            disabled
                            value={0}
                          >
                            Escolher
                          </MenuItem>
                          {supportsTypes.map(support => (
                            <MenuItem
                              key={String(support.id)}
                              value={support.id}
                            >
                              {support.nome}
                            </MenuItem>
                          ))}
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
                      startIcon={<AddIcon />}
                      type="button"
                      variant="contained"
                    >
                      Adicionar Ocorrência
                    </Button>
                  </Grid>
                </div>

                <Form
                  className={classes.examsFormGroup}
                  ref={formRef}
                >
                  {newsRecords.map(item => (
                    <Records
                      handleDelete={() => handleDelete(item.id)}
                      id={item.id}
                      isNew
                      key={String(item.id)}
                      newRecord={item.tratament}
                      visible
                    />
                  ))}

                  {Object.entries(groupedOldRecords).map(element => {
                    return [
                      element[1].map(item => {
                        return (
                          <Records
                            id={item.id}
                            infos={item}
                            isNew={false}
                            key={String(item.id)}
                            newRecord={item.tipo_suporte_id}
                            visible
                          />
                        );
                      }),
                      <div
                        className={classes.newExpPanel}
                        key={String(Math.random())}
                      />,
                    ];
                  })}

                  {[
                    pronacao.map(item => (
                      <Records
                        id={item.id}
                        infos={item}
                        isNew={false}
                        key={String(item.id)}
                        newRecord={7}
                        visible
                      />
                    )),
                    <div
                      className={classes.newExpPanel}
                      key={String(Math.random())}
                    />,
                  ]}

                  {[
                    desmame.map(item => (
                      <Records
                        id={item.id}
                        infos={item}
                        isNew={false}
                        key={String(item.id)}
                        newRecord={8}
                        visible
                      />
                    )),
                    <div
                      className={classes.newExpPanel}
                      key={String(Math.random())}
                    />,
                  ]}
                </Form>
              </Paper>
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
};

export default RespiratorySupport;
