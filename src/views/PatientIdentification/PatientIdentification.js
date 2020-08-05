import React from 'react';
import CustonBreadcrumbs from 'components/CustonBreadcrumbs';
import useStyles from './styles';
// import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  FormControl,
  Typography,
  Grid,
  FormGroup,
  FormLabel,
  TextField,
  Card,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

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
  qtd_pessoas_domicilio: Yup.number(),
});

const PatientIdentification = () => {
  // const history = useHistory();
  const classes = useStyles();

  // TODO: action de submit
  const handleSubmit = async values => {
    return values;
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'Identificação do paciente',
              route: '/cateorias/identificacao-paciente/',
            },
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
            qtd_pessoas_domicilio: '',
          }}
          onSubmit={handleSubmit}
          validateOnMount
          validationSchema={schema}>
          {({ values, touched, handleChange, errors, isSubmitting }) => (
            <Form component={FormControl}>
              <div className={classes.titleWrapper}>
                <Typography variant="h1">Identificação do paciente</Typography>
              </div>

              <Grid component={Card} container item lg={8} spacing={2}>
                {/* municipio_id */}
                <Grid item md={12} sm={12}>
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">
                        Município de residência
                      </Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      error={errors.municipio_id && touched.municipio_id}
                      helperText={
                        errors.municipio_id && touched.municipio_id
                          ? errors.municipio_id
                          : null
                      }
                      label="Número do prontuário"
                      name="municipio_id"
                      onChange={handleChange}
                      select
                      type="text"
                      value={values.municipio_id}
                      variant="outlined">
                      <MenuItem value={1}>M1</MenuItem>
                      <MenuItem value={2}>M2</MenuItem>
                      <MenuItem value={3}>M3</MenuItem>
                      <MenuItem value={4}>M4</MenuItem>
                    </Field>
                  </FormGroup>
                </Grid>

                {/* outro_municipio */}
                <Grid item md={12} sm={12}>
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Outro município</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      error={errors.outro_municipio && touched.outro_municipio}
                      helperText={
                        errors.outro_municipio && touched.outro_municipio
                          ? errors.outro_municipio
                          : null
                      }
                      label="Número do prontuário"
                      name="outro_municipio"
                      onChange={handleChange}
                      type="text"
                      value={values.outro_municipio}
                      variant="outlined"
                    />
                  </FormGroup>
                </Grid>

                {/* bairro_id */}
                <Grid item md={12} sm={12}>
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Bairro de residência</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      error={errors.bairro_id && touched.bairro_id}
                      helperText={
                        errors.bairro_id && touched.bairro_id
                          ? errors.bairro_id
                          : null
                      }
                      label="Número do prontuário"
                      name="bairro_id"
                      onChange={handleChange}
                      select
                      type="text"
                      value={values.bairro_id}
                      variant="outlined">
                      <MenuItem value={1}>B1</MenuItem>
                      <MenuItem value={2}>B2</MenuItem>
                      <MenuItem value={3}>B3</MenuItem>
                      <MenuItem value={4}>B4</MenuItem>
                    </Field>
                  </FormGroup>
                </Grid>

                {/* outro_bairro */}
                <Grid item md={12} sm={12}>
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Outro bairro</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      error={errors.outro_bairro && touched.outro_bairro}
                      helperText={
                        errors.outro_bairro && touched.outro_bairro
                          ? errors.outro_bairro
                          : null
                      }
                      label="Número do prontuário"
                      name="outro_bairro"
                      onChange={handleChange}
                      type="text"
                      value={values.outro_bairro}
                      variant="outlined"
                    />
                  </FormGroup>
                </Grid>

                {/* estado_id */}
                <Grid item md={12} sm={12}>
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Estado de residência</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      error={errors.estado_id && touched.estado_id}
                      helperText={
                        errors.estado_id && touched.estado_id
                          ? errors.estado_id
                          : null
                      }
                      label="Número do prontuário"
                      name="estado_id"
                      onChange={handleChange}
                      select
                      type="text"
                      value={values.estado_id}
                      variant="outlined">
                      <MenuItem value={1}>E1</MenuItem>
                      <MenuItem value={2}>E2</MenuItem>
                      <MenuItem value={3}>E3</MenuItem>
                      <MenuItem value={4}>E4</MenuItem>
                    </Field>
                  </FormGroup>
                </Grid>

                {/* telefone_de_casa */}
                <Grid item md={6} sm={12}>
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Telefone de casa</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      error={
                        errors.telefone_de_casa && touched.telefone_de_casa
                      }
                      helperText={
                        errors.telefone_de_casa && touched.telefone_de_casa
                          ? errors.telefone_de_casa
                          : null
                      }
                      label="Número do prontuário"
                      name="telefone_de_casa"
                      onChange={handleChange}
                      type="text"
                      value={values.telefone_de_casa}
                      variant="outlined"
                    />
                  </FormGroup>
                </Grid>

                {/* telefone_celular */}
                <Grid item md={6} sm={12}>
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Telefone celular</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      error={
                        errors.telefone_celular && touched.telefone_celular
                      }
                      helperText={
                        errors.telefone_celular && touched.telefone_celular
                          ? errors.telefone_celular
                          : null
                      }
                      label="Número do prontuário"
                      name="telefone_celular"
                      onChange={handleChange}
                      type="text"
                      value={values.telefone_celular}
                      variant="outlined"
                    />
                  </FormGroup>
                </Grid>

                {/* telefone_do_trabalho */}
                <Grid item md={6} sm={12}>
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Telefone do trabalho</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      error={
                        errors.telefone_do_trabalho &&
                        touched.telefone_do_trabalho
                      }
                      helperText={
                        errors.telefone_do_trabalho &&
                        touched.telefone_do_trabalho
                          ? errors.telefone_do_trabalho
                          : null
                      }
                      label="Número do prontuário"
                      name="telefone_do_trabalho"
                      onChange={handleChange}
                      type="text"
                      value={values.telefone_do_trabalho}
                      variant="outlined"
                    />
                  </FormGroup>
                </Grid>

                {/* telefone_de_vizinho */}
                <Grid item md={6} sm={12}>
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Telefone do vizinho</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      error={
                        errors.telefone_de_vizinho &&
                        touched.telefone_de_vizinho
                      }
                      helperText={
                        errors.telefone_de_vizinho &&
                        touched.telefone_de_vizinho
                          ? errors.telefone_de_vizinho
                          : null
                      }
                      label="Número do prontuário"
                      name="telefone_de_vizinho"
                      onChange={handleChange}
                      type="text"
                      value={values.telefone_de_vizinho}
                      variant="outlined"
                    />
                  </FormGroup>
                </Grid>

                {/* sexo */}
                <Grid item md={12} sm={12}>
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Sexo</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      error={errors.sexo && touched.sexo}
                      helperText={
                        errors.sexo && touched.sexo ? errors.sexo : null
                      }
                      label="Sexo"
                      name="sexo"
                      onChange={handleChange}
                      select
                      type="text"
                      value={values.sexo}
                      variant="outlined">
                      <MenuItem value={'F'}>Feminino</MenuItem>
                      <MenuItem value={'M'}>Masculino</MenuItem>
                    </Field>
                  </FormGroup>
                </Grid>

                {/* data_nascimento */}
                <Grid item md={6} sm={12}>
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Data de nascimento</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      className={classes.dateField}
                      error={errors.data_nascimento && touched.data_nascimento}
                      helperText={
                        errors.data_nascimento && touched.data_nascimento
                          ? errors.data_nascimento
                          : null
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Data de nascimento"
                      name="data_nascimento"
                      onChange={handleChange}
                      type="date"
                      value={values.data_nascimento}
                    />
                  </FormGroup>
                </Grid>

                {/* estado_id */}
                <Grid item md={6} sm={12}>
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Estado onde nasceu</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      error={errors.estado_id && touched.estado_id}
                      helperText={
                        errors.estado_id && touched.estado_id
                          ? errors.estado_id
                          : null
                      }
                      label="Estado"
                      name="estado_id"
                      onChange={handleChange}
                      select
                      type="text"
                      value={values.estado_id}
                      variant="outlined">
                      <MenuItem value={1}>Ceará</MenuItem>
                      <MenuItem value={2}>São Paulo</MenuItem>
                      <MenuItem value={3}>Paraná</MenuItem>
                    </Field>
                  </FormGroup>
                </Grid>

                {/* cor */}
                <Grid item md={6} sm={12}>
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Cor (autoreferida)</Typography>
                    </FormLabel>
                    <Field
                      as={RadioGroup}
                      className={classes.radioGroup}
                      label="Cor"
                      name="cor_id"
                      value={values.cor_id}
                      onChange={handleChange}>
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Amarelo"
                      />
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label="Laranja"
                      />
                    </Field>
                  </FormGroup>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PatientIdentification;
