import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import TodoItemMenu from './TodoItemMenu.svelte';

describe('TodoItemMenu', () => {
    it('calls "onEdit" when edit menu action is clicked', async () => {
        const onEdit = vi.fn();

        render(TodoItemMenu, {
            props: { onEdit },
        });
        await userEvent.click(screen.getByTestId('todo-item-edit'));

        expect(onEdit).toHaveBeenCalled();
    });

    it('dispatches "delete" event when delete menu action is clicked', async () => {
        const onDelete = vi.fn();

        render(TodoItemMenu, {
            props: { onDelete },
        });
        await userEvent.click(screen.getByTestId('todo-item-delete'));

        expect(onDelete).toHaveBeenCalled();
    });
});
