import formatDate from 'helpers/formatDate';
import api from 'services/api';

export const loadInitialValues = patient => {
  let initialValues = {
    prontuario: '',
    data_internacao: '',
    unidade_primeiro_atendimento: '',
    unidade_de_saude: '',
    data_atendimento: '',
    suporte_respiratorio: false,
    tipo_suport_respiratorio: '',
    reinternacao: false,
    chegou_traqueostomizado: false,
    ph: 0,
    pao2: 0,
    paco2: 0,
    hco3: 0,
    be: 0,
    sao2: 0,
    lactato: 0,
    debito_urinario: 0,
  };

  if (patient && patient.prontuario) {
    initialValues = {
      prontuario: patient.prontuario,
      data_internacao: patient.data_internacao,
      suporte_respiratorio: patient.suporte_respiratorio || false,
      reinternacao: patient.reinternacao || false,
      unidade_primeiro_atendimento: patient.instituicao_primeiro_atendimento
        ? patient.instituicao_primeiro_atendimento.id
        : '',
      unidade_de_saude: patient.instituicao_referencia
        ? patient.instituicao_referencia.id
        : '',
      data_atendimento: patient.data_atendimento_referencia || '',
      tipo_suport_respiratorio:
        patient.tipo_suporte_respiratorios.length > 0
          ? patient.tipo_suporte_respiratorios[0].id
          : '',
      chegou_traqueostomizado: patient.chegou_traqueostomizado,
      ph: patient.ph || 0,
      pao2: patient.pao2 || 0,
      paco2: patient.paco2 || 0,
      hco3: patient.hco3 || 0,
      be: patient.be || 0,
      sao2: patient.sao2 || 0,
      lactato: patient.lactato || 0,
      debito_urinario: patient.debito_urinario || 0,
    };
  }

  return initialValues;
};

export const postGeneralInfo = async values => {
  let patient = {
    prontuario: values.prontuario,
    data_internacao: values.data_internacao,
    instituicao_primeiro_atendimento_id: values.unidade_primeiro_atendimento,
    instituicao_refererencia_id: values.unidade_de_saude,
    data_atendimento_referencia: values.data_atendimento,
    suporte_respiratorio: values.suporte_respiratorio,
    reinternacao: values.reinternacao,
    chegou_traqueostomizado: values.chegou_traqueostomizado,
  };

  if (values.suporte_respiratorio) {
    patient = {
      ...patient,
      tipos_suporte_respiratorio: [{ id: values.tipo_suport_respiratorio }],
    };
  }

  const response = await api.post('/pacientes', patient);

  const responsePatient = {
    id: response.data.paciente.id,
    prontuario: response.data.paciente.prontuario,
    created_at: formatDate(response.data.paciente.created_at),
  };

  const complementaryResponsePatient = {
    ...responsePatient,

    data_internacao: values.data_internacao,
    suporte_respiratorio: values.suporte_respiratorio,
    reinternacao: values.reinternacao,

    instituicao_primeiro_atendimento: {
      id: values.unidade_primeiro_atendimento,
    },
    instituicao_referencia: { id: values.unidade_de_saude },
    data_atendimento_referencia: values.data_atendimento,
    tipo_suporte_respiratorios: [{ id: values.tipo_suport_respiratorio }],
    chegou_traqueostomizado: values.chegou_traqueostomizado,
  };

  return complementaryResponsePatient;
};
