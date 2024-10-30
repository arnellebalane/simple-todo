import TodoItemDate from './TodoItemDate.svelte';

import { TODOS_DATE_ABSOLUTE, TODOS_DATE_RELATIVE } from '@features/todos/constants';

describe('TodoItemDate', () => {
    beforeEach(() => {
        cy.clock(new Date(2024, 0, 1));
    });

    it('displays date in absolute format', () => {
        const date = '2024-01-10';

        cy.mount(TodoItemDate, {
            props: {
                date,
                variant: TODOS_DATE_ABSOLUTE,
            },
        });

        cy.get('[data-cy="todo-item-date"]').should('contain.text', 'Jan 10');
    });

    it('displays date in relative format', () => {
        const date = '2024-01-10';

        cy.mount(TodoItemDate, {
            props: {
                date,
                variant: TODOS_DATE_RELATIVE,
            },
        });

        cy.get('[data-cy="todo-item-date"]').should('contain.text', 'In 9 days');
    });
});
