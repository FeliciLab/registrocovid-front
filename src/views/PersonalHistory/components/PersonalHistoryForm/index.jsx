import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Card, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, Typography } from '@material-ui/core';
import { cardInfoEtilismoItens, cardInfoTabagismoItens, tabagismoOptions } from 'views/PersonalHistory/statics';
import CardInfo from '../CardInfo';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { useToast } from 'hooks/toast';
import { usePatient } from 'context/PatientContext';
import api from 'services/api';
import { useFormik } from 'formik';

const PersonalHistoryForm = (props, ref) => {
  const { patientHistory, usoDrogas, drogas, onChange } = props;
  
  const classes = useStyles();
  
  const history = useHistory();
  
  const { addToast } = useToast();
  
  const { patient } = usePatient();

  const handleSubmit = async values => {
    try {
      const historico = {};
      values.situacao_uso_drogas_id
        ? (historico.situacao_uso_drogas_id = Number(
          values.situacao_uso_drogas_id,
        ))
        : (historico.situacao_uso_drogas_id = undefined);
      values.drogas
        ? (historico.drogas = values.drogas)
        : (historico.drogas = undefined);
      values.tabagismo
        ? values.tabagismo === 'true'
          ? (historico.tabagismo = true)
          : (historico.tabagismo = false)
        : (historico.tabagismo = undefined);
      values.etilismo
        ? values.etilismo === 'true'
          ? (historico.etilismo = true)
          : (historico.etilismo = false)
        : (historico.etilismo = undefined);
      await api.post(`/pacientes/${patient.id}/historico`, historico);

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

  const formik = useFormik({
    initialValues: {
      tabagismo:
        patientHistory.tabagismo != null
          ? patientHistory.tabagismo.toString()
          : '',
      situacao_uso_drogas_id:
        patientHistory.situacao_uso_drogas_id != null
          ? patientHistory.situacao_uso_drogas_id.toString()
          : '',
      drogas: patientHistory.drogas?.map(droga => droga.id),
      etilismo:
        patientHistory.etilismo != null
          ? patientHistory.etilismo.toString()
          : '',
    },
    onSubmit: handleSubmit,
  });

  useImperativeHandle(
    ref,
    () => {
      return {
        submit: formik.handleSubmit,
      };
    },
    [formik.handleSubmit],
  );

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

  useEffect(() => {
    onChange(shallowEqual(formik.values, formik.initialValues));
  }, [formik.values, formik.initialValues, onChange]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.formContainer}>
        <Card className={classes.form}>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              sm={12}
            >
              <CardInfo
                items={cardInfoTabagismoItens}
                title="Classificação do tabagismo segundo OMS:"
              />
            </Grid>
            <Grid
              item
              sm={12}
            >
              <FormControl
                className={classes.formGroup}
                component="fieldset"
              >
                <FormLabel>
                  <Typography variant="h4">Tabagismo</Typography>
                </FormLabel>
                <RadioGroup
                  name="tabagismo"
                  value={formik.values.tabagismo}
                >
                  {tabagismoOptions.map(item => (
                    <FormControlLabel
                      control={
                        <Radio
                          onChange={formik.handleChange}
                          value="true"
                        />
                      }
                      key={item.id}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid
              item
              sm={12}
            >
              <FormControl
                className={classes.formGroup}
                component="fieldset"
              >
                <FormLabel>
                  <Typography variant="h4">
                    Em relação ao uso de drogas ilícitas, em que opção você se
                    enquadra?
                  </Typography>
                </FormLabel>

                <RadioGroup
                  name="situacao_uso_drogas_id"
                  value={formik.values.situacao_uso_drogas_id}
                >
                  {usoDrogas.map(item => (
                    <FormControlLabel
                      control={
                        <Radio
                          onChange={formik.handleChange}
                          value={String(item.id)}
                        />
                      }
                      key={String(item.id)}
                      label={item.descricao}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid
              item
              sm={12}
            >
              <FormControl
                className={classes.formGroup}
                component="fieldset"
              >
                <FormLabel>
                  <Typography variant="h4">
                    Em caso de uso de drogas (atual ou ex-usuário), descrever
                    quais drogas
                  </Typography>
                </FormLabel>

                <FormGroup
                  name="drogas"
                  value={formik.values.drogas}
                >
                  {drogas.map(item => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formik.initialValues.drogas?.includes(
                            item.id,
                          )}
                          onChange={formik.handleChange}
                          value={item.id}
                        />
                      }
                      key={String(item.id)}
                      label={item.descricao}
                      name="drogas"
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>

            <Grid
              item
              sm={12}
            >
              <CardInfo
                items={cardInfoEtilismoItens}
                title="Classificação do etilismo segundo OMS:"
              />
            </Grid>
            <Grid
              item
              sm={12}
            >
              <FormControl
                className={classes.formGroup}
                component="fieldset"
              >
                <FormLabel>
                  <Typography variant="h4">Etilismo</Typography>
                </FormLabel>
                <RadioGroup
                  name="etilismo"
                  value={formik.values.etilismo}
                >
                  <FormControlLabel
                    control={
                      <Radio
                        onChange={formik.handleChange}
                        value="true"
                      />
                    }
                    label="Etilista / Ex- etilista"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        onChange={formik.handleChange}
                        value="false"
                      />
                    }
                    label="Não etilista"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Card>
      </div>
    </form>
  );
};

export default forwardRef(PersonalHistoryForm);