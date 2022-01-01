/// <reference types="cypress"/>

import {
  base_url
} from '../../src/config.json';

describe('categories', () => {
  //overbodige get requests intercepten en mocken
  before(() => {
    cy.intercept('GET', `${base_url}/directors`, {
      fixture: 'directors.json',
    });

    cy.intercept('GET', `${base_url}/movies`, {
      fixture: 'movies.json',
    });
  });

  describe('get categories', () => {
    it('should say there are no categories', () => {
      cy.intercept('GET', `${base_url}/categories`, {
        data: [],
      });

      cy.visit('http://localhost:3000');
      cy.get('[data-cy=home_category_button]').click();
      cy.get('[data-cy=category_overview_nocatsfound]').should('exist');
    })


    it('should show the categories', () => {
      cy.intercept('GET', `${base_url}/categories`, {
        fixture: 'categories.json',
      });

      cy.visit('http://localhost:3000');
      cy.get('[data-cy=home_category_button]').click();

      cy.get('[data-cy=category_overview_cats]').children().should('exist');
      cy.get('[data-cy=category_link]').should('exist');
      cy.get('[data-cy=category_name]').should('exist');
      cy.get('[data-cy=category_description]').should('exist');
    });
  });

  describe('update categories', () => {
    beforeEach(() => {
      cy.login('remco.desmedt@student.hogent.be', 'remcodsmdt');
    });

    it('should edit the category', () => {
      cy.visit('http://localhost:3000');

      //categorieen
      cy.get('[data-cy=home_category_button]').click();

      //edit cat
      cy.get('[data-cy=category_edit_button]').eq(0).click();

      //form invullen
      cy.get('[data-cy=category_link_input]').clear().type('https://media.s-bol.com/xkqpRqQ88mLl/550x788.jpg');
      cy.get('[data-cy=category_name_input]').clear().type('Actionnameupdate');
      cy.get('[data-cy=category_description_input]').clear().type('actiondescriptionupdate');

      //submit
      cy.get('[data-cy=category_submit]').eq(0).click();

      //verwachten dat het werkt
      //afbeelding moet juist zijn
      cy.get('[data-cy=category_link]').eq(0).invoke('attr', 'src')
        .should('eq', 'https://media.s-bol.com/xkqpRqQ88mLl/550x788.jpg');

      cy.get('[data-cy=category_name]').eq(0).contains('Actionnameupdate');
      cy.get('[data-cy=category_description]').eq(0).contains('actiondescriptionupdate');
    });

    it('undo changes from updating categories', () => {
      cy.visit('http://localhost:3000');

      cy.get('[data-cy=home_category_button]').click();
      cy.get('[data-cy=category_edit_button]').eq(0).click();

      cy.get('[data-cy=category_link_input]').clear().type('https://images.unsplash.com/photo-1598389759169-4e0c192c6816?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80');
      cy.get('[data-cy=category_name_input]').clear().type('Action');
      cy.get('[data-cy=category_description_input]').clear().type('war, martial arts, guns');

      cy.get('[data-cy=category_submit]').eq(0).click();
    });

    it('should display an error', () => {
      cy.visit('http://localhost:3000');

      //categorieen
      cy.get('[data-cy=home_category_button]').click();

      //edit cat
      cy.get('[data-cy=category_edit_button]').eq(0).click();

      //formulier half invullen
      cy.get('[data-cy=category_link_input]').clear();

      //submit
      cy.get('[data-cy=category_submit]').eq(0).click();

      //assert
      cy.get('[data-cy=categoryform_error]').should('exist');
    });

  });

  describe('create categories', () => {
    beforeEach(() => {
      cy.login('remco.desmedt@student.hogent.be', 'remcodsmdt');
    });

    it('should create the category', () => {
      cy.visit('http://localhost:3000');

      //categorieen
      cy.get('[data-cy=home_category_button]').click();

      //add cat
      cy.get('[data-cy=category_overview_addCategory]').click();

      //form invullen
      cy.get('[data-cy=category_link_input]').clear().type('https://raiglotmoto.be/wp-content/uploads/2019/03/NEW.jpg');
      cy.get('[data-cy=category_name_input]').clear().type('NewCat');
      cy.get('[data-cy=category_description_input]').clear().type('newDescr');

      //submit
      cy.get('[data-cy=category_submit]').click();

      //assert
      cy.get('[data-cy=category_link]').last().invoke('attr', 'src')
        .should('eq', 'https://raiglotmoto.be/wp-content/uploads/2019/03/NEW.jpg');
      cy.get('[data-cy=category_name]').last().contains('NewCat');
      cy.get('[data-cy=category_description]').last().contains('newDescr');
    });

    it('undo changes from creating category', () => {
      cy.visit('http://localhost:3000');

      //categorieen
      cy.get('[data-cy=home_category_button]').click();

      cy.get('[data-cy=category_delete_button]').last().click();
    });

    it('should display an error', () => {
      cy.visit('http://localhost:3000');

      //categorieen
      cy.get('[data-cy=home_category_button]').click();

      //categorieen
      cy.get('[data-cy=category_overview_addCategory]').click();

      //submit zonder iets in te vullen
      cy.get('[data-cy=category_submit]').click();

      //assert
      cy.get('[data-cy=categoryform_error]').should('exist');
    });
  });

  describe('delete categories', () => {
    beforeEach(() => {
      cy.login('remco.desmedt@student.hogent.be', 'remcodsmdt');

      //cat toevoegen om te deleten
      cy.visit('http://localhost:3000');
      cy.get('[data-cy=home_category_button]').click();

      cy.get('[data-cy=category_overview_addCategory]').click();

      cy.get('[data-cy=category_link_input]').clear().type('https://raiglotmoto.be/wp-content/uploads/2019/03/NEW.jpg');
      cy.get('[data-cy=category_name_input]').clear().type('NewCat');
      cy.get('[data-cy=category_description_input]').clear().type('newDescr');

      cy.get('[data-cy=category_submit]').click();
    });

    it('should delete the category', () => {
      cy.visit('http://localhost:3000');

      //categorieen
      cy.get('[data-cy=home_category_button]').click();

      //aantal cats
      cy.get('[data-cy=category_delete_button]').then((e) => {
        return parseInt(e.length);
      }).then((e) => {
        //delete
        cy.get('[data-cy=category_delete_button]').last().click().then(() => {
          //aantal moet -1 zijn
          cy.get('[data-cy=category_delete_button]').its('length').should('eq', e - 1);
        })
      });
    });
  })
});