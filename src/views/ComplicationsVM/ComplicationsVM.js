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
} from '@material-ui/core';
import CustomBreadcrumbs from 'components/CustomBreadcrumbs';
import PatientInfo from 'components/PatientInfo';
import Form from './components/Form';
import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';
import Complications from './components';
import api from 'services/api';
import useStyles from './styles';
import FormAddNewComplication from './forms/FormAddNewComplication'

const ComplicationsVM = () => {
  const classes = useStyles();
  const history = useHistory();
  const { addToast } = useToast();
  const { patient } = usePatient();

  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [oldComplications, setOldComplications] = useState([]);
  const [newsComplications, setNewsComplications] = useState([]);
  const [transfusions, setTransfusions] = useState([]);

  const handleInfos = useCallback(async () => {
    setLoading(true);

    let complicationsPatient = [];
    try {
      complicationsPatient = await api.get(`pacientes/${patient.id}/ventilacao-mecanica`);
    } catch (err) {
      console.log('falha ao consultar dados', err)
      addToast({
        type: 'error',
        message: 'Erro ao tentar carregar informações, tente novamente',
      });

      history.goBack();
    }

    const ordenedByDate = !complicationsPatient.data.transfussoes_ocorrencia ? [] : orderByDate(
      complicationsPatient.data.transfussoes_ocorrencia
    );

    setOldComplications(
      complicationsPatient.data.complicacoes_ventilacao_mecanica,
    );
    setTransfusions(ordenedByDate);
    setLoading(false);

  }, [addToast, history, patient.id]);

  useEffect(() => {
    handleInfos();
  }, [handleInfos]);

  const handleNewComplication = (selectedComplication) => {
    if (selectedComplication) {
      const newComplication = {
        id: selectedComplication.id,
        complication: selectedComplication.id,
      };

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
        <CustomBreadcrumbs
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
                <FormAddNewComplication onSubmit={handleNewComplication}/>

                <Form
                  className={classes.examsFormGroup}
                  ref={formRef}
                >
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
                      <div
                        className={classes.newExpPanel}
                        key={element}
                      />,
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
