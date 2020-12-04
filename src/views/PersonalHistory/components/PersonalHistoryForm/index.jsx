import React, {
  forwardRef,
  useRef,
  // useEffect,
  useImperativeHandle,
} from 'react';
import { FormControl, Grid } from '@material-ui/core';
import {
  cardInfoEtilismoItens,
  cardInfoTabagismoItens,
  tabagismoOptions,
  etilismoOptions,
} from 'views/PersonalHistory/statics';
import CardInfo from '../CardInfo';
// import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { useToast } from 'hooks/toast';
// import { usePatient } from 'context/PatientContext';
import { Form, Formik } from 'formik';
import GenericRadioGroup from 'components/Forms/GenericRadioGroup';
import GenericCheckboxGroup from 'components/Forms/GenericCheckboxGroup';

// TODO: melhorar esse valor inicial
const initialValues = {
  situacao_tabagismo_id: '',
  situacao_uso_drogas_id: '',
  drogas: [],
  situacao_etilismo_id: '',
};

const PersonalHistoryForm = (props, ref) => {
  const {
    // patientHistory,
    drogas,
    tiposSitucaoUsoDrogas,
    // onChange
  } = props;

  // TODO: remover depois
  console.log(tiposSitucaoUsoDrogas);

  // const classes = useStyles();

  const history = useHistory();

  const refFormik = useRef(null);

  const { addToast } = useToast();

  // const { patient } = usePatient();

  const handleSubmit = async values => {
    console.log(values);
    try {
      // const historico = {};
      // values.situacao_uso_drogas_id
      //   ? (historico.situacao_uso_drogas_id = Number(
      //     values.situacao_uso_drogas_id,
      //   ))
      //   : (historico.situacao_uso_drogas_id = undefined);
      // values.drogas
      //   ? (historico.drogas = values.drogas)
      //   : (historico.drogas = undefined);
      // values.tabagismo
      //   ? values.tabagismo === 'true'
      //     ? (historico.tabagismo = true)
      //     : (historico.tabagismo = false)
      //   : (historico.tabagismo = undefined);
      // values.etilismo
      //   ? values.etilismo === 'true'
      //     ? (historico.etilismo = true)
      //     : (historico.etilismo = false)
      //   : (historico.etilismo = undefined);
      // await api.post(`/pacientes/${patient.id}/historico`, historico);

      addToast({
        type: 'success',
        message: 'Dados salvos com sucesso',
      });
      history.push('/categorias');
    } catch (err) {
      console.log(err);
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

  // const formik = useFormik({
  //   initialValues: {
  //     tabagismo:
  //       patientHistory.tabagismo != null
  //         ? patientHistory.tabagismo.toString()
  //         : '',
  //     situacao_uso_drogas_id:
  //       patientHistory.situacao_uso_drogas_id != null
  //         ? patientHistory.situacao_uso_drogas_id.toString()
  //         : '',
  //     drogas: patientHistory.drogas?.map(droga => droga.id),
  //     etilismo:
  //       patientHistory.etilismo != null
  //         ? patientHistory.etilismo.toString()
  //         : '',
  //   },
  //   onSubmit: handleSubmit,
  // });

  // function shallowEqual(object1, object2) {
  //   const keys1 = Object.keys(object1);
  //   const keys2 = Object.keys(object2);

  //   if (keys1.length !== keys2.length) {
  //     return false;
  //   }

  //   for (let key of keys1) {
  //     if (object1[key] !== object2[key]) {
  //       return false;
  //     }
  //   }

  //   return true;
  // }

  // useEffect(() => {
  //   onChange(shallowEqual(formik.values, formik.initialValues));
  // }, [formik.values, formik.initialValues, onChange]);

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
                itens={tabagismoOptions}
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
                name="drogasUsadas"
                opcoes={drogas}
              />
            </Grid>

            {/* situacao_etilismo_id */}
            <Grid
              item
              xs={12}
            >
              <GenericRadioGroup
                itens={etilismoOptions}
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
