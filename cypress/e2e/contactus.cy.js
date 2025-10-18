
/// <reference types="cypress" />
 
import userData from '../fixtures/example.json'


describe('Enviar formulário de Contato com upload de arquivo', () => {
    it('Formulário Contact US', () => {      // before ou beforeEach -> executa antes de cada it
        cy. visit('https://www.automationexercise.com/contact_us');
        cy.get('[data-qa="name"]').type(userData.name);
        cy.get('[data-qa="email"]').type(userData.email);
        cy.get('[data-qa="subject"]').type(userData.subject);
        cy.get('[data-qa="message"]').type(userData.message);   
        //cy.get('[name="upload_file"]').click();
        //cy.get('[name="upload_file"]').selectFile('cypress/fixtures/example.json'); // anexar arquivo
        
        //outra opcao 

        cy.fixture('example.json').as('arquivo');
        cy.get('[name="upload_file"]').selectFile('@arquivo');

        // cy.get('input[type=file]') - outra opcao para selecionar o campo de upload
        cy.get('[data-qa="submit-button"]').click();
        cy.get('.status').should('contain.text', 'Success! Your details have been submitted successfully.');
    });        
})
