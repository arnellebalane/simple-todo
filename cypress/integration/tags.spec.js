import { faker } from '@faker-js/faker';
import orderBy from 'lodash/orderBy';

import { TODOS_EVENTUALLY, TODOS_THIS_WEEK, TODOS_TODAY } from '@features/todos/constants';
import { generateTodo } from '@test/helpers';
import { STORAGE_KEY_DATA, STORAGE_KEY_TAGS } from '../lib/constants';

describe('tags', () => {
    const settingsLabel = 'Tags';
    const body = faker.string.alpha(10);
    const tagOne = faker.string.alpha(5);
    const tagTwo = faker.string.alpha(5);
    const tagThree = faker.string.alpha(5);
    const tags = {
        [tagOne]: { label: tagOne },
        [tagTwo]: { label: tagTwo },
    };
    const tagValues = orderBy([tagOne, tagTwo], (tag) => tag.toUpperCase());

    beforeEach(() => {
        cy.visit(Cypress.env('APP_TESTING_ENDPOINT'));
    });

    it('can add tags when adding a new todo', () => {
        cy.get('[data-testid="add-todo-btn"]').click();
        cy.get('[data-testid="todo-form-body"]').type(body);
        cy.get('[data-testid="todo-form-optional-fields"]').click();

        cy.get('[data-testid="tags-input"]').type(tagOne).focus().trigger('keydown', { code: 'Enter' });
        cy.get('[data-testid="tags-input"]').type(tagTwo).focus().trigger('keydown', { code: 'Enter' });
        cy.get('[data-testid="tags-input"]').type(tagThree).focus().trigger('keydown', { code: 'Enter' });
        cy.get('[data-testid="tags-value"]').contains(tagTwo).click();
        cy.get('[data-testid="todo-form-save-btn"]').click();

        cy.get('[data-testid="todo-item"]')
            .eq(0)
            .within(() => {
                cy.get('[data-testid="todo-item-tag"]').should('have.length', 2);
                cy.get('[data-testid="todo-item-tag"]').eq(0).should('contains.text', tagOne);
                cy.get('[data-testid="todo-item-tag"]').eq(1).should('contains.text', tagThree);
            });
    });

    it('can modify tags when edidting an existing todo', () => {
        const todo = generateTodo({ tags: [tagOne, tagTwo] });
        cy.setInitialData(STORAGE_KEY_DATA, [todo]).then(() => {
            cy.get('[data-testid="todo-item"]').eq(0).dblclick();

            cy.get('[data-testid="tags-value"]').contains(tagTwo).click();
            cy.get('[data-testid="tags-input"]').type(tagThree).focus().trigger('keydown', { code: 'Enter' });
            cy.get('[data-testid="todo-form-save-btn"]').click();

            cy.get('[data-testid="todo-item"]')
                .eq(0)
                .within(() => {
                    cy.get('[data-testid="todo-item-tag"]').should('have.length', 2);
                    cy.get('[data-testid="todo-item-tag"]').eq(0).should('contains.text', tagOne);
                    cy.get('[data-testid="todo-item-tag"]').eq(1).should('contains.text', tagThree);
                });
        });
    });

    it('suggests existing tags in the tag input field', () => {
        cy.setInitialData(STORAGE_KEY_TAGS, tags).then(() => {
            cy.get('[data-testid="add-todo-btn"]').click();
            cy.get('[data-testid="tags-input"]').focus();
            cy.get('[data-testid="tags-input-datalist"]')
                .should('exist')
                .within(() => {
                    cy.get('option').should('have.length', 2);
                    cy.get('option').eq(0).should('have.attr', 'value', tagValues[0]);
                    cy.get('option').eq(1).should('have.attr', 'value', tagValues[1]);
                });
        });
    });

    it('can remove tags from the settings and updates todos to exclude that tag', () => {
        const todos = [
            generateTodo({ tags: [tagOne, tagTwo], list: TODOS_TODAY }),
            generateTodo({ tags: [tagOne, tagTwo], list: TODOS_THIS_WEEK }),
            generateTodo({ tags: [tagOne, tagTwo], list: TODOS_EVENTUALLY }),
        ];
        cy.setInitialData({
            [STORAGE_KEY_DATA]: todos,
            [STORAGE_KEY_TAGS]: tags,
        }).then(() => {
            cy.get('[data-testid="settings-btn"]').click();
            cy.get('[data-testid="settings-form-sidebar"]').contains(settingsLabel).click();

            cy.get('[data-testid="tags-settings"]')
                .contains(tagOne)
                .closest('[data-testid="tag-item"]')
                .within(() => {
                    cy.get('[data-testid="tag-action-btn"]').click();
                });
            cy.get('[data-testid="settings-form-submit-btn"]').click();

            cy.get('[data-testid="todo-item"]').each((element) => {
                cy.wrap(element).within(() => {
                    cy.get('[data-testid="todo-item-tag"]')
                        .should('have.length', 1)
                        .eq(0)
                        .should('contains.text', tagTwo);
                });
            });
        });
    });
});
