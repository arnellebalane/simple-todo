import { faker } from '@faker-js/faker';
import { TODOS_EVENTUALLY, TODOS_THIS_WEEK, TODOS_TODAY } from '../../src/features/todos/constants';
import { generateTodo } from '../../src/features/todos/utils/test-helpers';
import { STORAGE_KEY_DATA, STORAGE_KEY_TAGS } from '../lib/constants';

describe('search', () => {
    const tagOne = faker.string.alpha(10);
    const tagTwo = faker.string.alpha(10);
    const tags = {
        [tagOne]: { label: tagOne },
        [tagTwo]: { label: tagTwo },
    };
    const todoOne = generateTodo({ list: TODOS_TODAY, tags: [tagOne] });
    const todoTwo = generateTodo({ list: TODOS_THIS_WEEK, tags: [tagTwo] });
    const todoThree = generateTodo({ list: TODOS_EVENTUALLY, tags: [tagOne] });
    const todos = [todoOne, todoTwo, todoThree];

    beforeEach(() => {
        cy.visit(Cypress.env('APP_TESTING_ENDPOINT'));
    });

    it('can search by todo text', () => {
        cy.setInitialData({
            [STORAGE_KEY_DATA]: todos,
            [STORAGE_KEY_TAGS]: tags,
        }).then(() => {
            cy.get('[data-cy="todo-list-today"] [data-cy="todo-item"]').should('have.length', 1);
            cy.get('[data-cy="todo-list-this-week"] [data-cy="todo-item"]').should('have.length', 1);
            cy.get('[data-cy="todo-list-eventually"] [data-cy="todo-item"]').should('have.length', 1);

            cy.get('[data-cy="search-form-text-filter"]').type(todoOne.body);

            cy.get('[data-cy="todo-list-today"] [data-cy="todo-item"]').should('have.length', 1);
            cy.get('[data-cy="todo-list-this-week"] [data-cy="todo-item"]').should('have.length', 0);
            cy.get('[data-cy="todo-list-eventually"] [data-cy="todo-item"]').should('have.length', 0);
        });
    });

    it('can search by todo tags', () => {
        cy.setInitialData({
            [STORAGE_KEY_DATA]: todos,
            [STORAGE_KEY_TAGS]: tags,
        }).then(() => {
            cy.get('[data-cy="todo-list-today"] [data-cy="todo-item"]').should('have.length', 1);
            cy.get('[data-cy="todo-list-this-week"] [data-cy="todo-item"]').should('have.length', 1);
            cy.get('[data-cy="todo-list-eventually"] [data-cy="todo-item"]').should('have.length', 1);
            cy.get(`[data-cy="search-form-tags-filter"] option[value="${tagOne}"]`).should('exist');
            cy.get(`[data-cy="search-form-tags-filter"] option[value="${tagTwo}"]`).should('exist');

            cy.get('[data-cy="search-form-tags-filter"]').select(tagTwo);

            cy.get('[data-cy="todo-list-today"] [data-cy="todo-item"]').should('have.length', 0);
            cy.get('[data-cy="todo-list-this-week"] [data-cy="todo-item"]').should('have.length', 1);
            cy.get('[data-cy="todo-list-eventually"] [data-cy="todo-item"]').should('have.length', 0);
        });
    });

    it('can disable search fields from the settings', () => {
        cy.setInitialData({
            [STORAGE_KEY_DATA]: todos,
            [STORAGE_KEY_TAGS]: tags,
        }).then(() => {
            cy.get('[data-cy="search-form-text-filter"]').should('be.visible');
            cy.get('[data-cy="search-form-tags-filter"]').should('be.visible');

            cy.get('[data-cy="settings-btn"]').click();
            cy.get('[data-cy="settings-form-sidebar"]').contains('Search').click();
            cy.get('[data-cy="enable-text-filter"]').click({ force: true });
            cy.get('[data-cy="enable-tags-filter"]').click({ force: true });
            cy.get('[data-cy="settings-form-submit-btn"]').click();

            cy.get('[data-cy="search-form-text-filter"]').should('not.exist');
            cy.get('[data-cy="search-form-tags-filter"]').should('not.exist');
        });
    });
});
