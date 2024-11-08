import { SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';

import TodoItem from './TodoItem.svelte';

import { settings } from '@features/settings/store';
import { TODOS_DATE_ABSOLUTE } from '../constants';
import { generateTodo } from '../utils/test-helpers';

describe('TodoItem', () => {
    beforeEach(() => {
        cy.viewport(500, 500);

        settings.set({});
    });

    it('displays todo details and optional fields', () => {
        cy.clock(new Date(2024, 0, 1));
        const todo = generateTodo({
            done: false,
            tags: ['one', 'two'],
            date: '2024-01-27',
        });
        settings.set({ todoDateDisplay: TODOS_DATE_ABSOLUTE });

        cy.mount(TodoItem, {
            props: { todo },
        });

        cy.get('[data-cy="todo-item"]').should('not.have.class', 'done').and('not.have.class', 'private');
        cy.get('[data-cy="todo-item-done"]').should('not.be.checked');
        cy.get('[data-cy="todo-item-date"]').should('contain.text', 'Jan 27');
        cy.get('[data-cy="todo-item-details"]').should('contain.text', todo.body);
        for (const tag of todo.tags) {
            cy.get('[data-cy="todo-item-tag"]').contains(tag).should('be.visible');
        }
    });

    it('turns urls in todo body into links', () => {
        const todo = generateTodo({
            body: 'this todo contains a link https://simple-todo.arnelle.dev',
        });
        settings.set({ todoDateDisplay: TODOS_DATE_ABSOLUTE });

        cy.mount(TodoItem, {
            props: { todo },
        });

        cy.get('a').should('have.attr', 'href', 'https://simple-todo.arnelle.dev');
        cy.get('a').should('have.text', 'https://simple-todo.arnelle.dev');
    });

    it('includes the "done" class and checks the checkbox when todo is marked as done', () => {
        const todo = generateTodo({ done: true });

        cy.mount(TodoItem, {
            props: { todo },
        });

        cy.get('[data-cy="todo-item"]').should('have.class', 'done');
        cy.get('[data-cy="todo-item-done"]').should('be.checked');
    });

    it('includes the "private" class when privacy mode setting is enabled', () => {
        const todo = generateTodo();
        settings.set({ enablePrivacyMode: true });

        cy.mount(TodoItem, {
            props: { todo },
        });

        cy.get('[data-cy="todo-item"]').should('have.class', 'private');
    });

    it('displays drag and drop marker when the todo has the flag for being dragged', () => {
        const todo = generateTodo({
            [SHADOW_ITEM_MARKER_PROPERTY_NAME]: true,
        });

        cy.mount(TodoItem, {
            props: { todo },
        });

        cy.get('[data-cy="todo-item-shadow"]').should('be.visible');
    });

    it('dispatches "update" event when todo is marked as done', () => {
        const todo = generateTodo({ done: false });
        const updateSpy = cy.spy();

        cy.mount(TodoItem, {
            props: { todo },
        }).then(({ component }) => {
            component.$on('update', updateSpy);
        });

        cy.get('[data-cy="todo-item-done"]').click({ force: true });
        cy.wrap(updateSpy).should(
            'have.been.calledWith',
            Cypress.sinon.match({
                detail: {
                    id: todo.id,
                    done: true,
                },
            }),
        );
    });

    it('dispatches "update" event when todo is marked as not done', () => {
        const todo = generateTodo({ done: true });
        const updateSpy = cy.spy();

        cy.mount(TodoItem, {
            props: { todo },
        }).then(({ component }) => {
            component.$on('update', updateSpy);
        });

        cy.get('[data-cy="todo-item-done"]').click({ force: true });
        cy.wrap(updateSpy).should(
            'have.been.calledWith',
            Cypress.sinon.match({
                detail: {
                    id: todo.id,
                    done: false,
                },
            }),
        );
    });

    it('dispatches "edit" event when edit menu action is clicked', () => {
        const todo = generateTodo();
        const editSpy = cy.spy();

        cy.mount(TodoItem, {
            props: { todo },
        }).then(({ component }) => {
            component.$on('edit', editSpy);
        });

        cy.get('[data-cy="todo-item-edit"]').click({ force: true });
        cy.wrap(editSpy).should('have.been.called');
    });

    it('dispatches "edit" event when the todo item is double-clicked', () => {
        const todo = generateTodo();
        const editSpy = cy.spy();

        cy.mount(TodoItem, {
            props: { todo },
        }).then(({ component }) => {
            component.$on('edit', editSpy);
        });

        cy.get('[data-cy="todo-item"]').dblclick();
        cy.wrap(editSpy).should('have.been.called');
    });

    it('dispatches "delete" event when delete menu action is clicked', () => {
        const todo = generateTodo();
        const deleteSpy = cy.spy();

        cy.mount(TodoItem, {
            props: { todo },
        }).then(({ component }) => {
            component.$on('delete', deleteSpy);
        });

        cy.get('[data-cy="todo-item-delete"]').click({ force: true });
        cy.wrap(deleteSpy).should('have.been.called');
    });
});
