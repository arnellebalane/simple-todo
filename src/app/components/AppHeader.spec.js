import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import AppHeader from './AppHeader.svelte';

import todosFixture from '@cypress/fixtures/todos.json';
import { settings } from '@features/settings/store';
import { removeDoneTimer, todos } from '@features/todos/store';

const mockTodos = ({ done = false } = {}) => {
    todos.set(todosFixture.map((todo) => ({ ...todo, done })));
};

describe('AppHeader', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        settings.set({});
        todos.set([]);
        removeDoneTimer.set(0, { duration: 0 });
    });

    it('displays the current date', () => {
        const date = new Date(2023, 0, 1);
        vi.useFakeTimers();
        vi.setSystemTime(date);

        render(AppHeader);

        expect(screen.getByTestId('today')).toHaveTextContent('Sunday, January 1');

        vi.useRealTimers();
    });

    it('displays remove done button when remove timer is not running', () => {
        render(AppHeader);

        expect(screen.getByTestId('remove-done-btn')).toBeInTheDocument();
        expect(screen.queryByTestId('undo-remove-btn')).not.toBeInTheDocument();
    });

    it('displays undo remove button when remove timer is running', () => {
        removeDoneTimer.set(1000, { duration: 0 });

        render(AppHeader);

        expect(screen.getByTestId('undo-remove-btn')).toBeInTheDocument();
        expect(screen.queryByTestId('remove-done-btn')).not.toBeInTheDocument();
    });

    it('disables remove done button when there are no done todos', () => {
        mockTodos({ done: false });

        render(AppHeader);

        expect(screen.getByTestId('remove-done-btn')).toBeDisabled();
    });

    it('enables remove done button when there are done todos', () => {
        mockTodos({ done: true });

        render(AppHeader);

        expect(screen.getByTestId('remove-done-btn')).toBeEnabled();
    });

    it('calls "onRemoveDone" when remove done button is clicked', async () => {
        mockTodos({ done: true });
        const onRemoveDone = vi.fn();

        render(AppHeader, {
            props: { onRemoveDone },
        });
        await userEvent.click(screen.getByTestId('remove-done-btn'));

        expect(onRemoveDone).toHaveBeenCalled();
    });

    it('calls "onAddTodo" when add todo button is clicked', async () => {
        const onAddTodo = vi.fn();

        render(AppHeader, {
            props: { onAddTodo },
        });
        await userEvent.click(screen.getByTestId('add-todo-btn'));

        expect(onAddTodo).toHaveBeenCalled();
    });

    it('calls "onUndoRemoveDone" when undo remove button is clicked', async () => {
        removeDoneTimer.set(1000, { duration: 0 });
        const onUndoRemoveDone = vi.fn();

        render(AppHeader, {
            props: { onUndoRemoveDone },
        });

        await userEvent.click(screen.getByTestId('undo-remove-btn'));

        expect(onUndoRemoveDone).toHaveBeenCalled();
    });

    it('displays the search form when search is enabled', () => {
        settings.set({ enableTextFilter: true, enableTagsFilter: true });

        render(AppHeader);

        expect(screen.getByTestId('search-form')).toBeInTheDocument();
    });

    it('hides the search form when search is disabled', () => {
        settings.set({ enableTextFilter: false, enableTagsFilter: false });

        render(AppHeader);

        expect(screen.queryByTestId('search-form')).not.toBeInTheDocument();
    });
});
