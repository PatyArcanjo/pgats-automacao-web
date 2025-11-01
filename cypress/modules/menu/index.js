// importando faker
import { faker } from '@faker-js/faker';

class Menu {
 navegarParaLogin(){
    cy.get('a[href="/login"]').click();
}

  efetuarLogout() {
    cy.get('a[href="/logout"]').should('be.visible').click()
  }

   navegarParaFormularioContato() {
    cy.get('a[href="/contact_us"]').click();
  }

   navegarParaProdutos() {
    cy.get('a[href="/products"]').click();
  }

}

export default new Menu()