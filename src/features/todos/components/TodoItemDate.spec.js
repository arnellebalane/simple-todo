import { render, screen } from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import TodoItemDate from './TodoItemDate.svelte';

import { settings } from '@features/settings/store';
import { TODOS_DATE_ABSOLUTE, TODOS_DATE_RELATIVE } from '@features/todos/constants';

describe('TodoItemDate', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2024, 0, 1));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('displays date in absolute format', () => {
        const date = '2024-01-10';
        settings.set({ todoDateDisplay: TODOS_DATE_ABSOLUTE });

        render(TodoItemDate, {
            props: { date },
        });

        expect(screen.getByTestId('todo-item-date')).toHaveTextContent('Jan 10');
    });

    it('displays date in relative format', () => {
        const date = '2024-01-10';
        settings.set({ todoDateDisplay: TODOS_DATE_RELATIVE });

        render(TodoItemDate, {
            props: { date },
        });

        expect(screen.getByTestId('todo-item-date')).toHaveTextContent('In 9 days');
    });
});
