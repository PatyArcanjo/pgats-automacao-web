
export function adicionarProdutoAoCarrinho(id) {
    cy.get(".product-image-wrapper")
        .eq(id - 1)
        .trigger("mouseover")
        .within(() => {
            cy.get(".add-to-cart").first().click()
        })
}       

export function acessarCarrinho() {
    cy.get('#cartModal')
    .should('be.visible')
    .within(() => {
    cy.get('a[href="/view_cart"]').click();
  });
}

export function checkoutCarrinho() {
    cy.contains('a', 'Proceed To Checkout').click(); // classe chama a
    cy.url().should('include', '/checkout');
}   

export function verificarDetalhesPedido() {
    cy.get('.cart_info').should('be.visible');
    cy.get('.cart_info').find('th').contains('Product').should('be.visible');
    cy.get('.cart_info').find('th').contains('Description').should('be.visible');
    cy.get('.cart_info').find('th').contains('Price').should('be.visible');
    cy.get('.cart_info').find('th').contains('Quantity').should('be.visible');
    cy.get('.cart_info').find('th').contains('Total').should('be.visible'); 
}
