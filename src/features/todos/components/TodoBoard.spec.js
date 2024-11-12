import { TRIGGERS } from 'svelte-dnd-action';

import TodoBoard from './TodoBoard.svelte';

import { TODOS_EVENTUALLY, TODOS_THIS_WEEK, TODOS_TODAY } from '../constants';
import { generateTodo } from '../utils/test-helpers';

describe('TodoBoard', () => {
    it('displays todos today in the correct list', () => {
        const todo = generateTodo({ list: TODOS_TODAY });

        cy.mount(TodoBoard, {
            props: {
                todos: [todo],
            },
        });

        cy.get('[data-testid="todo-list-today"]').should('contain.text', todo.body);
        cy.get('[data-testid="todo-list-this-week"]').should('not.contain.text', todo.body);
        cy.get('[data-testid="todo-list-eventually"]').should('not.contain.text', todo.body);
    });

    it('displays todos this week in the correct list', () => {
        const todo = generateTodo({ list: TODOS_THIS_WEEK });

        cy.mount(TodoBoard, {
            props: {
                todos: [todo],
            },
        });

        cy.get('[data-testid="todo-list-today"]').should('not.contain.text', todo.body);
        cy.get('[data-testid="todo-list-this-week"]').should('contain.text', todo.body);
        cy.get('[data-testid="todo-list-eventually"]').should('not.contain.text', todo.body);
    });

    it('displays todos eventually in the correct list', () => {
        const todo = generateTodo({ list: TODOS_EVENTUALLY });

        cy.mount(TodoBoard, {
            props: {
                todos: [todo],
            },
        });

        cy.get('[data-testid="todo-list-today"]').should('not.contain.text', todo.body);
        cy.get('[data-testid="todo-list-this-week"]').should('not.contain.text', todo.body);
        cy.get('[data-testid="todo-list-eventually"]').should('contain.text', todo.body);
    });

    it('dispatches "addtodo" event when add todo button in today list is clicked', () => {
        const addTodoSpy = cy.spy();

        cy.mount(TodoBoard).then(({ component }) => {
            component.$on('addtodo', addTodoSpy);
        });

        cy.get('[data-testid="todo-list-today"] [data-testid="todo-list-empty-add-btn"]').click();
        cy.wrap(addTodoSpy).should(
            'have.been.calledWith',
            Cypress.sinon.match({
                detail: {
                    list: TODOS_TODAY,
                },
            }),
        );
    });

    it('dispatches "addtodo" event when add todo button in this week list is clicked', () => {
        const addTodoSpy = cy.spy();

        cy.mount(TodoBoard).then(({ component }) => {
            component.$on('addtodo', addTodoSpy);
        });

        cy.get('[data-testid="todo-list-this-week"] [data-testid="todo-list-empty-add-btn"]').click();
        cy.wrap(addTodoSpy).should(
            'have.been.calledWith',
            Cypress.sinon.match({
                detail: {
                    list: TODOS_THIS_WEEK,
                },
            }),
        );
    });

    it('dispatches "addtodo" event when add todo button in eventually list is clicked', () => {
        const addTodoSpy = cy.spy();

        cy.mount(TodoBoard).then(({ component }) => {
            component.$on('addtodo', addTodoSpy);
        });

        cy.get('[data-testid="todo-list-eventually"] [data-testid="todo-list-empty-add-btn"]').click();
        cy.wrap(addTodoSpy).should(
            'have.been.calledWith',
            Cypress.sinon.match({
                detail: {
                    list: TODOS_EVENTUALLY,
                },
            }),
        );
    });

    it('dispatches "update" event when there are changes in the todos list', () => {
        const todo = generateTodo({ list: TODOS_TODAY });
        const updateSpy = cy.spy();

        cy.mount(TodoBoard, {
            props: {
                todos: [todo],
            },
        }).then(({ component }) => {
            component.$on('update', updateSpy);
        });

        cy.get('[data-testid="todo-list-this-week"] [data-testid="todo-list-dropzone"]').trigger('finalize', {
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
                detail: [{ ...todo, list: TODOS_THIS_WEEK }],
            }),
        );
    });
});
