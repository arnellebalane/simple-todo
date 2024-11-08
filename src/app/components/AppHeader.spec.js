import AppHeader from './AppHeader.svelte';

import { settings } from '@features/settings/store';
import { removeDoneTimer, todos } from '@features/todos/store';

const mockTodos = ({ done = false } = {}) => {
    return cy.fixture('todos.json').then((todosFixture) => {
        todos.set(todosFixture.map((todo) => ({ ...todo, done })));
    });
};

describe('AppHeader', () => {
    beforeEach(() => {
        settings.set({});
        todos.set([]);
        removeDoneTimer.set(0, { duration: 0 });
    });

    it('displays the current date', () => {
        const date = new Date(2023, 0, 1);
        cy.clock(date);

        cy.mount(AppHeader);

        cy.get('[data-cy="today"]').should('have.text', 'Sunday, January 1');
    });

    it('displays remove done button when remove timer is not running', () => {
        cy.mount(AppHeader);

        cy.get('[data-cy="remove-done-btn"]').should('be.visible');
        cy.get('[data-cy="undo-remove-btn"]').should('not.exist');
    });

    it('displays undo remove button when remove timer is running', () => {
        removeDoneTimer.set(1);

        cy.mount(AppHeader);

        cy.get('[data-cy="undo-remove-btn"]').should('be.visible');
        cy.get('[data-cy="remove-done-btn"]').should('not.exist');
    });

    it('disables remove done button when there are no done todos', () => {
        mockTodos({ done: false }).then(() => {
            cy.mount(AppHeader);

            cy.get('[data-cy="remove-done-btn"]').should('be.disabled');
        });
    });

    it('enables remove done button when there are done todos', () => {
        mockTodos({ done: true }).then(() => {
            cy.mount(AppHeader);

            cy.get('[data-cy="remove-done-btn"]').should('be.enabled');
        });
    });

    it('dispatches "removedone" event when remove done button is clicked', () => {
        mockTodos({ done: true }).then(() => {
            const onRemoveDone = cy.spy();

            cy.mount(AppHeader).then(({ component }) => {
                component.$on('removedone', onRemoveDone);
            });

            cy.get('[data-cy="remove-done-btn"]').click();
            cy.wrap(onRemoveDone).should('have.been.called');
        });
    });

    it('dispatches "addtodo" event when add todo button is clicked', () => {
        const onAddTodo = cy.spy();

        cy.mount(AppHeader).then(({ component }) => {
            component.$on('addtodo', onAddTodo);
        });

        cy.get('[data-cy="add-todo-btn"]').click();
        cy.wrap(onAddTodo).should('have.been.called');
    });

    it('dispatches "undoremovedone" event when undo remove button is clicked', () => {
        removeDoneTimer.set(1);
        const onUndoRemoveDone = cy.spy();

        cy.mount(AppHeader).then(({ component }) => {
            component.$on('undoremovedone', onUndoRemoveDone);
        });

        cy.get('[data-cy="undo-remove-btn"]').click();
        cy.wrap(onUndoRemoveDone).should('have.been.called');
    });

    it('displays the search form when search is enabled', () => {
        settings.set({ enableTextFilter: true, enableTagsFilter: true });

        cy.mount(AppHeader);

        cy.get('[data-cy="search-form"]').should('be.visible');
    });

    it('hides the search form when search is disabled', () => {
        settings.set({ enableTextFilter: false, enableTagsFilter: false });

        cy.mount(AppHeader);

        cy.get('[data-cy="search-form"]').should('not.exist');
    });
});
