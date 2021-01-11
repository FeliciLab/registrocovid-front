export const sanitizeComplicacoes = newsComplicacoes => {
  return newsComplicacoes.map(complicacao => ({
    tipo_complicacao_id: complicacao.tipo_complicacao_id,
    data: complicacao.data,
    data_termino: complicacao.data_termino ? complicacao.data_termino : null,
    descricao: complicacao.descricao ? complicacao.descricao : null,
    glasgow_admissao_uti: complicacao.glasgow_admissao_uti
      ? complicacao.glasgow_admissao_uti
      : null,
    menos_24h_uti:
      typeof complicacao.menos_24h_uti === 'boolean'
        ? complicacao.menos_24h_uti
        : null,
    ph: complicacao.ph,
    pao2: complicacao.pao2,
    paco2: complicacao.paco2,
    hco3: complicacao.hco3,
    be: complicacao.be,
    sao2: complicacao.sao2,
    lactato: complicacao.lactato,
    debito_urinario: complicacao.debito_urinario,
  }));
};
