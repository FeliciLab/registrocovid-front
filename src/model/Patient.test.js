import {Patient} from './Patient';
import formatDate from '../helpers/formatDate';
import PropTypes from "prop-types";

test('Deve criar paciente com valores default se nenhum dado é passado', () => {
  const patient = new Patient();

  expect(patient).toEqual({
    created_at: '',
    data_atendimento: '',
    data_internacao: '',
    id: '',
    prontuario: '',
    reinternacao: false,
    suporte_respiratorio: false,
    tipo_suport_respiratorio: '',
    unidade_de_saude: '',
    unidade_primeiro_atendimento: '',
  });
});

test('Deve criar paciente com valor para o atributo enviado e valores default para demais campos', () => {
  const patient = new Patient({unidade_primeiro_atendimento: 'Exemplo Unidade'});

  expect(patient).toEqual({
    created_at: '',
    data_atendimento: '',
    data_internacao: '',
    id: '',
    prontuario: '',
    reinternacao: false,
    suporte_respiratorio: false,
    tipo_suport_respiratorio: '',
    unidade_de_saude: '',
    unidade_primeiro_atendimento: 'Exemplo Unidade',
  });
});

test('Deve converter dados recebidos da API para paciente com todos os campos - get', () => {
  const patientAPI = {
    id: 9,
    prontuario: 11,
    data_internacao: '2020-09-01',
    created_at: '2020-09-16T15:45:29.000000Z',
    suporte_respiratorio: true,
    reinternacao: true,
    instituicao_primeiro_atendimento: {id: 1, nome: 'Primeiro atendimento'},
    instituicao_referencia: {id: 2, nome: 'Referencia'},
    data_atendimento_referencia: '2020-09-02',
    tipo_suporte_respiratorios: [{id: 3, nome: 'Suporte'}],
  };

  const patient = Patient.fromAPI(patientAPI);

  expect(patient).toEqual({
    id: 9,
    prontuario: 11,
    data_internacao: '2020-09-01',
    created_at: '16/09/2020',
    suporte_respiratorio: true,
    reinternacao: true,
    unidade_primeiro_atendimento: 1,
    unidade_de_saude: 2,
    data_atendimento: '2020-09-02',
    tipo_suport_respiratorio: 3
  });
});

test('Deve converter dados recebidos da API para paciente quando passados somente campos requeridos - get', () => {
  const patientAPI = {
    id: 9,
    prontuario: 11,
    data_internacao: '2020-09-01',
    created_at: '2020-09-16T15:45:29.000000Z',

    suporte_respiratorio: false,
    reinternacao: false,
    instituicao_primeiro_atendimento: null,
    instituicao_referencia: null,
    data_atendimento_referencia: null,
    tipo_suporte_respiratorios: [],
  };

  const patient = Patient.fromAPI(patientAPI);

  expect(patient).toEqual({
    id: 9,
    prontuario: 11,
    data_internacao: '2020-09-01',
    created_at: '16/09/2020',
    suporte_respiratorio: false,
    reinternacao: false,
    unidade_primeiro_atendimento: '',
    unidade_de_saude: '',
    data_atendimento: '',
    tipo_suport_respiratorio: ''
  });
});

test('Deve converter paciente em dados para API - post', () => {
  const patient = new Patient({
    prontuario: 11,
    data_internacao: '2020-09-01',
    suporte_respiratorio: true,
    reinternacao: true,
    unidade_primeiro_atendimento: 1,
    unidade_de_saude: 2,
    data_atendimento: '2020-09-02',
    tipo_suport_respiratorio: 3
  });

  const patientAPI = patient.toAPI();

  expect(patientAPI).toEqual({
    prontuario: 11,
    data_internacao: '2020-09-01',
    suporte_respiratorio: true,
    reinternacao: true,
    instituicao_primeiro_atendimento_id: 1,
    instituicao_refererencia_id: 2,
    data_atendimento_referencia: '2020-09-02',
    tipos_suporte_respiratorio: [{id: 3}],
  });
});


test('Deve converter paciente em dados para API quando passados somente campos requeridos - post', () => {
  const patient = new Patient({
    prontuario: 11,
    data_internacao: '2020-09-01',
  });

  const patientAPI = patient.toAPI();

  expect(patientAPI).toEqual({
    prontuario: 11,
    data_internacao: '2020-09-01',
    suporte_respiratorio: false,
    reinternacao: false,
    instituicao_primeiro_atendimento_id: '',
    instituicao_refererencia_id: '',
    data_atendimento_referencia: '',
  });
});
