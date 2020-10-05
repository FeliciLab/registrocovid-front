import formatDate from './formatDate';

describe('testa os outputs gerados pela função de formatação de datas', () => {
  it('deve retornar data formatada com barras laterais', () => {
    const inputDate = '2020-09-18';
    const formatedDate = formatDate(inputDate);
    expect(formatedDate).toBe('18/09/2020');
  });

  it('deve remover o horário da data', () => {
    const inputDate = '2020-09-11T11:59:58.000000Z';
    const formatedDate = formatDate(inputDate);
    expect(formatedDate).toBe('11/09/2020');
  });
});
