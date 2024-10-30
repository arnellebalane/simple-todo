import { component as TodosSettings } from '.';

describe('TodosSettings', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('selects open optional fields switch when data.openOptionalFields is true', () => {
        cy.mount(TodosSettings, {
            props: {
                data: {
                    openOptionalFields: true,
                },
            },
        });

        cy.get('[data-cy="open-optional-fields-toggle"]').should('be.checked');
    });

    it('deselects open optional fields switch when data.openOptionalFields is false', () => {
        cy.mount(TodosSettings, {
            props: {
                data: {
                    openOptionalFields: false,
                },
            },
        });

        cy.get('[data-cy="open-optional-fields-toggle"]').should('not.be.checked');
    });

    it('selects move todos automatically switch when data.moveTodosAutomatically is true', () => {
        cy.mount(TodosSettings, {
            props: {
                data: {
                    moveTodosAutomatically: true,
                },
            },
        });

        cy.get('[data-cy="move-todos-automatically-toggle"]').should('be.checked');
    });

    it('selects move todos automatically switch when data.moveTodosAutomatically is false', () => {
        cy.mount(TodosSettings, {
            props: {
                data: {
                    moveTodosAutomatically: false,
                },
            },
        });

        cy.get('[data-cy="move-todos-automatically-toggle"]').should('not.be.checked');
    });
});
