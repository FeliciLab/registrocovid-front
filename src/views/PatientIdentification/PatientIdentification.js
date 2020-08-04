import React from 'react';
import CustonBreadcrumbs from 'components/CustonBreadcrumbs';
import useStyles from './styles';
// import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormControl, Typography, Grid, FormGroup, FormLabel, TextField, Card } from '@material-ui/core';


const schema = Yup.object().shape({
  municipio_id: Yup.number(),
  outro_municipio: Yup.string(),
  bairro_id: Yup.number(),
  outro_bairro: Yup.string(),
  estado_id: Yup.number(),
  telefone_de_casa: Yup.string(),
  telefone_celular: Yup.string(),
  telefone_do_trabalho: Yup.string(),
  telefone_de_vizinho: Yup.string(),
  sexo: Yup.string(),
  data_nascimento: Yup.string(),
  cor_id: Yup.number(),
  estado_civil_id: Yup.number(),
  escolaridade_id: Yup.number(),
  atividade_profissional_id: Yup.number(),
  qtd_pessoas_domicilio: Yup.number()
});

const PatientIdentification = () => {

  // const history = useHistory();
  const classes = useStyles();

  const handleSubmit = async (values) => {
    return values;
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            { label: 'Identificação do paciente', route: '/cateorias/identificacao-paciente/' },
          ]}
        />
      </div>

      <div className={classes.formWrapper}>
        <Formik
          initialValues={{
            municipio_id: '',
            outro_municipio: '',
            bairro_id: '',
            outro_bairro: '',
            estado_id: '',
            telefone_de_casa: '',
            telefone_celular: '',
            telefone_do_trabalho: '',
            telefone_de_vizinho: '',
            sexo: '',
            data_nascimento: '',
            cor_id: '',
            estado_civil_id: '',
            escolaridade_id: '',
            atividade_profissional_id: '',
            qtd_pessoas_domicilio: ''
          }}
          onSubmit={handleSubmit}
          validateOnMount
          validationSchema={schema}
        >
          {({ values, touched, handleChange, errors, isSubmitting }) => (
            <Form component={FormControl}>
              <div className={classes.titleWrapper}>
                <Typography variant="h1">Informações Gerais</Typography>
              </div>

              <Grid
                component={Card}
                container
                item
                lg={8}
                spacing={2}
              >
                {/* prontuario */}
                <Grid
                  item
                  md={12}
                  sm={12}
                >
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Número do prontuário</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      error={(errors.prontuario && touched.prontuario)}
                      helperText={
                        (errors.prontuario && touched.prontuario) ? errors.prontuario : null
                      }
                      label="Número do prontuário"
                      name="prontuario"
                      onChange={handleChange}
                      type="number"
                      value={values.prontuario}
                      variant="outlined"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PatientIdentification;
