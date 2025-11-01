// importando faker
import { faker } from '@faker-js/faker';

export function navegarParaLogin(){
    cy.get('a[href="/login"]').click();
}

export function navegarParaFormularioContato(){
    cy.get('href="/contact_us"]').click();
}


