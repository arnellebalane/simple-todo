import { createEvent, fireEvent, render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { TRIGGERS } from 'svelte-dnd-action';
import { describe, expect, it, vi } from 'vitest';

import TodoListEmpty from './TodoListEmpty.svelte';

import { generateTodo } from '../utils/test-helpers';

const text = 'there are no todos in this list';

describe('TodoListEmpty', () => {
    it('displays provided empty text', () => {
        render(TodoListEmpty, {
            props: { text },
        });

        expect(screen.getByTestId('todo-list-empty')).toHaveTextContent(text);
    });

    it('calls "onAddTodo" when add todo button is clicked', async () => {
        const onAddTodo = vi.fn();

        render(TodoListEmpty, {
            props: {
                text,
                onAddTodo,
            },
        });
        await userEvent.click(screen.getByTestId('todo-list-empty-add-btn'));

        expect(onAddTodo).toHaveBeenCalled();
    });

    it('calls "onUpdate" when a todo is dropped into the drag and drop zone', async () => {
        const todo = generateTodo();
        const onUpdate = vi.fn();

        render(TodoListEmpty, {
            props: {
                text,
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
                    items: [todo],
                    info: {
                        trigger: TRIGGERS.DROPPED_INTO_ZONE,
                    },
                },
            },
            { EventType: 'CustomEvent' },
        );
        fireEvent(list, event);

        expect(onUpdate).toHaveBeenCalledWith([todo]);
    });
});
