import { beforeEach, describe, expect, it, vi } from 'vitest';

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

            const querySpy = vi.fn();
            const tagSpy = vi.fn();
            search.query.subscribe(querySpy);
            search.tag.subscribe(tagSpy);

            search.clear();

            expect(querySpy).toHaveBeenCalledWith('');
            expect(tagSpy).toHaveBeenCalledWith(null);
        });
    });

    describe('search.filterTodos', () => {
        it('filters todos based on query filter', () => {
            const result = search.filterTodos(todos);
            const resultSpy = vi.fn();
            result.subscribe(resultSpy);

            search.query.set(todos[1].body);

            expect(resultSpy).toHaveBeenCalledWith([todos[1]]);
        });

        it('filters todos based on tags filter', () => {
            const result = search.filterTodos(todos);
            const resultSpy = vi.fn();
            result.subscribe(resultSpy);

            search.tag.set('test');

            expect(resultSpy).toHaveBeenCalledWith([todos[0]]);
        });
    });
});
