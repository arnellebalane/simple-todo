import { STORAGE_KEY_DATA } from '@lib/constants';
import { generateTodo } from '@test/helpers';

describe('settings', () => {
    const settingsLabel = 'Miscellaneous';
    const todo = generateTodo();

    beforeEach(() => {
        cy.visit(Cypress.env('APP_TESTING_ENDPOINT'));
    });

    it('can toggle privacy mode', () => {
        cy.setInitialData(STORAGE_KEY_DATA, [todo]).then(() => {
            cy.get('[data-testid="settings-btn"]').click();
            cy.get('[data-testid="settings-form-sidebar"]').contains(settingsLabel).click();
            cy.get('[data-testid="enable-privacy-mode-toggle"]').click({ force: true });
            cy.get('[data-testid="settings-form-submit-btn"]').click();

            cy.reload();
            cy.get('[data-testid="todo-item"]').should('have.class', 'private');

            cy.get('[data-testid="settings-btn"]').click();
            cy.get('[data-testid="settings-form-sidebar"]').contains(settingsLabel).click();
            cy.get('[data-testid="enable-privacy-mode-toggle"]').click({ force: true });
            cy.get('[data-testid="settings-form-submit-btn"]').click();

            cy.reload();
            cy.get('[data-testid="todo-item"]').should('not.have.class', 'private');
        });
    });
});
