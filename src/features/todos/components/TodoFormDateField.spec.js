import TodoFormDateField from './TodoFormDateField.svelte';

describe('TodoFormDateField', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('disables clear button when value prop is not set', () => {
        cy.mount(TodoFormDateField);

        cy.get('[data-cy="clear-date-btn"]').should('be.disabled');
    });

    it('enables clear button when value prop is set', () => {
        cy.mount(TodoFormDateField, {
            props: {
                value: '2024-10-20',
            },
        });

        cy.get('[data-cy="clear-date-btn"]').should('be.enabled');
    });
});
