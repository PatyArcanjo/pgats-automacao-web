import { faker } from '@faker-js/faker';

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

export function finalizarCompra() {
    cy.get('.form-control').type('Comentário para o pedido'); 
    cy.contains('a', 'Place Order').click();
    cy.url().should('include', '/payment'); 
}  

export function preencherDetalhesPagamento() {
    cy.get('[name="name_on_card"]').type(faker.person.fullName());
    cy.get('[name="card_number"]').type(faker.finance.creditCardNumber());
    cy.get('[name="cvc"]').type('123');
    cy.get('[name="expiry_month"]').type(faker.date.month({ abbreviated: true }));
    cy.get('[name="expiry_year"]').type('2025');
    cy.get('#submit').click();
}
    export function confirmarPedidoRealizado() {
   
    cy.url().should('include', '/payment_done');    
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
}

