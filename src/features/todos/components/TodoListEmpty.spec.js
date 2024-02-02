import { TRIGGERS } from 'svelte-dnd-action';
import { generateTodo } from '../utils/test-helpers';
import TodoListEmpty from './TodoListEmpty.svelte';

const text = 'there are no todos in this list';

describe('TodoListEmpty', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('displays provided empty text', () => {
        cy.mount(TodoListEmpty, {
            props: { text },
        });

        cy.get('[data-cy="todo-list-empty"]').should('contain.text', text);
    });

    it('dispatches "addtodo" event when add todo button is clicked', () => {
        const addTodoSpy = cy.spy();

        cy.mount(TodoListEmpty, {
            props: { text },
        }).then(({ component }) => {
            component.$on('addtodo', addTodoSpy);
        });

        cy.get('[data-cy="todo-list-empty-add-btn"]').click();
        cy.wrap(addTodoSpy).should('have.been.called');
    });

    it('dispatches "update" event when a todo is dropped into the drag and drop zone', () => {
        const todo = generateTodo();
        const updateSpy = cy.spy();

        cy.mount(TodoListEmpty, {
            props: { text },
        }).then(({ component }) => {
            component.$on('update', updateSpy);
        });

        cy.get('[data-cy="todo-list-dropzone"]').trigger('finalize', {
            detail: {
                items: [todo],
                info: {
                    trigger: TRIGGERS.DROPPED_INTO_ZONE,
                },
            },
        });

        cy.wrap(updateSpy).should(
            'have.been.calledWith',
            Cypress.sinon.match({
                detail: [todo],
            }),
        );
    });
});
