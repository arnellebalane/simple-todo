import { faker } from '@faker-js/faker';
import { TODOS_EVENTUALLY, TODOS_TODAY } from '@features/todos/constants';
import { generateTodo } from '@features/todos/utils/test-helpers';

import { search } from './store';

const todos = [
    generateTodo({
        list: TODOS_TODAY,
        tags: ['test'],
    }),
    generateTodo({
        body: faker.string.alpha(10),
        list: TODOS_EVENTUALLY,
    }),
];

describe('search store', () => {
    beforeEach(() => {
        search.clear();
    });

    describe('search.clear', () => {
        it('clears query and tags filters', () => {
            search.query.set('test');
            search.tag.set('test');

            const querySpy = cy.spy();
            const tagSpy = cy.spy();
            search.query.subscribe(querySpy);
            search.tag.subscribe(tagSpy);

            search.clear();

            cy.wrap(querySpy).should('have.been.calledWith', '');
            cy.wrap(tagSpy).should('have.been.calledWith', null);
        });
    });

    describe('search.filterTodos', () => {
        it('filters todos based on query filter', () => {
            const result = search.filterTodos(todos);
            const resultSpy = cy.spy();
            result.subscribe(resultSpy);

            search.query.set(todos[1].body);

            cy.wrap(resultSpy).should('have.been.calledWith', [todos[1]]);
        });

        it('filters todos based on tags filter', () => {
            const result = search.filterTodos(todos);
            const resultSpy = cy.spy();
            result.subscribe(resultSpy);

            search.tag.set('test');

            cy.wrap(resultSpy).should('have.been.calledWith', [todos[0]]);
        });
    });
});
