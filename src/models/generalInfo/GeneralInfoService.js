const loadInitialValues = patient => {
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
    };
  }

  return initialValues;
};

export default { loadInitialValues };
