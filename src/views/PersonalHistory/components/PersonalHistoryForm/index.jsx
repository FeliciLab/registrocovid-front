import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { FormControl, Grid } from '@material-ui/core';
import {
  cardInfoEtilismoItens,
  cardInfoTabagismoItens,
} from 'views/PersonalHistory/statics';
import CardInfo from '../CardInfo';
import { useHistory } from 'react-router-dom';
import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';
import { Form, Formik } from 'formik';
import GenericRadioGroup from 'components/Forms/GenericRadioGroup';
import GenericCheckboxGroup from 'components/Forms/GenericCheckboxGroup';
import api from 'services/api';
import { isEmpty } from 'underscore';

const PersonalHistoryForm = (props, ref) => {
  const {
    patientHistory,
    drogas,
    tiposSitucaoEtilismo,
    tiposSitucaoTabagismo,
    tiposSitucaoUsoDrogas,
  } = props;

  // const classes = useStyles();

  const history = useHistory();

  const refFormik = useRef(null);

  const { addToast } = useToast();

  const { patient } = usePatient();

  const initialValues = isEmpty(patientHistory)
    ? {
      situacao_tabagismo_id: '',
      situacao_uso_drogas_id: '',
      drogas: {},
      situacao_etilismo_id: '',
    }
    : {
      situacao_tabagismo_id: String(patientHistory.situacao_tabagismo_id),
      situacao_uso_drogas_id: String(patientHistory.situacao_uso_drogas_id),
      drogas: patientHistory.drogas.reduce(
        (acc, curr) => ({ ...acc, [curr.id]: true }),
        {},
      ),
      situacao_etilismo_id: String(patientHistory.situacao_etilismo_id),
    };

  const handleSubmit = async values => {
    try {
      const selectedDrogasIds = Object.entries(values.drogas).map(elem =>
        elem[1] ? Number(elem[0]) : null,
      );

      await api.post(`/pacientes/${patient.id}/historico`, {
        ...values,
        drogas: selectedDrogasIds,
      });

      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso',
      });
      history.push('/categorias');
    } catch (err) {
      addToast({
        type: 'error',
        message: 'Erro ao tentar registrar história pessoal, tente novamente',
      });
    }
  };

  useImperativeHandle(
    ref,
    () => ({ submit: refFormik.current.handleSubmit }),
    [],
  );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      innerRef={refFormik} // usar para mandar o método onSubmit para o component pai
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form component={FormControl}>
          <Grid
            container
            spacing={2}
          >
            <Grid item>
              <CardInfo
                items={cardInfoTabagismoItens}
                title="Classificação do tabagismo segundo OMS:"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <GenericRadioGroup
                itens={tiposSitucaoTabagismo}
                label="Tabagismo"
                name="situacao_tabagismo_id"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <GenericRadioGroup
                itens={tiposSitucaoUsoDrogas}
                label="Em relação ao uso de drogas ilícitas, em que opção você se enquadra?"
                name="situacao_uso_drogas_id"
              />
            </Grid>

            <Grid item>
              <CardInfo
                items={cardInfoEtilismoItens}
                title="Classificação do etilismo segundo OMS:"
              />
            </Grid>

            <Grid item>
              <GenericCheckboxGroup
                label="Drogas"
                name="drogas"
                opcoes={drogas}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <GenericRadioGroup
                itens={tiposSitucaoEtilismo}
                label="Etilismo"
                name="situacao_etilismo_id"
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default forwardRef(PersonalHistoryForm);
