describe('Página de login', () => {
  it('deve carregar corretamente com o título Registro Covid', () => {
    cy.visit('/');

    cy.contains('Registro Covid');
  });

  it('deve exibir meus pacientes ao logar com sucesso', () => {
    cy.reset_and_seed();

    cy.visit('/');

    cy.login('1231234', '123456');

    cy.contains('Meus pacientes');
  });
});
