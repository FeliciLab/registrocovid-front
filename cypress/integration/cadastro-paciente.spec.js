describe('Página meus pacientes', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.reset_and_seed();

    cy.login();

    cy.contains('Meus pacientes');
  });

  it('deve permitir cadastrar uma nova paciente e vizualizar dados cadastrados', () => {
    cy.get('button').contains(/cadastrar/i).click();

    cy.contains('Informações Gerais');

    cy.get('input[name=prontuario]').type('99');
    cy.get('input[name=data_internacao').type('2020-01-01');

    cy.get('button').contains(/salvar/i).click();

    cy.contains('Ficha Inicial');

    cy.contains('Informações gerais').click();

    cy.get('input[name=prontuario]').should('have.value', '99');
    cy.get('input[name=data_internacao').should('have.value', '2020-01-01');
  });
});
