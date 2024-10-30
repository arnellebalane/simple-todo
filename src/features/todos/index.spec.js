import { settings } from '@features/settings/store';

import { initializeTodos } from '.';
import { TODOS_EVENTUALLY, TODOS_THIS_WEEK, TODOS_TODAY } from './constants';
import { todos } from './store';
import { generateTodo } from './utils/test-helpers';

describe('initializeTodos', () => {
    const yesterday = new Date(2024, 0, 2); // tuesday
    const today = new Date(2024, 0, 3); // wednesday

    beforeEach(() => {
        cy.clock(today);

        settings.set({});
        todos.set([]);
    });

    it('skips moving todos when settings.moveTodosAutomatically is false', () => {
        settings.set({ moveTodosAutomatically: false });

        const todosSpy = cy.spy();
        todos.subscribe(todosSpy);

        initializeTodos();

        cy.wrap(todosSpy).should('have.always.been.calledWith', []);
    });

    it('skips moving todos when it was already done for the current day', () => {
        settings.set({
            moveTodosAutomatically: true,
            moveTodosLastUpdated: today.getTime(),
        });

        const todosSpy = cy.spy();
        todos.subscribe(todosSpy);

        initializeTodos();

        cy.wrap(todosSpy).should('have.always.been.calledWith', []);
    });

    it('moves todos to today list when their date is the current day', () => {
        settings.set({
            moveTodosAutomatically: true,
            moveTodosLastUpdated: yesterday.getTime(),
        });

        const todo = generateTodo({
            list: TODOS_EVENTUALLY,
            date: '2024-01-03',
        });
        todos.set([todo]);

        const todosSpy = cy.spy();
        todos.subscribe(todosSpy);

        initializeTodos();

        cy.wrap(todosSpy).should('have.been.calledWith', [{ ...todo, list: TODOS_TODAY }]);
    });

    it('moves todos to this week list when their date is within the current week', () => {
        settings.set({
            moveTodosAutomatically: true,
            moveTodosLastUpdated: yesterday.getTime(),
        });

        const todo = generateTodo({
            list: TODOS_EVENTUALLY,
            date: '2024-01-05',
        });
        todos.set([todo]);

        const todosSpy = cy.spy();
        todos.subscribe(todosSpy);

        initializeTodos();

        cy.wrap(todosSpy).should('have.been.calledWith', [{ ...todo, list: TODOS_THIS_WEEK }]);
    });

    it('skips moving todos when their date is within the current week but has already past', () => {
        settings.set({
            moveTodosAutomatically: true,
            moveTodosLastUpdated: yesterday.getTime(),
        });

        const todo = generateTodo({
            list: TODOS_EVENTUALLY,
            date: '2024-01-02',
        });
        todos.set([todo]);

        const todosSpy = cy.spy();
        todos.subscribe(todosSpy);

        initializeTodos();

        cy.wrap(todosSpy).should('have.always.been.calledWith', [todo]);
    });
});
