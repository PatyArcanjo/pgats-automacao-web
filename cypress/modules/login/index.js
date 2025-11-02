
export function formularioPraLogin() {
}

export function formularioLogin() {
    cy.get('[data-qa="login-email"]').type('QATester1@teste.com');
    cy.get('[data-qa="login-password"]').type('12345');
    cy.get('[data-qa="login-button"]').click();   
}

export function formularioLoginInvalido() {
    cy.get('[data-qa="login-email"]').type('QAInvalido@teste.com');
    cy.get('[data-qa="login-password"]').type('12345');
    cy.get('[data-qa="login-button"]').click();
    cy.contains('Your email or password is incorrect!').should('be.visible');
    
}

export function logOutUsuario() {
    cy.get('[data-qa="login-email"]').type('QATester1@teste.com');
    cy.get('[data-qa="login-password"]').type('12345');
    cy.get('[data-qa="login-button"]').click();
    cy.contains('Logged in as').should('be.visible');
    cy.get('a[href="/logout"]').click();
    cy.url().should('includes', '/login'); 
    
}

export function verificaUsuarioLogado() {
    cy.contains('Logged in as').should('be.visible');  
}



 