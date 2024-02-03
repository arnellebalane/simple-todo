import { TRIGGERS } from 'svelte-dnd-action';
import { generateTodo } from '../utils/test-helpers';
import TodoListItems from './TodoListItems.svelte';

const todo = generateTodo();
const todos = [todo];

describe('TodoListItems', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('displays the provided todo items', () => {
        cy.mount(TodoListItems, {
            props: { todos },
        });

        cy.get('[data-cy="todo-list-dropzone"]').should('contain.text', todo.body);
    });

    it('dispatches "updatetodo" event when a todo item gets updated', () => {
        const updateTodoSpy = cy.spy();

        cy.mount(TodoListItems, {
            props: { todos },
        }).then(({ component }) => {
            component.$on('updatetodo', updateTodoSpy);
        });

        cy.get('[data-cy="todo-item-done"]').click({ force: true });
        cy.wrap(updateTodoSpy).should(
            'have.been.calledWith',
            Cypress.sinon.match({
                detail: {
                    id: todo.id,
                    done: true,
                },
            }),
        );
    });

    it('dispatches "edittodo" event when a todo item requests to be edited', () => {
        const editTodoSpy = cy.spy();

        cy.mount(TodoListItems, {
            props: { todos },
        }).then(({ component }) => {
            component.$on('edittodo', editTodoSpy);
        });

        cy.get('[data-cy="todo-item-edit"]').click({ force: true });
        cy.wrap(editTodoSpy).should(
            'have.been.calledWith',
            Cypress.sinon.match({
                detail: todo,
            }),
        );
    });

    it('dispatches "deletetodo" event when a todo item requests to be deleted', () => {
        const deleteTodoSpy = cy.spy();

        cy.mount(TodoListItems, {
            props: { todos },
        }).then(({ component }) => {
            component.$on('deletetodo', deleteTodoSpy);
        });

        cy.get('[data-cy="todo-item-delete"]').click({ force: true });
        cy.wrap(deleteTodoSpy).should(
            'have.been.calledWith',
            Cypress.sinon.match({
                detail: todo,
            }),
        );
    });

    it('dispatches "update" event when a todo is dropped into the drag and drop zone', () => {
        const newTodo = generateTodo({ body: 'another todo' });
        const updateSpy = cy.spy();

        cy.mount(TodoListItems, {
            props: { todos },
        }).then(({ component }) => {
            component.$on('update', updateSpy);
        });

        cy.get('[data-cy="todo-list-dropzone"]').trigger('finalize', {
            detail: {
                items: [todo, newTodo],
                info: {
                    trigger: TRIGGERS.DROPPED_INTO_ZONE,
                },
            },
        });

        cy.wrap(updateSpy).should(
            'have.been.calledWith',
            Cypress.sinon.match({
                detail: [
                    { ...todo, order: 2 },
                    { ...newTodo, order: 1 },
                ],
            }),
        );
    });
});
