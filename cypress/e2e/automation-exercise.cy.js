/// <reference types="cypress" />
/// <reference types="cypress" /> ajuda o cypress a entender o código

//consultar elementos
// tag : pesquisa por tag html, ex: button, input, div      
// id : #id , pesquisa como o #
    //ex: #submit, #ciy
// atributo : [atributo=valor]
    //ex: [type=submit], [href="/login"]
// class : .class
    //ex: .btn, .container
// combinação : tag#id.atributo[atributo=valor]
    //ex: button#submit.btn[type=submit]

// a[href*=contact] -> busca o link que contém a palavra contact
// a[href$=contact] -> busca o link que termina com a palavra contact
// a[href^=contact] -> busca o link que começa com a palavra contact

//cy.get('button#submit.btn[type=submit]') -> busca o botão com id submit, classe btn e atributo type com valor submit

// describe / context -> descreve o bloco de testes
//it - um teste dentro de um bloco ou conjunto de testes  -> cada it é independente
// before -> executa uma vez antes de todos os testes
// after -> executa uma vez depois de todos os testes
// beforeEach -> executa antes de cada teste
// afterEach -> executa depois de cada teste


//Hooks -> ganchos
//before -> antes de todos os it
//  beforeEach -> antes     de cada it
//after -> depois de todos os it
//  afterEach ->> depois de cada it

//ex:
// descrive
    //beforeach 
    // it -> teste
    // it -> teste

//assertions -> afirmações ou validações
// should -> deve
// expect -> esperar







// describe -> automaticon exercise

import userData from '../fixtures/example.json'; //importa o arquivo json
//import { getrandomNumber } from '../support/helpers.js';

// importando faker
import { faker } from '@faker-js/faker';

import { getRandomEmail } from '../support/helpers.js';

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://www.automationexercise.com/');
        cy.get('a[href="/login"]').click();
    })

    it('Cadastrar Usuário', () => {
        const timestamp = new Date().getTime(); // para gerar email dinâmico 
        cy.get('[data-qa="signup-name"]').type('QATester1');
        //cy.get('[data-qa="signup-email"]').type('qatester1@teste.com'); - passando email fixo   
        //cy.get('[data-qa="signup-email"]').type(`qatester1-${timestamp}@teste.com`);
        cy.get('[data-qa="signup-email"]').type(`qatester1-${timestamp}@teste.com`, { parseSpecialCharSequences: false });
        cy.contains('button','Signup').click(); // sem id definido buscando pelo texto do botão e que seja do tipo button
        // cy.get('[data-qa="signup-button"]').click(); com id definido
        //cy.get('#id_gender2').check(); // selecionar o radio button pelo id
        cy.get('input[type=radio][value=Mrs]').check(); // selecionar o radio button pelo atributo type e value

        cy.get('#password').type('12345@@'), {log: false}; // o log false não mostra a senha no cypress
        
        // para combo box usar o select
        cy.get('#days').select('10'); // selecionar do combo dia 
       // cy.get('[data-qa="months"]').select('May'); // selecionar do combo mês  
        cy.get('select[data-qa="months"]').select('May'); // selecionar do combo mês
        cy.get('#years').select('2021'); // selecionar do combo ano 
        
        cy.get('select[data-qa="months"]').select('May'); // selecionar do combo mês
        
        //checkbox
        cy.get('[name="newsletter"]').check(); // selecionar o checkbox pelo atributo name
        cy.get('input[type=checkbox]#optin').check(); // selecionar o checkbox pelo atributo name

        //select
        cy.get('[data-qa="first_name"]').type('Tester0210');
        cy.get('[data-qa="last_name"]').type('lastname2210');
        cy.get("input#company").type('Company LTDA');
        cy.get("input#address1").type('Street address, n 2004');
        cy.get('[data-qa="country"]').select('United States');
        cy.get("input#state").type('NY');
        cy.get("input#city").type('São Paulo');
        cy.get('[data-qa="zipcode"]').type('01234567');
        cy.get("input#mobile_number").type('11999999999');
        cy.get('[data-qa="create-account"]').click();

        
        // triple A - Arrange, Act, Assert
        // Arrange - organizar / preparar o cenário (dado que, dado que)
        // Act - agir (quando, quando)
        // Assert - afirmar (então, então)

        // validação
        cy.url().should('includes', '/account_created'); // validação de url, recupera a url da página atual e valida se inclui o texto
        cy.contains('b','Account Created!') // Verificar se existe o texto na página
    })

    it('LOG', () => {
        cy.log(`Nome do Usuário: ${userData.name}`) // exibe no log do cypress o nome que está no arquivo json
        cy.log(userData.email) // exibe no log do cypress o email que está no arquivo json
        cy.log(userData.body) // exibe no log do cypress o body que está no arquivo json
     // REVER ISSO NO VIDEO   cy.log(getrandomNumber()) // exibe no log do cypress o número gerado pela função getrandomNumber que está no arquivo helpers.js
        cy.log(faker.person.fullName());
        cy.log(getRandomEmail)
    });

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

//describe ou context -> agrupa testes
// it -> teste em si

});

})