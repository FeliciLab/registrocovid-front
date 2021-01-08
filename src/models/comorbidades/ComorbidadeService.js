import api from 'services/api';
import ComorbidadeModel from 'models/comorbidades/ComorbidadeModel';

/** Funções para validação do formulário */
const validarCamposBoleanos = campos => {
  const camposBooleanos = [
    'diabetes',
    'obesidade',
    'hipertensao',
    'doenca_cardiaca',
    'doenca_vascular_periferica',
    'doenca_pulmonar_cronica',
    'doenca_reumatologica',
    'neoplasia',
    'quimioterapia',
    'HIV',
    'transplantado',
    'corticosteroide',
    'doenca_autoimune',
    'doenca_renal_cronica',
    'doenca_hepatica_cronica',
    'doenca_neurologica',
    'tuberculose',
    'gestacao',
    'puerperio',
  ];

  return camposBooleanos.find(
    item =>
      campos[item] === true || campos[item] === 'sim' || campos[item] === 'nao',
  );
};

const validarCamposLista = campos => {
  const camposListas = ['outras_condicoes', 'medicacoes', 'doencas'];
  return camposListas.find(
    item =>
      campos[item] &&
      campos[item].length > 0 &&
      campos[item].some(elem => elem === true),
  );
};

export const validarCamposFormularioParaSalvar = campos => {
  return (
    validarCamposBoleanos(campos) !== undefined ||
    validarCamposLista(campos) !== undefined
  );
};
/** *** **/

/** Funções auxiliares para envio e recebimento dos dados do formulário */
const formatarSimNaoParaBooleano = (dados, toModel) => {
  const camposConverter = [
    'quimioterapia',
    'transplantado',
    'corticosteroide',
    'gestacao',
    'puerperio',
  ];

  for (let campo of camposConverter) {
    if (!Object.prototype.hasOwnProperty.call(dados, campo)) {
      continue;
    }

    if (toModel) {
      dados[campo] = dados[campo] ? 'sim' : 'nao';
      continue;
    }

    dados[campo] = dados[campo] === 'sim';
  }

  return dados;
};

const formatarCamposNumericos = dados => {
  if (dados.gestacao && dados.gestacao_semanas < 0) {
    dados.gestacao_semanas =
      dados.gestacao_semanas < 0 ? 0 : parseInt(dados.gestacao_semanas);
  }

  if (dados.puerperio && dados.puerperio_semanas < 0) {
    dados.puerperio_semanas =
      dados.puerperio_semanas < 0 ? 0 : parseInt(dados.puerperio_semanas);
  }

  return dados;
};

const formatarMatrizCheckboxParaMatrizDeIds = (dados, toModel) => {
  for (let relationship of Object.keys(
    ComorbidadeModel.modelRelationshipManyToMany,
  )) {
    if (
      !dados[relationship] ||
      !Object.prototype.hasOwnProperty.call(dados, relationship)
    ) {
      continue;
    }

    if (toModel) {
      dados[relationship] = dados[relationship].reduce((acc, curr) => {
        if (acc.length < curr.id) {
          for (let tamanho = acc.length; tamanho <= curr.id; tamanho++) {
            acc.push(false);
          }
        }

        acc[curr.id] = true;
        return acc;
      }, []);

      continue;
    }

    dados[relationship] = dados[relationship].reduce((acc, curr, index) => {
      if (curr) {
        acc.push(index);
      }
      return acc;
    }, []);
  }

  return dados;
};

const mapCampoModel = dados => {
  const model = {};
  for (let field of Object.keys(ComorbidadeModel.model)) {
    if (!Object.prototype.hasOwnProperty.call(dados, field)) continue;
    model[field] = dados[field];
  }

  if (model.id === '') {
    delete model.id;
  }

  return model;
};

const definirTiposDoencasParaForm = dados => {
  dados.tipo_doencas = [];
  if (
    !Object.prototype.hasOwnProperty.call(dados, 'doencas') &&
    dados.doencas.length === 0
  ) {
    return dados;
  }

  for (let doenca of dados.doencas) {
    const tipo = ComorbidadeModel.mapCamposComorbidadesTipoDoencas.find(
      tipo => tipo.idTipoDoenca === doenca.tipo_doenca_id,
    );
    if (tipo && !dados.tipo_doencas.find(d => d.id === tipo.idTipoDoenca)) {
      dados.tipo_doencas = [
        ...dados.tipo_doencas,
        { ...tipo, id: tipo.idTipoDoenca },
      ];
    }
  }

  return dados;
};

const converterRequisicaoParaModelo = dados => {
  dados = { ...definirTiposDoencasParaForm(dados) };
  dados = { ...formatarSimNaoParaBooleano(dados, true) };
  dados = { ...formatarMatrizCheckboxParaMatrizDeIds(dados, true) };
  return dados;
};

export const submitFormComorbidade = dados => {
  dados = { ...formatarSimNaoParaBooleano(dados) };
  dados = { ...formatarCamposNumericos(dados) };
  dados = { ...formatarMatrizCheckboxParaMatrizDeIds(dados) };
  dados = { ...mapCampoModel(dados) };
  return api.post(`/pacientes/${dados.paciente_id}/comorbidades`, dados);
};

export default {
  submitFormComorbidade,
  validarCamposFormularioParaSalvar,
  converterRequisicaoParaModelo,
};
