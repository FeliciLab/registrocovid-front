import React from 'react';
import CustonBreadcrumbs from 'components/CustonBreadcrumbs';
import useStyles from './styles';
// import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormControl, Typography } from '@material-ui/core';


const schema = Yup.object().shape({
  // prontuario: Yup.number()
  //   .integer('Número de prontuário inválido')
  //   .required('Campo obrigatório'),
  // data_internacao: Yup.date()
  //   .required('Campo obrigatório'),
  // unidade_primeiro_atendimento: Yup.string(),
  // unidade_de_saude: Yup.string(),
  // data_atendimento: Yup.date(),
  // suporte_respiratorio: Yup.boolean(),
  // tipo_suport_respiratorio: Yup.string(),
  // reinternacao: Yup.boolean(),
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
            // prontuario: '',
            // data_internacao: '',
            // unidade_primeiro_atendimento: '',
            // unidade_de_saude: '',
            // data_atendimento: '',
            // suporte_respiratorio: false,
            // tipo_suport_respiratorio: '',
            // reinternacao: false
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PatientIdentification;
