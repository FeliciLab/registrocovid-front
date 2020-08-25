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

// import { Extubacao } from './components/Extubacao';
// import { Hemorragia } from './components/Hemorragia';
// import { Pneumotorax } from './components/Pneumotorax';
// import { Transfusional } from './components/Transfusional';
// import { Outras } from './components/Outras';
import Components from './components';

// import api from 'services/api';

import useStyles from './styles';

const ComplicationsVM = () => {
  const classes = useStyles();
  const history = useHistory();
  const { addToast } = useToast();
  const { patient } = usePatient();

  const formRef = useRef(null);
  const buttonDisabled = useRef(false);
  const selectedComplication = useRef();

  const [loading, setLoading] = useState(false);
  // const [oldsComplications, setOldsComplications] = useState([]);
  const [newsComplications, setNewsComplications] = useState([]);

  const handleInfos = useCallback(async () => {
    try {
      setLoading(true);

      // const response = await api.get(`/pacientes/${patient.id}/evolucoes-diarias/${params.examId}`);

      // if (response.status === 200) {
      //   setPhysicalExam(response.data);
      //   buttonDisabled.current = true;
      // }
    } catch (err) {
      if (err.response.status === 404) {
        return null;
      }

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
    // handleInfos();
  }, [handleInfos]);

  const handleSelect = (event) => {
    selectedComplication.current = event.target.value;
  };

  const handleNewComplication = () => {
    const newComplication = {
      id: Math.random(),
      complication: selectedComplication.current
    };

    setNewsComplications(oldState => [newComplication, ...oldState]);
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
              disabled={buttonDisabled.current}
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
                          name="escala_glasgow"
                          onChange={handleSelect}
                          value={selectedComplication.current}
                        >
                          <MenuItem
                            disabled
                            value={0}
                          >
                            Escolher tipo de complicação (ventilação mecânica)
                          </MenuItem>
                          {new Array(5).fill('').map((_, index) => (
                            <MenuItem
                              key={String(Math.random())}
                              value={++index}
                            >
                              {index++}
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
                  {newsComplications.map((complication) => (
                    <Components
                      handleDelete={() => handleDelete(complication.id)}
                      isNew
                      key={String(complication.id)}
                      newComplication={complication}
                      visible
                    />
                  ))}

                  {/* <Extubacao
                    id={1}
                    isNew
                    onDelete={handleDelete}
                    visible
                  />
                  <Hemorragia
                    id={1}
                    isNew
                    onDelete={handleDelete}
                    visible
                  />
                  <Pneumotorax
                    id={1}
                    isNew
                    onDelete={handleDelete}
                    visible
                  />
                  <Transfusional
                    id={1}
                    isNew={false}
                    onDelete={handleDelete}
                    visible
                  />
                  <Outras
                    id={1}
                    isNew
                    onDelete={handleDelete}
                    visible
                  /> */}
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
