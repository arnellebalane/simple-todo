import { faker } from '@faker-js/faker';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { STORAGE_KEY_DATA } from '@lib/constants';

import { TODOS_TODAY } from './constants';
import { todos } from './store';
import { generateTodo } from './utils/test-helpers';

describe('todos store', () => {
    beforeEach(() => {
        todos.set([]);
    });

    describe('todos.set', () => {
        it('picks only the allowed fields for todo items', () => {
            const todosSpy = vi.fn();
            todos.subscribe(todosSpy);

            const todo = generateTodo({ unknownField: true });
            todos.set([todo]);

            expect(todosSpy).not.toHaveBeenCalledWith(
                expect.objectContaining({
                    unknownField: true,
                }),
            );
        });
    });

    describe('todos.updateList', () => {
        it('updates the provided todos and keep the others that are not updated', () => {
            const todoOne = generateTodo();
            const todoTwo = generateTodo();
            todos.set([todoOne, todoTwo]);

            const todosSpy = vi.fn();
            todos.subscribe(todosSpy);

            todos.updateList([{ ...todoTwo, done: true }]);

            expect(todosSpy).toHaveBeenCalledWith([todoOne, { ...todoTwo, done: true }]);
        });
    });

    describe('todos.update', () => {
        it('picks only the allowed fields for the todo item to update', () => {
            const todo = generateTodo();
            todos.set([todo]);

            const todosSpy = vi.fn();
            todos.subscribe(todosSpy);

            todos.update({ ...todo, unknownField: true });

            expect(todosSpy).not.toHaveBeenCalledWith(
                expect.objectContaining({
                    unknownField: true,
                }),
            );
        });
    });

    describe('todos.save', () => {
        it('updates todo and picks only the allowed fields when given an existing todo item', () => {
            const todo = generateTodo();
            todos.set([todo]);

            const todosSpy = vi.fn();
            todos.subscribe(todosSpy);

            todos.save({ ...todo, done: true, unknownField: true });

            expect(todosSpy).toHaveBeenCalledWith([{ ...todo, done: true }]);
        });

        it('adds new todo with initial fields and picks only the allowed fields when given a new todo item', () => {
            const todo = {
                body: faker.string.alpha(10),
                list: TODOS_TODAY,
                unknownField: true,
            };

            const todosSpy = vi.fn();
            todos.subscribe(todosSpy);

            todos.save(todo);

            expect(todosSpy).toHaveBeenCalledWith([
                expect.objectContaining({
                    id: expect.any(String),
                    body: todo.body,
                    list: todo.list,
                    order: 1,
                    done: false,
                    createdAt: expect.any(Number),
                }),
            ]);
            expect(todosSpy).not.toHaveBeenCalledWith([
                expect.objectContaining({
                    unknownField: true,
                }),
            ]);
        });
    });

    describe('todos.remove', () => {
        it('removes given todo from the todo list', () => {
            const todoOne = generateTodo();
            const todoTwo = generateTodo();
            todos.set([todoOne, todoTwo]);

            const todosSpy = vi.fn();
            todos.subscribe(todosSpy);

            todos.remove(todoOne);

            expect(todosSpy).toHaveBeenCalledWith([todoTwo]);
        });
    });

    describe('todos.removeDone', () => {
        it('removes todo items that are marked as done from the todo list', () => {
            const todoOne = generateTodo({ done: true });
            const todoTwo = generateTodo();
            todos.set([todoOne, todoTwo]);

            const todosSpy = vi.fn();
            todos.subscribe(todosSpy);

            todos.removeDone();

            expect(todosSpy).toHaveBeenCalledWith([todoTwo]);
        });
    });

    describe('todos.undoRemoveDone', () => {
        it('adds back removed todo items into the todo list', () => {
            const todoOne = generateTodo({ done: true });
            const todoTwo = generateTodo();
            todos.set([todoOne, todoTwo]);
            todos.removeDone();

            const todosSpy = vi.fn();
            todos.subscribe(todosSpy);

            todos.undoRemoveDone();

            expect(todosSpy).toHaveBeenCalledWith([todoTwo, todoOne]);
        });
    });

    describe('todos.updateTags', () => {
        it('updates todo items to only keep the tags that still exists', () => {
            const todo = generateTodo({ tags: ['one', 'two', 'three'] });
            todos.set([todo]);

            const todosSpy = vi.fn();
            todos.subscribe(todosSpy);

            todos.updateTags({
                three: { label: 'three' },
            });

            expect(todosSpy).toHaveBeenCalledWith([
                {
                    ...todo,
                    tags: ['three'],
                },
            ]);
        });
    });

    it('stores changes to todo list in localStorage', () => {
        const todo = generateTodo();
        todos.set([todo]);

        const storedTodos = localStorage.getItem(STORAGE_KEY_DATA);
        const expectedTodos = JSON.stringify([todo]);

        expect(storedTodos).toEqual(expectedTodos);
    });
});
