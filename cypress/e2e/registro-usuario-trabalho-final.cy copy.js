/// <reference types="cypress" />

import userData from '../fixtures/example.json'; 
import { faker } from '@faker-js/faker';

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://www.automationexercise.com/');
        cy.get('a[href="/login"]').click();
    })

    it('1 - Cadastrar Usuário', () => {
        cy.get('[data-qa="signup-name"]').type(faker.person.fullName());
        cy.get('[data-qa="signup-email"]').type(faker.internet.email());
        cy.contains('button','Signup').click(); // sem id definido buscando pelo texto do botão e que seja do tipo button
        
        cy.get('input[type=radio][value=Mrs]').check(); // selecionar o radio button pelo atributo type e value

        cy.get('#password').type(faker.internet.password());
        cy.get('#days').select('10'); // selecionar do combo dia 
        cy.get('select[data-qa="months"]').select('May'); // selecionar do combo mês
        cy.get('#years').select('2021'); // selecionar do combo ano 
        cy.get('select[data-qa="months"]').select('May'); // selecionar do combo mês
        
        //checkbox
        cy.get('[name="newsletter"]').check(); // selecionar o checkbox pelo atributo name
        cy.get('input[type=checkbox]#optin').check(); // selecionar o checkbox pelo atributo name

        //select
        cy.get('[data-qa="first_name"]').type(faker.person.firstName());
        cy.get('[data-qa="last_name"]').type(faker.person.lastName());
        cy.get("input#company").type('Company LTDA');
        cy.get("input#address1").type('Street address, n 2004');
        cy.get('[data-qa="country"]').select('United States');
        cy.get("input#state").type('NY');
        cy.get("input#city").type('São Paulo');
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode());
        cy.get("input#mobile_number").type(faker.phone.number());
        cy.get('[data-qa="create-account"]').click();

        // validação
        cy.url().should('includes', '/account_created'); // validação de url, recupera a url da página atual e valida se inclui o texto
        cy.contains('b','Account Created!') // Verificar se existe o texto na página
    })

    it('LOG', () => {
        cy.log(`Nome do Usuário: ${userData.name}`) // exibe no log do cypress o nome que está no arquivo json
        cy.log(userData.email) // exibe no log do cypress o email que está no arquivo json
        cy.log(userData.body) // exibe no log do cypress o body que está no arquivo json
        cy.log(faker.person.fullName());

    });

    it('2 - Login do Usuário com email e senha corretos', () => {
        cy.get('[data-qa="login-email"]').type('QATester1@teste.com');
        cy.get('[data-qa="login-password"]').type('12345');
        cy.get('[data-qa="login-button"]').click();

    });
    it('3 - Login do Usuário com email e senhas inválidos', () => {
        cy.url().should('includes', '/login');
        cy.get('[data-qa="login-email"]').type('QAInvalidoteste.com');
        cy.get('[data-qa="login-password"]').type('12345');
        cy.get('[data-qa="login-button"]').click();
        cy.contains('Your email or password is incorrect!').should('be.visible');
    });

    it('4 - Logout do Usuário', () => {
        cy.get('[data-qa="login-email"]').type('QATester1@teste.com');
        cy.get('[data-qa="login-password"]').type('12345');
        cy.get('[data-qa="login-button"]').click();
        cy.contains('Logged in as').should('be.visible');
        cy.get('a[href="/logout"]').click();
        cy.url().should('includes', '/login'); 
    });

    it('5 - Cadastrar Usuário com email existente no sistema', () => {
        cy.get('[data-qa="signup-name"]').type('QATester1');
        cy.get('[data-qa="signup-email"]').type('QATester1@teste.com');
        cy.contains('button','Signup').click(); // sem id definido buscando pelo texto do botão e que seja do tipo button
        cy.contains('Email Address already exist!').should('be.visible');  
    });
})