import { TODOS_DATE_ABSOLUTE, TODOS_DATE_RELATIVE } from '../constants';

import { component as TodosSettings } from '.';

describe('TodosSettings', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('selects toggles based on data prop', () => {
        const data = {
            openOptionalFields: true,
            moveTodosAutomatically: true,
        };

        cy.mount(TodosSettings, {
            props: { data },
        });

        cy.get('[data-testid="open-optional-fields-toggle"]').should('be.checked');
        cy.get('[data-testid="move-todos-automatically-toggle"]').should('be.checked');
    });

    it('deselects toggles based on data prop', () => {
        const data = {
            openOptionalFields: false,
            moveTodosAutomatically: false,
        };

        cy.mount(TodosSettings, {
            props: { data },
        });

        cy.get('[data-testid="open-optional-fields-toggle"]').should('not.be.checked');
        cy.get('[data-testid="move-todos-automatically-toggle"]').should('not.be.checked');
    });

    it('selects date display format based on data.todoDateDisplay', () => {
        const data = {
            todoDateDisplay: TODOS_DATE_RELATIVE,
        };

        cy.mount(TodosSettings, {
            props: { data },
        });

        cy.get(`[data-testid="todo-date-display-selector"] input[value="${TODOS_DATE_RELATIVE}"]`).should('be.checked');
    });

    it('dispatches "change" event when openOptionalFields toggle changes', () => {
        const data = {
            openOptionalFields: true,
        };

        const changeSpy = cy.spy();
        cy.mount(TodosSettings, {
            props: { data },
        }).then(({ component }) => {
            component.$on('change', changeSpy);
        });

        cy.get('[data-testid="open-optional-fields-toggle"]').click({ force: true });

        cy.wrap(changeSpy).should('have.been.called');
        cy.wrap(data).should('deep.equal', {
            openOptionalFields: false,
        });
    });

    it('dispatches "change" event when moveTodosAutomatically toggle changes', () => {
        const data = {
            moveTodosAutomatically: true,
        };

        const changeSpy = cy.spy();
        cy.mount(TodosSettings, {
            props: { data },
        }).then(({ component }) => {
            component.$on('change', changeSpy);
        });

        cy.get('[data-testid="move-todos-automatically-toggle"]').click({ force: true });

        cy.wrap(changeSpy).should('have.been.called');
        cy.wrap(data).should('deep.equal', {
            moveTodosAutomatically: false,
        });
    });

    it('dispatches "change" event when date display format changes', () => {
        const data = {
            todoDateDisplay: TODOS_DATE_ABSOLUTE,
        };

        const changeSpy = cy.spy();
        cy.mount(TodosSettings, {
            props: { data },
        }).then(({ component }) => {
            component.$on('change', changeSpy);
        });

        cy.get(`[data-testid="todo-date-display-selector"] input[value="${TODOS_DATE_RELATIVE}"]`).click({ force: true });

        cy.wrap(changeSpy).should('have.been.called');
        cy.wrap(data).should('deep.equal', {
            todoDateDisplay: TODOS_DATE_RELATIVE,
        });
    });
});
