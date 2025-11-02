import { faker } from '@faker-js/faker';
import userData from '../../fixtures/example.json';
export function formularioContato() {
}

export function formularioparaContato() {
    cy.get('[data-qa="name"]').type(userData.name);
    cy.get('[data-qa="email"]').type(userData.email);
    cy.get('[data-qa="subject"]').type(userData.subject);
    cy.get('[data-qa="message"]').type(userData.message);   
}  

export function uploadArquivo() {
    //anexar arquivo ao formulario
    cy.fixture('example.json').as('arquivo');
    cy.get('[name="upload_file"]').selectFile('@arquivo');
    cy.get('[data-qa="submit-button"]').click();
}

export function validacaoEnvioFormulario() {
    
    //validacao envio formulario
    cy.get('.status').should('contain.text', 'Success! Your details have been submitted successfully.');
}

export function verificarAssinaturaDaPagina() {
    cy.scrollTo('bottom');
    cy.get('footer').should('be.visible');
    cy.get('#susbscribe_email').type(faker.internet.email())
    cy.get('#subscribe').click();
    cy.contains('You have been successfully subscribed!').should('be.visible'); 
}