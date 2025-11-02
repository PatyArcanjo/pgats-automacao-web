
describe('Drag ann drop', () => {

    it('Multiple Windows', () => {
        cy.visit('https://the-internet.herokuapp.com/windows');
        cy.contains('Click Here')
            .invoke('removeAttr', 'target') // Remove o atributo 'target' para abrir na mesma aba
            .click();

        cy.go('back'); // Volta para a página anterior
        cy.get('h3').should('have.text', 'Opening a new window') // Verifica o texto na página original

    });
    
       it('Drag and Drop', () => {   
        cy.visit('https://the-internet.herokuapp.com/drag_and_drop');

        const  dataTransfer = new DataTransfer(); //
        
        cy.contains('A').trigger('dragstart', { dataTransfer });
        cy.contains('B').trigger('drop', { dataTransfer });
     

    });
});