/// <reference types="cypress"/>

import {
  base_url
} from '../../src/config.json';


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
Cypress.Commands.add('login', (email, password) => {
  cy.intercept(`${base_url}/users/login`).as('login');
  cy.visit('http://localhost:3000/#/login');

  cy.get('[data-cy=login_input_email]').type(email);
  cy.get('[data-cy=login_input_password]').type(password);

  cy.get('[data-cy=login_submit]').click();

  cy.wait('@login');
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })