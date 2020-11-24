const modelRelationshipManyToMany = {
  doencas: [],
  orgaos: [],
  corticosteroides: [],
};

const model = {
  id: '',
  paciente_id: '',
  diabetes: false,
  obesidade: false,
  hipertensao: false,
  doenca_cardiaca: false,
  doenca_vascular_periferica: false,
  doenca_pulmonar_cronica: false,
  doenca_reumatologica: false,
  neoplasia: false,
  quimioterapia: false,
  HIV: false,
  transplantado: false,
  corticosteroide: false,
  doenca_autoimune: false,
  doenca_renal_cronica: false,
  doenca_hepatica_cronica: false,
  doenca_neurologica: false,
  tuberculose: false,
  gestacao: false,
  gestacao_semanas: 0,
  puerperio: false,
  puerperio_semanas: 0,
  outras_condicoes: [],
  medicacoes: [],
  created_at: new Date(),
  updated_at: new Date(),
  ...modelRelationshipManyToMany,
};

const mapCamposComorbidadesTipoDoencas = [
  {
    idTipoDoenca: 1,
    campoComorbidade: 'doenca_cardiaca',
    descricao: 'Doença cardíaca',
  },
  {
    idTipoDoenca: 2,
    campoComorbidade: 'doenca_vascular_periferica',
    descricao: 'Doença vascular periférica',
  },
  {
    campoComorbidade: 'doenca_pulmonar_cronica',
    idTipoDoenca: 3,
    descricao: 'Doença pulmonar',
  },
  {
    campoComorbidade: 'doenca_reumatologica',
    iidTipoDoenca: 4,
    descricao: 'Doença reumatológica / autoimune',
  },
  {
    campoComorbidade: 'cancer',
    idTipoDoenca: 5,
    descricao: 'Câncer',
  },
  {
    campoComorbidade: 'doenca_renal_cronica',
    idTipoDoenca: 6,
    descricao: 'Doença renal crônica',
  },
  {
    campoComorbidade: 'doenca_hepatica_cronica',
    idTipoDoenca: 7,
    descricao: 'Doença hepática crônica',
  },
  {
    campoComorbidade: 'doenca_neurologica',
    idTipoDoenca: 8,
    descricao: 'Doença neurológica',
  },
  {
    campoComorbidade: 'doenca_tireoide',
    idTipoDoenca: 9,
    descricao: 'Doença da tireoide',
  },
  {
    campoComorbidade: 'doenca_psiquiatrica',
    idTipoDoenca: 10,
    descricao: 'Doença psiquiátrica',
  },
];

const getCampoComorbidadePorIdTipoDoenca = id => {
  const campo = mapCamposComorbidadesTipoDoencas.find(
    item => item.idTipoDoenca === id,
  );
  if (!campo) {
    return false;
  }

  return campo.campoComorbidade;
};

export default {
  model,
  mapCamposComorbidadesTipoDoencas,
  getCampoComorbidadePorIdTipoDoenca,
  modelRelationshipManyToMany,
};
