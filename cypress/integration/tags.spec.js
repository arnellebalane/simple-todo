import { faker } from '@faker-js/faker';
import orderBy from 'lodash/orderBy';
import { TODOS_EVENTUALLY, TODOS_THIS_WEEK, TODOS_TODAY } from '../../src/features/todos/constants';
import { generateTodo } from '../../src/features/todos/utils/test-helpers';
import { STORAGE_KEY_DATA, STORAGE_KEY_TAGS } from '../lib/constants';

describe('tags', () => {
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
        cy.get('[data-cy="add-todo-btn"]').click();
        cy.get('[data-cy="todo-form-body"]').type(body);

        cy.get('[data-cy="tags-input"]').type(tagOne).focus().trigger('keydown', { code: 'Enter' });
        cy.get('[data-cy="tags-input"]').type(tagTwo).focus().trigger('keydown', { code: 'Enter' });
        cy.get('[data-cy="tags-input"]').type(tagThree).focus().trigger('keydown', { code: 'Enter' });
        cy.get('[data-cy="tags-value"]').contains(tagTwo).click();
        cy.get('[data-cy="todo-form-save-btn"]').click();

        cy.get('[data-cy="todo-item"]')
            .eq(0)
            .within(() => {
                cy.get('[data-cy="todo-item-tag"]').should('have.length', 2);
                cy.get('[data-cy="todo-item-tag"]').eq(0).should('have.text', tagOne);
                cy.get('[data-cy="todo-item-tag"]').eq(1).should('have.text', tagThree);
            });
    });

    it('can modify tags when edidting an existing todo', () => {
        const todo = generateTodo({ tags: [tagOne, tagTwo] });
        cy.setInitialData(STORAGE_KEY_DATA, [todo]).then(() => {
            cy.get('[data-cy="todo-item"]').eq(0).dblclick();

            cy.get('[data-cy="tags-value"]').contains(tagTwo).click();
            cy.get('[data-cy="tags-input"]').type(tagThree).focus().trigger('keydown', { code: 'Enter' });
            cy.get('[data-cy="todo-form-save-btn"]').click();

            cy.get('[data-cy="todo-item"]')
                .eq(0)
                .within(() => {
                    cy.get('[data-cy="todo-item-tag"]').should('have.length', 2);
                    cy.get('[data-cy="todo-item-tag"]').eq(0).should('have.text', tagOne);
                    cy.get('[data-cy="todo-item-tag"]').eq(1).should('have.text', tagThree);
                });
        });
    });

    it('suggests existing tags in the tag input field', () => {
        cy.setInitialData(STORAGE_KEY_TAGS, tags).then(() => {
            cy.get('[data-cy="add-todo-btn"]').click();
            cy.get('[data-cy="tags-input"]').focus();
            cy.get('[data-cy="tags-input-datalist"]')
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
            cy.get('[data-cy="settings-btn"]').click();
            cy.get('[data-cy="settings-form-sidebar"]').contains('Tags').click();

            cy.get('[data-cy="tags-settings"]')
                .contains(tagOne)
                .closest('[data-cy="tag-item"]')
                .within(() => {
                    cy.get('[data-cy="tag-action-btn"]').click();
                });
            cy.get('[data-cy="settings-form-submit-btn"]').click();

            cy.get('[data-cy="todo-item"]').each((element) => {
                cy.wrap(element).within(() => {
                    cy.get('[data-cy="todo-item-tag"]').should('have.length', 1).eq(0).should('have.text', tagTwo);
                });
            });
        });
    });
});
