import TodoList from './TodoList.svelte';

import { generateTodo } from '../utils/test-helpers';

const title = 'list title';
const todo = generateTodo();
const todos = [todo];
const emptyText = 'there are no todos in this list';

describe('TodoList', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('displays todo list title', () => {
        cy.mount(TodoList, {
            props: {
                title,
                todos,
                emptyText,
            },
        });

        cy.get('article').should('contain.text', title);
    });

    it('dislays empty text when there are no todos', () => {
        cy.mount(TodoList, {
            props: {
                title,
                todos: [],
                emptyText,
            },
        });

        cy.get('article').should('contain.text', emptyText);
    });

    it('displays todo items when there are todos', () => {
        cy.mount(TodoList, {
            props: {
                title,
                todos,
                emptyText,
            },
        });

        cy.get('article').should('not.contain.text', emptyText).and('contain.text', todos[0].body);
    });

    it('dispatches "addtodo" event when add todo button in the header is clicked', () => {
        const addTodoSpy = cy.spy();

        cy.mount(TodoList, {
            props: {
                title,
                todos,
                emptyText,
            },
        }).then(({ component }) => {
            component.$on('addtodo', addTodoSpy);
        });

        cy.get('[data-testid="todo-list-header-add-btn"]').click();
        cy.wrap(addTodoSpy).should('have.been.called');
    });

    it('dispatches "addtodo" event when add todo button in the empty list is clicked', () => {
        const addTodoSpy = cy.spy();

        cy.mount(TodoList, {
            props: {
                title,
                todos: [],
                emptyText,
            },
        }).then(({ component }) => {
            component.$on('addtodo', addTodoSpy);
        });

        cy.get('[data-testid="todo-list-empty-add-btn"]').click();
        cy.wrap(addTodoSpy).should('have.been.called');
    });
});
