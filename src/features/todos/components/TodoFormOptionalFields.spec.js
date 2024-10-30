import TodoFormOptionalFields from './TodoFormOptionalFields.svelte';

import { settings } from '@features/settings/store';
import { generateTodo } from '../utils/test-helpers';

describe('TodoFormOptionalFields', () => {
    beforeEach(() => {
        cy.viewport(500, 500);

        settings.set({});
    });

    it('hides fields when settings.openOptionalFields=false', () => {
        settings.set({ openOptionalFields: false });
        const data = generateTodo();

        cy.mount(TodoFormOptionalFields, {
            props: { data },
        });

        cy.get('[data-cy="todo-form-optional-fields"]').should('not.have.attr', 'open');
    });

    it('displays fields when settings.openOptionalFields=true', () => {
        settings.set({ openOptionalFields: true });
        const data = generateTodo();

        cy.mount(TodoFormOptionalFields, {
            props: { data },
        });

        cy.get('[data-cy="todo-form-optional-fields"]').should('have.attr', 'open');
    });

    it('displays fields when any optional field is set in the todo item', () => {
        settings.set({ openOptionalFields: false });
        const data = generateTodo({ date: '2024-10-27' });

        cy.mount(TodoFormOptionalFields, {
            props: { data },
        });

        cy.get('[data-cy="todo-form-optional-fields"]').should('have.attr', 'open');
    });
});
