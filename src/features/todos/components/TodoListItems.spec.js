import { createEvent, fireEvent, render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { TRIGGERS } from 'svelte-dnd-action';
import { describe, expect, it, vi } from 'vitest';

import TodoListItems from './TodoListItems.svelte';

import { generateTodo } from '../utils/test-helpers';

const todo = generateTodo();
const todos = [todo];

describe('TodoListItems', () => {
    it('displays the provided todo items', () => {
        render(TodoListItems, {
            props: { todos },
        });

        expect(screen.getByTestId('todo-list-dropzone')).toHaveTextContent(todo.body);
    });

    it('calls "onUpdateTodo" when a todo item gets updated', async () => {
        const onUpdateTodo = vi.fn();

        render(TodoListItems, {
            props: {
                todos,
                onUpdateTodo,
            },
        });
        await userEvent.click(screen.getByTestId('todo-item-done'));

        expect(onUpdateTodo).toHaveBeenCalledWith({
            id: todo.id,
            done: true,
        });
    });

    it('calls "onEditTodo" when a todo item requests to be edited', async () => {
        const onEditTodo = vi.fn();

        render(TodoListItems, {
            props: {
                todos,
                onEditTodo,
            },
        });
        await userEvent.click(screen.getByTestId('todo-item-edit'));

        expect(onEditTodo).toHaveBeenCalledWith(todo);
    });

    it('calls "onDeleteTodo" when a todo item requests to be deleted', async () => {
        const onDeleteTodo = vi.fn();

        render(TodoListItems, {
            props: {
                todos,
                onDeleteTodo,
            },
        });
        await userEvent.click(screen.getByTestId('todo-item-delete'));

        expect(onDeleteTodo).toHaveBeenCalledWith(todo);
    });

    it('calls "onUpdate" when a todo is dropped into the drag and drop zone', () => {
        const newTodo = generateTodo({ body: 'another todo' });
        const onUpdate = vi.fn();

        render(TodoListItems, {
            props: {
                todos,
                onUpdate,
            },
        });

        // svelte-dnd-action uses a custom event called `finalize` when an item is droppped to a dropzone, so we fire
        // a custom event of this name to simulate this interaction
        const list = screen.getByTestId('todo-list-dropzone');
        const event = createEvent(
            'finalize',
            list,
            {
                detail: {
                    items: [todo, newTodo],
                    info: {
                        trigger: TRIGGERS.DROPPED_INTO_ZONE,
                    },
                },
            },
            { EventType: 'CustomEvent' },
        );
        fireEvent(list, event);

        expect(onUpdate).toHaveBeenCalledWith([
            { ...todo, order: 2 },
            { ...newTodo, order: 1 },
        ]);
    });
});
