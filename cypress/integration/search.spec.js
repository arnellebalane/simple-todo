import { faker } from '@faker-js/faker';

import { TODOS_EVENTUALLY, TODOS_THIS_WEEK, TODOS_TODAY } from '@features/todos/constants';
import { generateTodo } from '@test/helpers';
import { STORAGE_KEY_DATA, STORAGE_KEY_TAGS } from '../lib/constants';

describe('search', () => {
    const settingsLabel = 'Search';
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
            cy.get('[data-testid="todo-list-today"] [data-testid="todo-item"]').should('have.length', 1);
            cy.get('[data-testid="todo-list-this-week"] [data-testid="todo-item"]').should('have.length', 1);
            cy.get('[data-testid="todo-list-eventually"] [data-testid="todo-item"]').should('have.length', 1);

            cy.get('[data-testid="search-form-text-filter"]').type(todoOne.body);

            cy.get('[data-testid="todo-list-today"] [data-testid="todo-item"]').should('have.length', 1);
            cy.get('[data-testid="todo-list-this-week"] [data-testid="todo-item"]').should('have.length', 0);
            cy.get('[data-testid="todo-list-eventually"] [data-testid="todo-item"]').should('have.length', 0);
        });
    });

    it('can search by todo tags', () => {
        cy.setInitialData({
            [STORAGE_KEY_DATA]: todos,
            [STORAGE_KEY_TAGS]: tags,
        }).then(() => {
            cy.get('[data-testid="todo-list-today"] [data-testid="todo-item"]').should('have.length', 1);
            cy.get('[data-testid="todo-list-this-week"] [data-testid="todo-item"]').should('have.length', 1);
            cy.get('[data-testid="todo-list-eventually"] [data-testid="todo-item"]').should('have.length', 1);
            cy.get(`[data-testid="search-form-tags-filter"] option[value="${tagOne}"]`).should('exist');
            cy.get(`[data-testid="search-form-tags-filter"] option[value="${tagTwo}"]`).should('exist');

            cy.get('[data-testid="search-form-tags-filter"]').select(tagTwo);

            cy.get('[data-testid="todo-list-today"] [data-testid="todo-item"]').should('have.length', 0);
            cy.get('[data-testid="todo-list-this-week"] [data-testid="todo-item"]').should('have.length', 1);
            cy.get('[data-testid="todo-list-eventually"] [data-testid="todo-item"]').should('have.length', 0);
        });
    });

    it('can disable search fields from the settings', () => {
        cy.setInitialData({
            [STORAGE_KEY_DATA]: todos,
            [STORAGE_KEY_TAGS]: tags,
        }).then(() => {
            cy.get('[data-testid="search-form-text-filter"]').should('be.visible');
            cy.get('[data-testid="search-form-tags-filter"]').should('be.visible');

            cy.get('[data-testid="settings-btn"]').click();
            cy.get('[data-testid="settings-form-sidebar"]').contains(settingsLabel).click();
            cy.get('[data-testid="enable-text-filter"]').click({ force: true });
            cy.get('[data-testid="enable-tags-filter"]').click({ force: true });
            cy.get('[data-testid="settings-form-submit-btn"]').click();

            cy.get('[data-testid="search-form-text-filter"]').should('not.exist');
            cy.get('[data-testid="search-form-tags-filter"]').should('not.exist');
        });
    });
});
