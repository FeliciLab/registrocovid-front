import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import {
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  Typography,
} from '@material-ui/core';
import {
  cardInfoEtilismoItens,
  cardInfoTabagismoItens,
  tabagismoOptions,
  etilismoOptions,
  drogasOptions,
} from 'views/PersonalHistory/statics';
import CardInfo from '../CardInfo';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';
import api from 'services/api';
import { Field, Form, Formik } from 'formik';
import { TextField, RadioGroup } from 'formik-material-ui';
import { PrevJSON } from 'components';
import GenericRadioGroup from 'components/Forms/GenericRadioGroup';

const initialValues = {
  tabagismo: '',
  drogasLicitas: '',
  drogasIlicitas: '',
  drogasUsadas: [],
  etilismo: '',
};

const PersonalHistoryForm = (props, ref) => {
  const { patientHistory, drogas, onChange } = props;

  const classes = useStyles();

  const history = useHistory();

  const { addToast } = useToast();

  const { patient } = usePatient();

  const handleSubmit = async values => {
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

  // useImperativeHandle(ref, () => ({ submit: formik.handleSubmit }), [
  //   formik.handleSubmit,
  // ]);

  function shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }

    return true;
  }

  // useEffect(() => {
  //   onChange(shallowEqual(formik.values, formik.initialValues));
  // }, [formik.values, formik.initialValues, onChange]);

  // <Formik
  //     enableReinitialize
  //     initialValues={initValues}
  //     onSubmit={handleSubmit}
  //     validateOnMount
  //     validationSchema={validationSchema}
  //   >
  //     <Form component={FormControl}>
  //       <FormHeaderComorbidade />
  //       <FormBodyComorbidade />
  //     </Form>
  //   </Formik>

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({ values, isSubmitting }) => (
        <Form component={FormControl}>
          <Grid container>
            <Grid item>
              <CardInfo
                items={cardInfoTabagismoItens}
                title="Classificação do tabagismo segundo OMS:"
              />
            </Grid>
            <Grid item>
              <CardInfo
                items={cardInfoEtilismoItens}
                title="Classificação do etilismo segundo OMS:"
              />
            </Grid>
            {/* tabagismo */}
            <Grid
              item
              xs={12}
            >
              <GenericRadioGroup
                itens={tabagismoOptions}
                label="Tabagismo"
                name="tabagismo"
              />
            </Grid>

            {/* drogasLicitas */}
            <Grid
              item
              xs={12}
            >
              <GenericRadioGroup
                itens={drogasOptions}
                label="Drogas Licitas"
                name="drogasLicitas"
              />
            </Grid>

            {/* drogasIlicitas */}
            <Grid
              item
              xs={12}
            >
              <GenericRadioGroup
                itens={drogasOptions}
                label="Drogas Ilicitas"
                name="drogasIlicitas"
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
    // <form onSubmit={formik.handleSubmit}>
    //   <div className={classes.formContainer}>
    //     <Card className={classes.form}>
    //       <Grid
    //         container
    //         spacing={2}
    //       >
    //         <Grid
    //           item
    //           sm={12}
    //         >
    //           <CardInfo
    //             items={cardInfoTabagismoItens}
    //             title="Classificação do tabagismo segundo OMS:"
    //           />
    //         </Grid>
    //         <Grid
    //           item
    //           sm={12}
    //         >
    //           <FormControl
    //             className={classes.formGroup}
    //             component="fieldset"
    //           >
    //             <FormLabel>
    //               <Typography variant="h4">Tabagismo</Typography>
    //             </FormLabel>
    //             <RadioGroup
    //               name="tabagismo"
    //               value={formik.values.tabagismo}
    //             >
    //               {tabagismoOptions.map(item => (
    //                 <FormControlLabel
    //                   control={
    //                     <Radio
    //                       onChange={formik.handleChange}
    //                       value={String(item.id)}
    //                     />
    //                   }
    //                   key={item.id}
    //                   label={item.name}
    //                 />
    //               ))}
    //             </RadioGroup>
    //           </FormControl>
    //         </Grid>

  //         <Grid
  //           item
  //           sm={12}
  //         >
  //           <FormControl
  //             className={classes.formGroup}
  //             component="fieldset"
  //           >
  //             <FormLabel>
  //               <Typography variant="h4">
  //                 Em relação ao uso de drogas ilícitas, em que opção você se
  //                 enquadra?
  //               </Typography>
  //             </FormLabel>

  //             <RadioGroup
  //               name="situacao_uso_drogas_id"
  //               value={formik.values.situacao_uso_drogas_id}
  //             >
  //               {drogasOptions.map(item => (
  //                 <FormControlLabel
  //                   control={
  //                     <Radio
  //                       onChange={formik.handleChange}
  //                       value={String(item.id)}
  //                     />
  //                   }
  //                   key={String(item.id)}
  //                   label={item.name}
  //                 />
  //               ))}
  //             </RadioGroup>
  //           </FormControl>
  //         </Grid>

  //         <Grid
  //           item
  //           sm={12}
  //         >
  //           <FormControl
  //             className={classes.formGroup}
  //             component="fieldset"
  //           >
  //             <FormLabel>
  //               <Typography variant="h4">
  //                 Em caso de uso de drogas (atual ou ex-usuário), descrever
  //                 quais drogas
  //               </Typography>
  //             </FormLabel>

  //             <FormGroup
  //               name="drogas"
  //               value={formik.values.drogas}
  //             >
  //               {drogas.map(item => (
  //                 <FormControlLabel
  //                   control={
  //                     <Checkbox
  //                       checked={formik.initialValues.drogas?.includes(
  //                         item.id,
  //                       )}
  //                       onChange={formik.handleChange}
  //                       value={item.id}
  //                     />
  //                   }
  //                   key={String(item.id)}
  //                   label={item.descricao}
  //                   name="drogas"
  //                 />
  //               ))}
  //             </FormGroup>
  //           </FormControl>
  //         </Grid>

  //         <Grid
  //           item
  //           sm={12}
  //         >
  //           <CardInfo
  //             items={cardInfoEtilismoItens}
  //             title="Classificação do etilismo segundo OMS:"
  //           />
  //         </Grid>
  //         <Grid
  //           item
  //           sm={12}
  //         >
  //           <FormControl
  //             className={classes.formGroup}
  //             component="fieldset"
  //           >
  //             <FormLabel>
  //               <Typography variant="h4">Etilismo</Typography>
  //             </FormLabel>
  //             <RadioGroup
  //               name="etilismo"
  //               value={formik.values.etilismo}
  //             >
  //               {etilismoOptions.map(item => (
  //                 <FormControlLabel
  //                   control={
  //                     <Radio
  //                       onChange={formik.handleChange}
  //                       value={String(item.id)}
  //                     />
  //                   }
  //                   key={item.id}
  //                   label={item.name}
  //                 />
  //               ))}
  //             </RadioGroup>
  //           </FormControl>
  //         </Grid>
  //       </Grid>
  //     </Card>
  //   </div>
  // </form>
  );
};

export default forwardRef(PersonalHistoryForm);
