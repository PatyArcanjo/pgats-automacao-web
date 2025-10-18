// importando faker
import { faker } from '@faker-js/faker';

export function navegarParaLogin(){
    cy.get('a[href="/login"]').click();
}
