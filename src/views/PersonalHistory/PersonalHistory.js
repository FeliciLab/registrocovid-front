import React from 'react';
import useStyles from './styles';

import {
  Typography,
  Button,
  Card
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

import CustonBreadcrumbs from 'components/CustonBreadcrumbs';
import PatientInfo from 'components/PatientInfo';

const PersonalHistory = () => {
  const classes = useStyles();

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            { label: 'História Pessoal', route: '/categorias/historia-pessoal' },
          ]}
        />
      </div>

      <div>
        <Formik
          initialValues={{

          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <div className={classes.titleWrapper}>
                <Typography variant="h1">História Pessoal</Typography>

                <div className={classes.rightContent}>
                  <PatientInfo />

                  <Button
                    className={classes.buttonSave}
                    color="secondary"
                    disable={isSubmitting}
                    type="submit"
                    variant="contained"
                  >
                  Salvar
                  </Button>
                </div>
              </div>

              <div className={classes.formContainer}>
                <Card className={classes.form} />

              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PersonalHistory;
