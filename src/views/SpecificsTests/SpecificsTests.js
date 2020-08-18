import React, { useState, useCallback, useEffect } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import useStyles from './styles';
import { CustonBreadcrumbs } from 'components';
import { useParams } from 'react-router-dom';
import {
  CircularProgress,
  FormControl,
  Typography,
  Grid,
  Button,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import schema from './schema';
import SelectTestType from './SelectTestType/SelectTestType';

const SpecificsTests = () => {
  const { id } = useParams();

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  // trata de carregar as informações
  const handleSpecificsTests = useCallback(async id => {
    try {
      setLoading(true);
      console.log(id);
      // TODO buscar as informacoes pela api.
    } catch (err) {
      // TODO: tratamento dos erros aqui.
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleSpecificsTests(id);
  }, [handleSpecificsTests, id]);

  const handleSubmit = values => {
    console.log(values);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'Exames laboratoriais específicos COVID 19',
              route: `/categorias/exames-especificos/${id}`,
            },
          ]}
        />

        {loading ? (
          <CircularProgress />
        ) : (
          <div className={classes.formWrapper}>
            <Formik
              enableReinitialize
              initialValues={{}}
              onSubmit={handleSubmit}
              validateOnMount
              validationSchema={schema}
            >
              {({ values, isSubmitting }) => (
                <Form component={FormControl}>
                  <div className={classes.titleWrapper}>
                    <Typography variant="h1">
                      Exames laboratoriais específicos COVID 19
                    </Typography>
                    <Grid
                      className={classes.actionSection}
                      item
                    >
                      {/* patient info
                        <section className={classes.patienteInfo}>
                          <PatientInfo patient={patient} />
                        </section */}
                      <Button
                        className={classes.buttonSave}
                        color="secondary"
                        disabled={isSubmitting || values.isPrevSaved}
                        type="submit"
                        variant="contained"
                      >
                        Salvar
                      </Button>
                    </Grid>
                  </div>

                  <SelectTestType />

                  <Grid
                    component={Card}
                    item
                    spacing={2}
                    xs={10}
                  >
                    <Accordion>
                      <AccordionSummary
                        aria-controls="panel1a-content"
                        expandIcon={<ExpandMoreIcon />}
                        id="panel1a-header"
                      >
                        <Typography className={classes.headingTeste}>
                          <Typography variant="h4">Teste RT-PCR</Typography>
                          <Typography variant="caption">
                            Data da coleta:
                          </Typography>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Suspendisse malesuada lacus ex, sit amet blandit
                          leo lobortis eget.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        aria-controls="panel2a-content"
                        expandIcon={<ExpandMoreIcon />}
                        id="panel2a-header"
                      >
                        <Typography className={classes.heading}>
                          Accordion 2
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Suspendisse malesuada lacus ex, sit amet blandit
                          leo lobortis eget.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificsTests;
