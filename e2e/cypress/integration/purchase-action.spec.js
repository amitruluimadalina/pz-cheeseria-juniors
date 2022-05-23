/// <reference types="cypress" />
context('Purchase Action', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('Purchase items', () => {

        // Add items to the cart
        cy.get('[data-cy=add-to-cart-1]').click();
        cy.get('[data-cy=add-to-cart-2]').click();

        // Purchase the items
        cy.get('[data-cy=cart-button').click();
        cy.get('[data-cy=purchase-button]').click();

        // Check the items have been purchased
        cy.get('[data-cy=badge-count]').should('have.text', '0');
    })

})