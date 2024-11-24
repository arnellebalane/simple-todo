import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TODOS_TODAY } from '@features/todos/constants';
import { todos } from '@features/todos/store';
import { STORAGE_KEY_TAGS } from '@lib/constants';

import { tags } from './store';

describe('tags store', () => {
    beforeEach(() => {
        tags.set({});
    });

    describe('tags.add', () => {
        it('adds tag to store', () => {
            const tagsSpy = vi.fn();
            tags.subscribe(tagsSpy);

            tags.add(['one', 'two']);

            expect(tagsSpy).toHaveBeenCalledWith({
                one: { label: 'one' },
                two: { label: 'two' },
            });
        });
    });

    describe('tags.updateTag', () => {
        it('updates tag data', () => {
            const tagsSpy = vi.fn();
            tags.set({
                one: { label: 'one' },
            });
            tags.subscribe(tagsSpy);

            tags.updateTag('one', { removed: true });

            expect(tagsSpy).toHaveBeenCalledWith({
                one: { label: 'one', removed: true },
            });
        });
    });

    describe('tags.save', () => {
        it('saves only tags that are not removed and their allowed fields', () => {
            const tagsSpy = vi.fn();
            tags.set({
                one: { label: 'one', unknown: 'field' },
                two: { label: 'two', removed: true },
            });
            tags.subscribe(tagsSpy);

            tags.save();

            expect(tagsSpy).toHaveBeenCalledWith({
                one: { label: 'one' },
            });
        });

        it('updates todos to only include tags that are not removed', () => {
            const todosSpy = vi.fn();
            const todo = {
                id: 1,
                body: 'todo',
                list: TODOS_TODAY,
                order: 1,
                done: false,
                tags: ['one', 'two'],
            };
            todos.set([todo]);
            todos.subscribe(todosSpy);

            tags.set({
                one: { label: 'one' },
                two: { label: 'two', removed: true },
            });
            tags.save();

            expect(todosSpy).toHaveBeenCalledWith([{ ...todo, tags: ['one'] }]);
        });
    });

    describe('tags.saveInStorage', () => {
        it('saves data in localStorage', () => {
            const data = {
                one: { label: 'one' },
            };
            tags.saveInStorage(data);

            const storedTags = localStorage.getItem(STORAGE_KEY_TAGS);
            const expectedTags = JSON.stringify(data);

            expect(storedTags).toEqual(expectedTags);
        });
    });
});
