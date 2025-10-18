/// <reference types="cypress" />

import userData from '../fixtures/example.json'; //importa o arquivo json
// importando faker
import { faker } from '@faker-js/faker';


import { navegarParaLogin } from '../modules/menu/index.js';

import { formularioPraLogin } from '../modules/login/index.js';
import { formularioPreCadastro, formularioCadastro, validacaoCadastro } from '../modules/cadastro/index.js';
import Menu from '../modules/menu/index.js';

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://www.automationexercise.com/');
        //navegarParaLogin();
        Menu.navegarParaLogin();
    })

    it.only('Cadastrar Usuário', () => {
        //preencher o formulário de pre cadastro
        formularioPreCadastro();

        //  //preencher o formulário de pre cadastro
        formularioCadastro();
        
        // // validação
        validacaoCadastro();
    })

    it('Login do Usuário', () => {
        cy.get('[data-qa="login-email"]').type('QATester1@teste.com');
        cy.get('[data-qa="login-password"]').type('12345');
        cy.get('[data-qa="login-button"]').click();

    });
    it('Login do Usuário Inválido', () => {
        cy.url().should('includes', '/login');
        cy.get('[data-qa="login-email"]').type('QAInvalido@teste.com');
        cy.get('[data-qa="login-password"]').type('12345');
        cy.get('[data-qa="login-button"]').click();

        cy.contains('Your email or password is incorrect!').should('be.visible');

    });

    it('Logout do Usuário', () => {
        cy.get('[data-qa="login-email"]').type('QATester1@teste.com');
        cy.get('[data-qa="login-password"]').type('12345');
        cy.get('[data-qa="login-button"]').click();
        //cy.contains(`Logged in as ${tsterUser.name}!`).should('be.visible');
        cy.contains('Logged in as').should('be.visible');
        cy.get('a[href="/logout"]').click();
        cy.url().should('includes', '/login'); 

    });

    it('Cadastrar Usuário com email existente no sistema', () => {
        cy.get('[data-qa="signup-name"]').type('QATester1');
        cy.get('[data-qa="signup-email"]').type('QATester1@teste.com');
        cy.contains('button','Signup').click(); // sem id definido buscando pelo texto do botão e que seja do tipo button
        cy.contains('Email Address already exist!').should('be.visible');  

});

})