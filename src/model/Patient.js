import formatDate from 'helpers/formatDate';

class Patient {
  constructor({
                id = '',
                prontuario = '',
                data_internacao = '',
                created_at = '',
                suporte_respiratorio = false,
                reinternacao = false,
                unidade_primeiro_atendimento = '',
                unidade_de_saude = '',
                data_atendimento = '',
                tipo_suport_respiratorio = '',
              } = {
    id: '',
    prontuario: '',
    data_internacao: '',
    created_at: '',
    suporte_respiratorio: false,
    reinternacao: false,
    unidade_primeiro_atendimento: '',
    unidade_de_saude: '',
    data_atendimento: '',
    tipo_suport_respiratorio: '',
  }) {
    this.id = id;
    this.prontuario = prontuario;
    this.data_internacao = data_internacao;
    this.created_at = created_at;
    this.suporte_respiratorio = suporte_respiratorio;
    this.reinternacao = reinternacao;
    this.unidade_primeiro_atendimento = unidade_primeiro_atendimento;
    this.unidade_de_saude = unidade_de_saude;
    this.data_atendimento = data_atendimento;
    this.tipo_suport_respiratorio = tipo_suport_respiratorio;
  }

  static fromAPI(patientAPI) {
    return new Patient({
      id: patientAPI.id,
      prontuario: patientAPI.prontuario,
      data_internacao: patientAPI.data_internacao,
      created_at: formatDate(patientAPI.created_at),

      suporte_respiratorio: patientAPI.suporte_respiratorio || false,
      reinternacao: patientAPI.reinternacao || false,

      unidade_primeiro_atendimento: patientAPI.instituicao_primeiro_atendimento ? patientAPI.instituicao_primeiro_atendimento.id : '',
      unidade_de_saude: patientAPI.instituicao_referencia ? patientAPI.instituicao_referencia.id : '',
      data_atendimento: patientAPI.data_atendimento_referencia || '',
      tipo_suport_respiratorio: patientAPI.tipo_suporte_respiratorios.length > 0 ? patientAPI.tipo_suporte_respiratorios[0].id : '',
    });
  }

  toAPI() {
    let patientAPI = {
      prontuario: this.prontuario,
      data_internacao: this.data_internacao,

      suporte_respiratorio: this.suporte_respiratorio,
      reinternacao: this.reinternacao,

      instituicao_primeiro_atendimento_id: this.unidade_primeiro_atendimento,
      instituicao_refererencia_id: this.unidade_de_saude,
      data_atendimento_referencia: this.data_atendimento,
    };

    if (this.suporte_respiratorio) {
      patientAPI = {
        ...patientAPI,
        tipos_suporte_respiratorio: [{id: this.tipo_suport_respiratorio}],
      };
    }
    return patientAPI;
  }
}

export {Patient};
