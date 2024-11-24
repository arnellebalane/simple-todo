import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import TodoList from './TodoList.svelte';

import { generateTodo } from '@test/helpers';

const title = 'list title';
const todo = generateTodo();
const todos = [todo];
const emptyText = 'there are no todos in this list';

describe('TodoList', () => {
    it('displays todo list title', () => {
        render(TodoList, {
            props: {
                title,
                todos,
                emptyText,
            },
        });

        expect(screen.getByText(title)).toBeInTheDocument();
    });

    it('dislays empty text when there are no todos', () => {
        render(TodoList, {
            props: {
                title,
                todos: [],
                emptyText,
            },
        });

        expect(screen.getByText(emptyText)).toBeInTheDocument();
    });

    it('displays todo items when there are todos', () => {
        render(TodoList, {
            props: {
                title,
                todos,
                emptyText,
            },
        });

        expect(screen.queryByText(emptyText)).not.toBeInTheDocument();
        expect(screen.getByText(todos[0].body)).toBeInTheDocument();
    });

    it('calls "onAddTodo" when add todo button in the header is clicked', async () => {
        const onAddTodo = vi.fn();

        render(TodoList, {
            props: {
                title,
                todos,
                emptyText,
                onAddTodo,
            },
        });
        await userEvent.click(screen.getByTestId('todo-list-header-add-btn'));

        expect(onAddTodo).toHaveBeenCalled();
    });

    it('calls "onAddTodo" when add todo button in the empty list is clicked', async () => {
        const onAddTodo = vi.fn();

        render(TodoList, {
            props: {
                title,
                todos: [],
                emptyText,
                onAddTodo,
            },
        });
        await userEvent.click(screen.getByTestId('todo-list-empty-add-btn'));

        expect(onAddTodo).toHaveBeenCalled();
    });
});
