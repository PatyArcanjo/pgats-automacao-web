/// <reference types="cypress" />

import userData from '../fixtures/example.json'; 
import { faker } from '@faker-js/faker';

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://www.automationexercise.com/');
        cy.get('a[href="/login"]').click();
    })

})