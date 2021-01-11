import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { FormControl, Grid, Card } from '@material-ui/core';
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
import useStyles from './styles';
import {
  getInitialValuesPersonalHistoryForm,
  postPatientHistory,
} from 'models/personalHistory/PersonalHistoryService';

const PersonalHistoryForm = (props, ref) => {
  const {
    patientHistory,
    drogas,
    tiposSitucaoEtilismo,
    tiposSitucaoTabagismo,
    tiposSitucaoUsoDrogas,
  } = props;

  const classes = useStyles();

  const history = useHistory();

  const refFormik = useRef(null);

  const { addToast } = useToast();

  const { patient } = usePatient();

  const initialValues = getInitialValuesPersonalHistoryForm(patientHistory);

  const handleSubmit = async values => {
    try {
      await postPatientHistory(values, patient.id);
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
        <Form
          className={classes.formContainer}
          component={FormControl}
        >
          <Grid
            className={classes.form}
            component={Card}
            container
            spacing={4}
          >
            <Grid
              item
              xs={12}
            >
              <CardInfo
                items={cardInfoTabagismoItens}
                title="Classificação do tabagismo segundo OMS:"
              />
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

            <Grid
              item
              xs={12}
            >
              <CardInfo
                items={cardInfoEtilismoItens}
                title="Classificação do etilismo segundo OMS:"
              />
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
