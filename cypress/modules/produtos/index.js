export function paginaProduto() {
}

export function listaTodosProdutos() {
    //verifica se esta na pagina de produtos
    cy.url().should('include', '/products');    
    //verifica se todos os produtos estão visiveis
    cy.get('.features_items').find('title texte-center').contains('All Products').should('be.visible');
}

export function verProduto(id) {
    cy.get(`[href="/product_details/${id}"]`).click();
    cy.url().should('include', `/product_details/${id}`);
    cy.get('.product-information').should('be.visible');
    cy.get('.product-information').find('h2').contains('Blue Top').should('be.visible'); //arrumar para pegar o nome dinamicamente
    cy.get('.product-information').find('p').contains('Category:').should('be.visible');
    cy.get('.product-information').find('span').contains('Rs.').should('be.visible');   
    cy.get('.product-information').find('p').contains('Availability:').should('be.visible');
    cy.get('.product-information').find('p').contains('Condition:').should('be.visible');
    cy.get('.product-information').find('p').contains('Brand:').should ('be.visible');
}


export function pesquisaProduto(productName) {
    const product = productName;
    cy.url().should('include', `/products`);
    cy.get('input#search_product').type(productName);
    cy.get('#submit_search').click();
}
