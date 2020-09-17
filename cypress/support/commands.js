// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('reset_and_seed', () => {
  cy.exec('docker exec -i registrocovid-api_php-fpm_1 php artisan migrate:fresh --seed');

  cy.request('POST', 'http://localhost:7000/api/auth/register',
    {
      'name': 'Joao',
      'instituicao_id': 1,
      'cpf': '1231234',
      'email': 'email@teste.com',
      'password': '123456'
    });
})

Cypress.Commands.add('login', () => {
  cy.get('input[name=cpf]').type('1231234');
  cy.get('input[name=password]').type('123456');

  cy.get('button').contains(/entrar/i).click();
})
