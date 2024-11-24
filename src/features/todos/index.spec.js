import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { settings } from '@features/settings/store';

import { initializeTodos } from '.';
import { TODOS_EVENTUALLY, TODOS_THIS_WEEK, TODOS_TODAY } from './constants';
import { todos } from './store';
import { generateTodo } from './utils/test-helpers';

describe('initializeTodos', () => {
    const yesterday = new Date(2024, 0, 2); // tuesday
    const today = new Date(2024, 0, 3); // wednesday

    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(today);

        settings.set({});
        todos.set([]);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('skips moving todos when settings.moveTodosAutomatically is false', () => {
        settings.set({ moveTodosAutomatically: false });

        const todosSpy = vi.fn();
        todos.subscribe(todosSpy);

        initializeTodos();

        expect(todosSpy).toHaveBeenCalledWith([]);
    });

    it('skips moving todos when it was already done for the current day', () => {
        settings.set({
            moveTodosAutomatically: true,
            moveTodosLastUpdated: today.getTime(),
        });

        const todosSpy = vi.fn();
        todos.subscribe(todosSpy);

        initializeTodos();

        expect(todosSpy).toHaveBeenCalledWith([]);
    });

    it('moves todos to today list when their date is the current day', () => {
        settings.set({
            moveTodosAutomatically: true,
            moveTodosLastUpdated: yesterday.getTime(),
        });

        const todo = generateTodo({
            list: TODOS_EVENTUALLY,
            date: '2024-01-03',
        });
        todos.set([todo]);

        const todosSpy = vi.fn();
        todos.subscribe(todosSpy);

        initializeTodos();

        expect(todosSpy).toHaveBeenCalledWith([{ ...todo, list: TODOS_TODAY }]);
    });

    it('moves todos to this week list when their date is within the current week', () => {
        settings.set({
            moveTodosAutomatically: true,
            moveTodosLastUpdated: yesterday.getTime(),
        });

        const todo = generateTodo({
            list: TODOS_EVENTUALLY,
            date: '2024-01-05',
        });
        todos.set([todo]);

        const todosSpy = vi.fn();
        todos.subscribe(todosSpy);

        initializeTodos();

        expect(todosSpy).toHaveBeenCalledWith([{ ...todo, list: TODOS_THIS_WEEK }]);
    });

    it('skips moving todos when their date is within the current week but has already past', () => {
        settings.set({
            moveTodosAutomatically: true,
            moveTodosLastUpdated: yesterday.getTime(),
        });

        const todo = generateTodo({
            list: TODOS_EVENTUALLY,
            date: '2024-01-02',
        });
        todos.set([todo]);

        const todosSpy = vi.fn();
        todos.subscribe(todosSpy);

        initializeTodos();

        expect(todosSpy).toHaveBeenCalledWith([todo]);
    });
});
