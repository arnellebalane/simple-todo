import { faker } from '@faker-js/faker';
import { TODOS_EVENTUALLY, TODOS_THIS_WEEK, TODOS_TODAY } from '../../src/features/todos/constants';
import { generateTodo } from '../../src/features/todos/utils/test-helpers';
import { SHORT_DELAY, STORAGE_KEY_DATA } from '../lib/constants';

describe('todos', () => {
    const body = faker.string.alpha(10);

    beforeEach(() => {
        cy.visit(Cypress.env('APP_TESTING_ENDPOINT'));
    });

    const lists = [
        {
            label: 'today',
            value: TODOS_TODAY,
            selector: 'todo-list-today',
        },
        {
            label: 'this week',
            value: TODOS_THIS_WEEK,
            selector: 'todo-list-this-week',
        },
        {
            label: 'eventually',
            value: TODOS_EVENTUALLY,
            selector: 'todo-list-eventually',
        },
    ];

    for (const list of lists) {
        describe(`todo list: ${list.label}`, () => {
            it('can add todo using the main add todo button', () => {
                cy.get('[data-cy="add-todo-btn"]').click();
                cy.get('[data-cy="todo-form-body"]').type(body);
                cy.get(`[data-cy="todo-form-list"] input[value="${list.value}"]`).click({ force: true });
                cy.get('[data-cy="todo-form-save-btn"]').click();

                cy.get('[data-cy="todo-form-modal"]').should('not.exist');
                cy.get(`[data-cy="${list.selector}"] [data-cy="todo-item"]`)
                    .should('have.length', 1)
                    .eq(0)
                    .should('contain.text', body);
            });

            it('can add todo using the todo list empty state add todo button', () => {
                cy.get(`[data-cy="${list.selector}"] [data-cy="todo-list-empty-add-btn"]`).click();
                cy.get('[data-cy="todo-form-body"]').type(body);
                cy.get(`[data-cy="todo-form-list"] input[value="${list.value}"]`).click({ force: true });
                cy.get('[data-cy="todo-form-save-btn"]').click();

                cy.get('[data-cy="todo-form-modal"]').should('not.exist');
                cy.get(`[data-cy="${list.selector}"] [data-cy="todo-item"]`)
                    .should('have.length', 1)
                    .eq(0)
                    .should('contain.text', body);
            });

            it('can add todo using the todo list header add todo button', () => {
                const todo = generateTodo({ list: list.value });
                cy.setInitialData(STORAGE_KEY_DATA, [todo]).then(() => {
                    cy.get(`[data-cy="${list.selector}"] [data-cy="todo-list-header-add-btn"]`).click();
                    cy.get('[data-cy="todo-form-body"]').type(body);
                    cy.get(`[data-cy="todo-form-list"] input[value="${list.value}"]`).click({ force: true });
                    cy.get('[data-cy="todo-form-save-btn"]').click();

                    cy.get('[data-cy="todo-form-modal"]').should('not.exist');
                    cy.get(`[data-cy="${list.selector}"] [data-cy="todo-item"]`)
                        .should('have.length', 2)
                        .eq(0)
                        .should('contain.text', body);
                });
            });

            it('can edit todo using the edit menu action', () => {
                const todo = generateTodo({ list: list.value });
                cy.setInitialData(STORAGE_KEY_DATA, [todo]).then(() => {
                    cy.get(`[data-cy="${list.selector}"] [data-cy="todo-item"]`)
                        .eq(0)
                        .within(() => {
                            cy.get('[data-cy="todo-item-edit"]').click({ force: true });
                        });

                    cy.get('[data-cy="todo-form-body"]').clear().type(body);
                    cy.get('[data-cy="todo-form-save-btn"]').click();

                    cy.get('[data-cy="todo-form-modal"]').should('not.exist');
                    cy.get(`[data-cy="${list.selector}"] [data-cy="todo-item"]`)
                        .should('have.length', 1)
                        .eq(0)
                        .should('contain.text', body);
                });
            });

            it('can edit todo by double clicking on the todo item', () => {
                const todo = generateTodo({ list: list.value });
                cy.setInitialData(STORAGE_KEY_DATA, [todo]).then(() => {
                    cy.get(`[data-cy="${list.selector}"] [data-cy="todo-item"]`).eq(0).dblclick();

                    cy.get('[data-cy="todo-form-body"]').clear().type(body);
                    cy.get('[data-cy="todo-form-save-btn"]').click();

                    cy.get('[data-cy="todo-form-modal"]').should('not.exist');
                    cy.get(`[data-cy="${list.selector}"] [data-cy="todo-item"]`)
                        .should('have.length', 1)
                        .eq(0)
                        .should('contain.text', body);
                });
            });

            it('can delete todo using the delete menu action', () => {
                const todo = generateTodo({ list: list.value });
                cy.setInitialData(STORAGE_KEY_DATA, [todo]).then(() => {
                    cy.get(`[data-cy="${list.selector}"] [data-cy="todo-item"]`)
                        .eq(0)
                        .within(() => {
                            cy.get('[data-cy="todo-item-delete"]').click({ force: true });
                        });

                    cy.get('[data-cy="app-confirmation"] [data-cy="confirm-btn"]').click();
                    cy.get('[data-cy="app-confirmation"]').should('not.exist');
                    cy.get(`[data-cy="${list.selector}"] [data-cy="todo-item"]`).should('have.length', 0);
                });
            });

            it('can mark todo as done', () => {
                const todo = generateTodo({ list: list.value });
                cy.setInitialData(STORAGE_KEY_DATA, [todo]).then(() => {
                    cy.get(`[data-cy="${list.selector}"] [data-cy="todo-item"]`)
                        .eq(0)
                        .within(() => {
                            cy.get('[data-cy="todo-item-done"]').click({ force: true });
                        })
                        .should('have.class', 'done');
                });
            });

            it('can mark todo as not done', () => {
                const todo = generateTodo({ list: list.value, done: true });
                cy.setInitialData(STORAGE_KEY_DATA, [todo]).then(() => {
                    cy.get(`[data-cy="${list.selector}"] [data-cy="todo-item"]`)
                        .eq(0)
                        .within(() => {
                            cy.get('[data-cy="todo-item-done"]').click({ force: true });
                        })
                        .should('not.have.class', 'done');
                });
            });
        });
    }

    it('can remove todos that are marked as done', () => {
        const todos = [
            generateTodo({ list: TODOS_TODAY }),
            generateTodo({ list: TODOS_TODAY }),
            generateTodo({ list: TODOS_THIS_WEEK }),
            generateTodo({ list: TODOS_THIS_WEEK }),
            generateTodo({ list: TODOS_EVENTUALLY }),
            generateTodo({ list: TODOS_EVENTUALLY }),
        ];
        cy.setInitialData(STORAGE_KEY_DATA, todos).then(() => {
            cy.get('[data-cy="remove-done-btn"]').should('be.disabled');

            const lists = ['todo-list-today', 'todo-list-this-week', 'todo-list-eventually'];
            for (const list of lists) {
                cy.get(`[data-cy="${list}"] [data-cy="todo-item"]`)
                    .eq(0)
                    .within(() => {
                        cy.get('[data-cy="todo-item-done"]').click({ force: true });
                    });
            }

            cy.get('[data-cy="remove-done-btn"]').click();

            for (const list of lists) {
                cy.get(`[data-cy="${list}"] [data-cy="todo-item"]`).should('have.length', 1);
            }
        });
    });

    it('can undo remove of todos that are marked as done', () => {
        const todos = [
            generateTodo({ list: TODOS_TODAY }),
            generateTodo({ list: TODOS_TODAY, done: true }),
            generateTodo({ list: TODOS_THIS_WEEK }),
            generateTodo({ list: TODOS_THIS_WEEK, done: true }),
            generateTodo({ list: TODOS_EVENTUALLY }),
            generateTodo({ list: TODOS_EVENTUALLY, done: true }),
        ];
        cy.setInitialData(STORAGE_KEY_DATA, todos).then(() => {
            cy.get('[data-cy="remove-done-btn"]').click();

            const lists = ['todo-list-today', 'todo-list-this-week', 'todo-list-eventually'];
            for (const list of lists) {
                cy.get(`[data-cy="${list}"] [data-cy="todo-item"]`).should('have.length', 1);
            }

            cy.get('[data-cy="undo-remove-btn"]').click();

            for (const list of lists) {
                cy.get(`[data-cy="${list}"] [data-cy="todo-item"]`).should('have.length', 2);
            }
        });
    });
});
