import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import TodoListHeader from './TodoListHeader.svelte';

const title = 'list title';
const total = 1;

describe('TodoListHeader', () => {
    it('displays todo list title and add todo button', () => {
        render(TodoListHeader, {
            props: {
                title,
                total,
            },
        });

        expect(screen.getByTestId('todo-list-header')).toHaveTextContent(title);
        expect(screen.getByTestId('todo-list-header-add-btn')).toBeInTheDocument();
    });

    it('hides add todo button when there are no todos', () => {
        render(TodoListHeader, {
            props: {
                title,
                total: 0,
            },
        });

        expect(screen.queryByTestId('todo-list-header-add-btn')).not.toBeInTheDocument();
    });

    it('calls "onAddTodo" event when add todo button is clicked', async () => {
        const onAddTodo = vi.fn();

        render(TodoListHeader, {
            props: {
                title,
                total,
                onAddTodo,
            },
        });
        await userEvent.click(screen.getByTestId('todo-list-header-add-btn'));

        expect(onAddTodo).toHaveBeenCalled();
    });
});
