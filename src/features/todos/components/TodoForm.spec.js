import TodoForm from './TodoForm.svelte';

import { faker } from '@faker-js/faker';
import { TODOS_THIS_WEEK } from '../constants';

describe('TodoForm', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('prepopulates form with values from data prop', () => {
        const data = {
            body: faker.string.alpha(10),
            list: TODOS_THIS_WEEK,
        };

        cy.mount(TodoForm, {
            props: { data },
        });

        cy.get('[data-testid="todo-form-body"]').should('have.text', data.body);
        cy.get(`[data-testid="todo-form-list"] input[value="${data.list}"]`).should('be.checked');
    });

    it('escapes and unsanitizes todo body from data prop when displaying it in the form', () => {
        const data = {
            body: '<strong>test todo</strong>',
            list: TODOS_THIS_WEEK,
        };

        cy.mount(TodoForm, {
            props: { data },
        });

        cy.get('[data-testid="todo-form-body"]').should('have.text', '<strong>test todo</strong>');
    });

    it('disables submit button when todo body is not specified', () => {
        cy.mount(TodoForm);

        cy.get('[data-testid="todo-form-body"]').should('have.text', '');
        cy.get('[data-testid="todo-form-save-btn"]').should('be.disabled');
    });

    it('disables submit button when todo list is not specified', () => {
        const data = {
            body: faker.string.alpha(10),
        };

        cy.mount(TodoForm, {
            props: { data },
        });

        cy.get('[data-testid="todo-form-body"]').should('have.text', data.body);
        cy.get('[data-testid="todo-form-save-btn"]').should('be.disabled');
    });

    it('dispatches "submit" event when form is submitted with valid todo', () => {
        const data = {
            body: '&lt;test todo&gt;',
            list: TODOS_THIS_WEEK,
        };
        const submitSpy = cy.spy();

        cy.mount(TodoForm).then(({ component }) => {
            component.$on('submit', submitSpy);
        });

        cy.get('[data-testid="todo-form-body"]').type(data.body);
        cy.get(`[data-testid="todo-form-list"] input[value="${data.list}"]`).click({ force: true });
        cy.get('[data-testid="todo-form-save-btn"]').click();

        cy.wrap(submitSpy).should('have.been.calledWith', Cypress.sinon.match({ detail: data }));
    });

    it('dispatches "cancel" event when cancel button is clicked', () => {
        const cancelSpy = cy.spy();

        cy.mount(TodoForm).then(({ component }) => {
            component.$on('cancel', cancelSpy);
        });

        cy.get('[data-testid="todo-form-cancel-btn"]').click();
        cy.wrap(cancelSpy).should('have.been.called');
    });
});
