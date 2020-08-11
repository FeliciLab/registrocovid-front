import React, { useState, useEffect } from 'react';
import CustonBreadcrumbs from 'components/CustonBreadcrumbs';
import useStyles from './styles';
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
  Button,
} from '@material-ui/core';
import { TextMaskPhone } from 'components';
import PatientInfo from 'components/PatientInfo';
import api from 'services/api';
import apiFake from 'services/apiFake';
import { useParams, useHistory } from 'react-router-dom';
import { usePatient } from 'context/PatientContext';

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
  estado_nascimento_id: Yup.string(),
  cor_id: Yup.number(),
  estado_civil_id: Yup.number(),
  escolaridade_id: Yup.number(),
  atividade_profissional_id: Yup.number(),
  qtd_pessoas_domicilio: Yup.number(),
});

const PatientIdentification = () => {
  const history = useHistory();

  const classes = useStyles();

  const { id } = useParams();

  const [initialValues, setinItialValues] = useState({
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
    estado_nascimento_id: '',
    cor_id: '',
    estado_civil_id: '',
    escolaridade_id: '',
    atividade_profissional_id: '',
    qtd_pessoas_domicilio: '',
  });

  // buscando o paciente pelo contexto
  const { patient, setPatient } = usePatient();

  // Buscando a Lista de Municípios
  const [municipios, setMunicipios] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await api.get('/municipios');
      setMunicipios(response.data);
    })();
  }, []);

  // Buscando a Lista de Estados
  const [estados, setEstados] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await api.get('/estados');
      setEstados(response.data);
    })();
  }, []);

  // Buscando a Lista de Cores
  const [cores, setCores] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await api.get('/cores');
      setCores(response.data);
    })();
  }, []);

  // Buscando a Lista de Estados-civis
  const [estadosCivis, setEstadosCivis] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await api.get('/estados-civis');
      setEstadosCivis(response.data);
    })();
  }, []);

  // Buscando a Lista Escolaridades
  const [escolaridades, setEscolaridades] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await api.get('/escolaridades');
      setEscolaridades(response.data);
    })();
  }, []);

  // Buscando a Lista de Atividades profissionais
  const [atividadesProfissionais, setAtividadesProfissionais] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await api.get('/atividades-profissionais');
      setAtividadesProfissionais(response.data);
    })();
  }, []);

  // TODO: mudar para api oficial quando disponibilizarem o endpoint
  // Buscando a Lista de Bairros
  const [bairros, setBairros] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await apiFake.get('/bairros');
      setBairros(response.data);
    })();
  }, []);

  // Setando as variáveis do paciente no Formik
  useEffect(() => {
    (async () => {
      const response = await api.get(`/pacientes/${id}/identificacao`);
      setPatient(response.data);
      console.log(response.data);
      setinItialValues(initialValues => ({
        ...initialValues,
        municipio_id: response.data.municipio?.toString() | '',
        sexo: response.data.sexo.toString(),
        atividade_profissional_id: response.data.atividade_profissional.id.toString(),
        escolaridade_id: response.data.escolaridade.id.toString(),
        cor_id: response.data.cor.id.toString(),
        estado_civil_id: response.data.estado_civil.id.toString(),
        qtd_pessoas_domicilio: response.data.qtd_pessoas_domicilio.toString(),
      }));
    })();
  }, [id]);

  // TODO: ainda em estágio embrionário.
  const handleSubmit = async ({
    municipio_id,
    outro_municipio,
    bairro_id,
    outro_bairro,
    estado_id,
    telefone_de_casa,
    telefone_celular,
    telefone_do_trabalho,
    telefone_de_vizinho,
    sexo,
    data_nascimento,
    estado_nascimento_id,
    cor_id,
    estado_civil_id,
    escolaridade_id,
    atividade_profissional_id,
    qtd_pessoas_domicilio,
  }) => {
    const patienteUpdated = {
      municipio_id,
      outro_municipio,
      bairro_id,
      outro_bairro,
      estado_id,
      telefone_de_casa,
      telefone_celular,
      telefone_do_trabalho,
      telefone_de_vizinho,
      sexo,
      data_nascimento,
      estado_nascimento_id,
      cor_id,
      estadocivil_id: estado_civil_id,
      escolaridade_id,
      atividadeprofissional_id: atividade_profissional_id,
      qtd_pessoas_domicilio,
    };

    // TODO: Colocar tratamento dos erros devidamente.
    try {
      await api.post(`/pacientes/${id}/identificacao`, patienteUpdated);
    } catch (err) {
      console.log(err);
    } finally {
      history.push('/');
    }
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
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnMount
          validationSchema={schema}
        >
          {({ values, touched, handleChange, isSubmitting, errors }) => (
            <Form component={FormControl}>
              <div className={classes.titleWrapper}>
                <Typography variant="h1">Identificação do paciente</Typography>

                <Grid
                  className={classes.actionSection}
                  item
                >
                  {/* patient */}
                  <PatientInfo patient={patient} />
                  <Button
                    className={classes.buttonSave}
                    color="secondary"
                    disable={isSubmitting.toString()}
                    type="submit"
                    variant="contained"
                  >
                    Salvar
                  </Button>
                </Grid>
              </div>

              <Grid
                component={Card}
                container
                item
                lg={10}
                spacing={2}
              >
                {/* municipio_id */}
                <Grid
                  item
                  md={12}
                  sm={12}
                >
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
                      label="Município"
                      name="municipio_id"
                      onChange={handleChange}
                      select
                      type="text"
                      value={values.municipio_id}
                      variant="outlined"
                    >
                      {/* TODO: filtragem dos municípios por estado. */}

                      {municipios.map(({ id, nome }) => (
                        <MenuItem
                          key={id}
                          value={id}
                        >
                          {nome}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormGroup>
                </Grid>

                {/* outro_municipio */}
                <Grid
                  item
                  md={12}
                  sm={12}
                >
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
                      label="Outro município"
                      name="outro_municipio"
                      onChange={handleChange}
                      type="text"
                      value={values.outro_municipio}
                      variant="outlined"
                    />
                  </FormGroup>
                </Grid>

                {/* bairro_id */}
                <Grid
                  item
                  md={12}
                  sm={12}
                >
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
                      label="Bairro de residência"
                      name="bairro_id"
                      onChange={handleChange}
                      select
                      type="text"
                      value={values.bairro_id}
                      variant="outlined"
                    >
                      {bairros.map(({ id, nome }) => (
                        <MenuItem
                          key={id}
                          value={id}
                        >
                          {nome}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormGroup>
                </Grid>

                {/* outro_bairro */}
                <Grid
                  item
                  md={12}
                  sm={12}
                >
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
                      label="Outro bairro"
                      name="outro_bairro"
                      onChange={handleChange}
                      type="text"
                      value={values.outro_bairro}
                      variant="outlined"
                    />
                  </FormGroup>
                </Grid>

                {/* estado_id */}
                <Grid
                  item
                  md={12}
                  sm={12}
                >
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
                      label="Estado de residência"
                      name="estado_id"
                      onChange={handleChange}
                      select
                      type="text"
                      value={values.estado_id}
                      variant="outlined"
                    >
                      {estados.map(({ id, nome }) => (
                        <MenuItem
                          key={id}
                          value={id}
                        >
                          {nome}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormGroup>
                </Grid>

                {/* telefone_de_casa */}
                <Grid
                  item
                  md={6}
                  sm={12}
                >
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
                      InputProps={{
                        inputComponent: TextMaskPhone,
                      }}
                      label="Telefone de casa"
                      name="telefone_de_casa"
                      onChange={handleChange}
                      type="text"
                      value={values.telefone_de_casa}
                      variant="outlined"
                    />
                  </FormGroup>
                </Grid>

                {/* telefone_celular */}
                <Grid
                  item
                  md={6}
                  sm={12}
                >
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
                      InputProps={{
                        inputComponent: TextMaskPhone,
                      }}
                      label="Telefone celular"
                      name="telefone_celular"
                      onChange={handleChange}
                      type="text"
                      value={values.telefone_celular}
                      variant="outlined"
                    />
                  </FormGroup>
                </Grid>

                {/* telefone_do_trabalho */}
                <Grid
                  item
                  md={6}
                  sm={12}
                >
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
                      InputProps={{
                        inputComponent: TextMaskPhone,
                      }}
                      label="Telefone do trabalho"
                      name="telefone_do_trabalho"
                      onChange={handleChange}
                      type="text"
                      value={values.telefone_do_trabalho}
                      variant="outlined"
                    />
                  </FormGroup>
                </Grid>

                {/* telefone_de_vizinho */}
                <Grid
                  item
                  md={6}
                  sm={12}
                >
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
                      InputProps={{
                        inputComponent: TextMaskPhone,
                      }}
                      label="Telefone do vizinho"
                      name="telefone_de_vizinho"
                      onChange={handleChange}
                      type="text"
                      value={values.telefone_de_vizinho}
                      variant="outlined"
                    />
                  </FormGroup>
                </Grid>

                {/* sexo */}
                <Grid
                  item
                  md={12}
                  sm={12}
                >
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
                      variant="outlined"
                    >
                      <MenuItem value={'F'}>Feminino</MenuItem>
                      <MenuItem value={'M'}>Masculino</MenuItem>
                    </Field>
                  </FormGroup>
                </Grid>

                {/* data_nascimento */}
                <Grid
                  item
                  md={6}
                  sm={12}
                >
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

                {/* estado_nascimento_id */}
                <Grid
                  item
                  md={6}
                  sm={12}
                >
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Estado onde nasceu</Typography>
                    </FormLabel>
                    <Field
                      as={TextField}
                      className={classes.textField}
                      error={
                        errors.estado_nascimento_id &&
                        touched.estado_nascimento_id
                      }
                      helperText={
                        errors.estado_nascimento_id &&
                        touched.estado_nascimento_id
                          ? errors.estado_nascimento_id
                          : null
                      }
                      label="Estado onde nasceu"
                      name="estado_nascimento_id"
                      onChange={handleChange}
                      select
                      type="text"
                      value={values.estado_nascimento_id}
                      variant="outlined"
                    >
                      {estados.map(({ id, nome }) => (
                        <MenuItem
                          key={id}
                          value={id}
                        >
                          {nome}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormGroup>
                </Grid>

                {/* cor_id */}
                <Grid
                  item
                  md={6}
                  sm={12}
                >
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Cor (autoreferida)</Typography>
                    </FormLabel>
                    <Field
                      as={RadioGroup}
                      className={classes.radioGroup}
                      name="cor_id"
                      onChange={handleChange}
                      value={values.cor_id}
                    >
                      {cores.map(({ id, nome }) => (
                        <FormControlLabel
                          control={<Radio />}
                          key={id}
                          label={nome}
                          value={id.toString()}
                        />
                      ))}
                    </Field>
                  </FormGroup>
                </Grid>

                {/* estado_civil_id */}
                <Grid
                  item
                  md={6}
                  sm={12}
                >
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Estado civil</Typography>
                    </FormLabel>
                    <Field
                      as={RadioGroup}
                      className={classes.radioGroup}
                      name="estado_civil_id"
                      onChange={handleChange}
                      value={values.estado_civil_id}
                    >
                      {estadosCivis.map(({ id, nome }) => (
                        <FormControlLabel
                          control={<Radio />}
                          key={id}
                          label={nome}
                          value={id.toString()}
                        />
                      ))}
                    </Field>
                  </FormGroup>
                </Grid>

                {/* escolaridade_id */}
                <Grid
                  item
                  md={6}
                  sm={12}
                >
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">Escolaridade</Typography>
                    </FormLabel>
                    <Field
                      as={RadioGroup}
                      className={classes.radioGroup}
                      name="escolaridade_id"
                      onChange={handleChange}
                      value={values.escolaridade_id}
                    >
                      {escolaridades.map(({ id, nome }) => (
                        <FormControlLabel
                          control={<Radio />}
                          key={id}
                          label={nome}
                          value={id.toString()}
                        />
                      ))}
                    </Field>
                  </FormGroup>
                </Grid>

                {/* atividade_profissional_id */}
                <Grid
                  item
                  md={6}
                  sm={12}
                >
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">
                        Atividade profissional principal nos últimos 12 meses?
                        (Ocupação principal)
                      </Typography>
                    </FormLabel>
                    <Field
                      as={RadioGroup}
                      className={classes.radioGroup}
                      name="atividade_profissional_id"
                      onChange={handleChange}
                      value={values.atividade_profissional_id}
                    >
                      {atividadesProfissionais.map(({ id, nome }) => (
                        <FormControlLabel
                          control={<Radio />}
                          key={id}
                          label={nome}
                          value={id.toString()}
                        />
                      ))}
                    </Field>
                  </FormGroup>
                </Grid>

                {/* qtd_pessoas_domicilio */}
                <Grid
                  item
                  md={12}
                  sm={12}
                >
                  <FormGroup>
                    <FormLabel>
                      <Typography variant="h4">
                        Quantas pessoas residem no mesmo domicílio?
                      </Typography>
                    </FormLabel>
                    <Field
                      as={RadioGroup}
                      className={classes.radioGroup}
                      name="qtd_pessoas_domicilio"
                      onChange={handleChange}
                      row
                      value={values.qtd_pessoas_domicilio}
                    >
                      <FormControlLabel
                        control={<Radio />}
                        label="1"
                        value="1"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label="2"
                        value="2"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label="3"
                        value="3"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label="4"
                        value="4"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label="5 ou mais"
                        value="5"
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
