import React from 'react';
import { withRouter,
  // useHistory
} from 'react-router-dom';
import {
  CircularProgress,
} from '@material-ui/core';

// import FormComorbidadeProvider from 'views/Comorbidities/Form/FormComorbidadeContextProvider'
import FormComorbidade from './Form/FormComorbidade'
import ComorbidadesBreadcrumbs from './ComorbidadesBreadcrumbs';
import useStyles from './styles';
import ComorbidadeModel from 'models/comorbidades/ComorbidadeModel'
// import { usePatient } from 'context/PatientContext';
// import { useToast } from 'hooks/toast';


// import DatasRequests from 'services/requests/datasRequests'
// import PatientInfo from 'components/PatientInfo';
// import { Formik, Form, Field, FieldArray } from 'formik';
// import { TextField, RadioGroup, CheckboxWithLabel } from 'formik-material-ui';
// import Diseases from './diseases';

const Comorbidities = () => {
  const classes = useStyles();
  const initValues = {...ComorbidadeModel.model};
  const isLoading = false;

  // const history = useHistory();
  // const { patient } = usePatient();
  // const { addToast } = useToast();
  // const [tiposDoenca, setTiposDoenca] = useState([]);
  // const [allDoencas, setAllDoencas] = useState([]);
  // const [allCorticosteroides, setAllCorticosteroides] = useState([]);
  // const [allOrgaos, setAllOrgaos] = useState([]);
  // const [selectedIds, setSelectedIds] = useState([]);
  // const [diseases, setDiseases] = useState([]);

  // const [diabetes, setDiabetes] = useState(false);
  // const [obesidade, setObesidade] = useState(false);
  // const [hipertensao, setHipertensao] = useState(false);
  // const [hiv, setHiv] = useState(false);
  // const [tuberculose, setTuberculose] = useState(false);
  // const [neoplasia, setNeoplasia] = useState(false);
  // const [quimioterapia, setQuimioterapia] = useState('');

  // const [outrasCondicoes, setOutrasCondicoes] = useState([]);
  // const [medicacoes, setMedicacoes] = useState([]);

  // const [outraCondicao, setOutraCondicao] = useState('');
  // const [medicacao, setMedicacao] = useState('');
  // const [selectedField, setSelectedField] = useState({ id: '' });
  // const [isSaving, setIsSaving] = useState(false);


  // const [visualization, setVisualization] = useState(true);

  // const showToast = ({type, message}) => {
  //   return addToast({
  //     type: type || 'error',
  //     message:
  //       message || 'Ocorreu um erro ao carregar suas informações, por favor tente novamente.',
  //   });
  // }

  // const handleEffects = () => {
  //   setIsLoading(true);
  //   getTiposDoencas()
  //   getDoencas()
  //   getCorticosteroides()
  //   getOrgaos()
  // }

  // useEffect(handleEffects(), []);

  // const setDatas = (apiData) => {
  //   setInitValues(apiData);

  //   setDiabetes(apiData.diabetes);
  //   setObesidade(apiData.obesidade);
  //   setHipertensao(apiData.hipertensao);
  //   setHiv(apiData.HIV);
  //   setTuberculose(apiData.tuberculose);
  //   setNeoplasia(apiData.neoplasia);
  //   setQuimioterapia(apiData.quimioterapia);

  //   setOutrasCondicoes(apiData.outras_condicoes);
  //   setMedicacoes(apiData.medicacoes);
  // }

  // const buscarPacienteComorbidades = () => {
  //   api.get(`/pacientes/${patient.id}/comorbidades`)
  //     .then(response => {
  //       if (response.status === 204) {
  //         setVisualization(false);
  //         setIsLoading(false);
  //         return;
  //       }
  //       setVisualization(true);
  //       setDatas(response.data)
  //       setIsLoading(false);
  //     })
  //     .catch(showToast({
  //         message: 'Ocorreu um erro ao carregar suas informações, por favor tente novamente.',
  //     }))
  // }

  // useEffect(buscarPacienteComorbidades(), [patient.id])

  // useEffect(() => {
  //   const tipoDoencas = tiposDoenca.filter(td =>
  //     apiValues.doencas.some(ad => ad.tipo_doenca_id === td.id),
  //   );

  //   // TODO: criar componente ListTiposDoencas
  //   const disease = tipoDoencas.map((td, index) => (
  //     <Diseases
  //       doencas={allDoencas.filter(d => d.tipo_doenca_id === td.id)}
  //       header={td.descricao}
  //       key={index}
  //     />
  //   ));
  //   setDiseases(disease);
  // }, [apiValues, allDoencas, tiposDoenca]);

  // const handleAdd = () => {
  //   if (!selectedIds.includes(selectedField.id)) {
  //     const disease = (
  //       <Diseases
  //         doencas={allDoencas.filter(
  //           d => d.tipo_doenca_id === selectedField.id,
  //         )}
  //         header={selectedField.descricao}
  //       />
  //     );
  //     setDiseases(old => [disease, ...old]);
  //     setSelectedIds(old => [...old, selectedField.id]);
  //   }
  // };

  // const initialValues = {
  //   quimioterapia:
  //     apiValues.quimioterapia === true
  //       ? 'sim'
  //       : apiValues.quimioterapia === false
  //         ? 'nao'
  //         : '',
  //   transplantado:
  //     apiValues.transplantado === true
  //       ? 'sim'
  //       : apiValues.transplantado === false
  //         ? 'nao'
  //         : '',
  //   corticosteroide:
  //     apiValues.corticosteroide === true
  //       ? 'sim'
  //       : apiValues.corticosteroide === false
  //         ? 'nao'
  //         : '',
  //   gestacao:
  //     apiValues.gestacao === true
  //       ? 'sim'
  //       : apiValues.gestacao === false
  //         ? 'nao'
  //         : '',
  //   gestacao_semanas: apiValues.gestacao_semanas || '',
  //   puerperio_semanas: apiValues.puerperio_semanas || '',
  //   puerperio:
  //     apiValues.puerperio === true
  //       ? 'sim'
  //       : apiValues.puerperio === false
  //         ? 'nao'
  //         : '',

  //   orgaos: allOrgaos.map(ao =>
  //     apiValues.orgaos ? apiValues.orgaos.some(or => or.id === ao.id) : false,
  //   ),
  //   corticosteroides: allCorticosteroides.map(ac =>
  //     apiValues.corticosteroides
  //       ? apiValues.corticosteroides.some(co => co.id === ac.id)
  //       : false,
  //   ),
  //   doencas: allDoencas.map(ad =>
  //     apiValues.doencas
  //       ? apiValues.doencas.some(doenca => doenca.id === ad.id)
  //       : false,
  //   ),

  //   doenca_cardiaca:
  //     apiValues.doenca_cardiaca === true
  //       ? 'sim'
  //       : apiValues.doenca_cardiaca === false
  //         ? 'nao'
  //         : '',
  //   doenca_vascular_periferica:
  //     apiValues.doenca_vascular_periferica === true
  //       ? 'sim'
  //       : apiValues.doenca_vascular_periferica === false
  //         ? 'nao'
  //         : '',
  //   doenca_pulmonar_cronica:
  //     apiValues.doenca_pulmonar_cronica === true
  //       ? 'sim'
  //       : apiValues.doenca_pulmonar_cronica === false
  //         ? 'nao'
  //         : '',
  //   doenca_reumatologica:
  //     apiValues.doenca_reumatologica === true
  //       ? 'sim'
  //       : apiValues.doenca_reumatologica === false
  //         ? 'nao'
  //         : '',
  //   cancer:
  //     apiValues.cancer === true
  //       ? 'sim'
  //       : apiValues.cancer === false
  //         ? 'nao'
  //         : '',
  //   doenca_renal_cronica:
  //     apiValues.doenca_renal_cronica === true
  //       ? 'sim'
  //       : apiValues.doenca_renal_cronica === false
  //         ? 'nao'
  //         : '',
  //   doenca_hepatica_cronica:
  //     apiValues.doenca_hepatica_cronica === true
  //       ? 'sim'
  //       : apiValues.doenca_hepatica_cronica === false
  //         ? 'nao'
  //         : '',
  //   doenca_neurologica:
  //     apiValues.doenca_neurologica === true
  //       ? 'sim'
  //       : apiValues.doenca_neurologica === false
  //         ? 'nao'
  //         : '',
  //   doenca_tireoide:
  //     apiValues.doenca_tireoide === true
  //       ? 'sim'
  //       : apiValues.doenca_tireoide === false
  //         ? 'nao'
  //         : '',
  //   doenca_psiquiatrica:
  //     apiValues.doenca_psiquiatrica === true
  //       ? 'sim'
  //       : apiValues.doenca_psiquiatrica === false
  //         ? 'nao'
  //         : '',
  // };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <ComorbidadesBreadcrumbs />
      </div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className={classes.formWrapper}>
          <FormComorbidade initValues={initValues} />
        </div>
      )}
    </div>
  );
};

export default withRouter(Comorbidities);
