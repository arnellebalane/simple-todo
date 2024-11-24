import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import TodoItem from './TodoItem.svelte';

import { settings } from '@features/settings/store';
import { generateTodo } from '@test/helpers';
import { TODOS_DATE_ABSOLUTE } from '../constants';

describe('TodoItem', () => {
    beforeEach(() => {
        settings.set({});
    });

    it('displays todo details and optional fields', () => {
        const todo = generateTodo({
            done: false,
            tags: ['one', 'two'],
            date: '2024-01-27',
        });
        settings.set({ todoDateDisplay: TODOS_DATE_ABSOLUTE });

        render(TodoItem, {
            props: { todo },
        });

        expect(screen.getByTestId('todo-item')).not.toHaveClass('done');
        expect(screen.getByTestId('todo-item')).not.toHaveClass('private');
        expect(screen.getByTestId('todo-item-done')).not.toBeChecked();
        expect(screen.getByTestId('todo-item-date')).toHaveTextContent('Jan 27');
        expect(screen.getByTestId('todo-item-details')).toHaveTextContent(todo.body);
        for (const tag of todo.tags) {
            expect(screen.getByText(tag)).toBeInTheDocument();
        }
    });

    it('turns urls in todo body into links', () => {
        const todo = generateTodo({
            body: 'this todo contains a link https://simple-todo.arnelle.dev',
        });
        settings.set({ todoDateDisplay: TODOS_DATE_ABSOLUTE });

        render(TodoItem, {
            props: { todo },
        });

        const link = screen.getByRole('link', { name: 'https://simple-todo.arnelle.dev' });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://simple-todo.arnelle.dev');
    });

    it('includes the "done" class and checks the checkbox when todo is marked as done', () => {
        const todo = generateTodo({ done: true });

        render(TodoItem, {
            props: { todo },
        });

        expect(screen.getByTestId('todo-item')).toHaveClass('done');
        expect(screen.getByTestId('todo-item-done')).toBeChecked();
    });

    it('includes the "private" class when privacy mode setting is enabled', () => {
        const todo = generateTodo();
        settings.set({ enablePrivacyMode: true });

        render(TodoItem, {
            props: { todo },
        });

        expect(screen.getByTestId('todo-item')).toHaveClass('private');
    });

    it('displays drag and drop marker when the todo has the flag for being dragged', () => {
        const todo = generateTodo({
            [SHADOW_ITEM_MARKER_PROPERTY_NAME]: true,
        });

        render(TodoItem, {
            props: { todo },
        });

        expect(screen.getByTestId('todo-item-shadow')).toBeInTheDocument();
    });

    it('calls "onChange" when todo is marked as done', async () => {
        const todo = generateTodo({ done: false });
        const onChange = vi.fn();

        render(TodoItem, {
            props: {
                todo,
                onChange,
            },
        });
        await userEvent.click(screen.getByTestId('todo-item-done'));

        expect(onChange).toHaveBeenCalledWith({
            id: todo.id,
            done: true,
        });
    });

    it('calls "onChange" when todo is marked as not done', async () => {
        const todo = generateTodo({ done: true });
        const onChange = vi.fn();

        render(TodoItem, {
            props: {
                todo,
                onChange,
            },
        });
        await userEvent.click(screen.getByTestId('todo-item-done'));

        expect(onChange).toHaveBeenCalledWith({
            id: todo.id,
            done: false,
        });
    });

    it('calls "onEdit" when edit menu action is clicked', async () => {
        const todo = generateTodo();
        const onEdit = vi.fn();

        render(TodoItem, {
            props: {
                todo,
                onEdit,
            },
        });
        await userEvent.click(screen.getByTestId('todo-item-edit'));

        expect(onEdit).toHaveBeenCalled();
    });

    it('calls "onEdit" when the todo item is double-clicked', async () => {
        const todo = generateTodo();
        const onEdit = vi.fn();

        render(TodoItem, {
            props: {
                todo,
                onEdit,
            },
        });
        await userEvent.dblClick(screen.getByTestId('todo-item'));

        expect(onEdit).toHaveBeenCalled();
    });

    it('calls "onDelete" when delete menu action is clicked', async () => {
        const todo = generateTodo();
        const onDelete = vi.fn();

        render(TodoItem, {
            props: {
                todo,
                onDelete,
            },
        });
        await userEvent.click(screen.getByTestId('todo-item-delete'));

        expect(onDelete).toHaveBeenCalled();
    });
});
