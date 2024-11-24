describe('template spec', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('APP_TESTING_ENDPOINT'));
    });

    it('opens whats new modal and not display the whats new button when all changelogs have been seen', () => {
        cy.get('[data-testid="whats-new-btn"]').click();
        cy.get('[data-testid="changelogs-page"]').then((elements) => {
            let pages = elements.length;
            while (--pages > 0) {
                cy.get('[data-testid="changelogs-next-btn"]').click();
            }
            cy.get('[data-testid="changelogs-close-btn"]').click();

            cy.reload();
            cy.get('[data-testid="whats-new-btn"]').should('not.exist');
        });
    });
});
