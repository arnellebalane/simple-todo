import { generateTodo } from '../../src/features/todos/utils/test-helpers';
import { STORAGE_KEY_DATA } from '../lib/constants';

describe('settings', () => {
    const settingsLabel = 'Miscellaneous';
    const todo = generateTodo();

    beforeEach(() => {
        cy.visit(Cypress.env('APP_TESTING_ENDPOINT'));
    });

    it('can toggle privacy mode', () => {
        cy.setInitialData(STORAGE_KEY_DATA, [todo]).then(() => {
            cy.get('[data-cy="settings-btn"]').click();
            cy.get('[data-cy="settings-form-sidebar"]').contains(settingsLabel).click();
            cy.get('[data-cy="enable-privacy-mode-toggle"]').click({ force: true });
            cy.get('[data-cy="settings-form-submit-btn"]').click();

            cy.reload();
            cy.get('[data-cy="todo-item"]').should('have.class', 'private');

            cy.get('[data-cy="settings-btn"]').click();
            cy.get('[data-cy="settings-form-sidebar"]').contains(settingsLabel).click();
            cy.get('[data-cy="enable-privacy-mode-toggle"]').click({ force: true });
            cy.get('[data-cy="settings-form-submit-btn"]').click();

            cy.reload();
            cy.get('[data-cy="todo-item"]').should('not.have.class', 'private');
        });
    });
});
