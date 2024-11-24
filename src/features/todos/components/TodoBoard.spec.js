import { createEvent, fireEvent, render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { TRIGGERS } from 'svelte-dnd-action';
import { describe, expect, it, vi } from 'vitest';

import TodoBoard from './TodoBoard.svelte';

import { TODOS_EVENTUALLY, TODOS_THIS_WEEK, TODOS_TODAY } from '../constants';
import { generateTodo } from '../utils/test-helpers';

describe('TodoBoard', () => {
    it('displays todos today in the correct list', () => {
        const todo = generateTodo({ list: TODOS_TODAY });

        render(TodoBoard, {
            props: {
                todos: [todo],
            },
        });

        expect(screen.getByTestId('todo-list-today')).toHaveTextContent(todo.body);
        expect(screen.queryByTestId('todo-list-this-week')).not.toHaveTextContent(todo.body);
        expect(screen.queryByTestId('todo-list-eventually')).not.toHaveTextContent(todo.body);
    });

    it('displays todos this week in the correct list', () => {
        const todo = generateTodo({ list: TODOS_THIS_WEEK });

        render(TodoBoard, {
            props: {
                todos: [todo],
            },
        });

        expect(screen.queryByTestId('todo-list-today')).not.toHaveTextContent(todo.body);
        expect(screen.getByTestId('todo-list-this-week')).toHaveTextContent(todo.body);
        expect(screen.queryByTestId('todo-list-eventually')).not.toHaveTextContent(todo.body);
    });

    it('displays todos eventually in the correct list', () => {
        const todo = generateTodo({ list: TODOS_EVENTUALLY });

        render(TodoBoard, {
            props: {
                todos: [todo],
            },
        });

        expect(screen.queryByTestId('todo-list-today')).not.toHaveTextContent(todo.body);
        expect(screen.queryByTestId('todo-list-this-week')).not.toHaveTextContent(todo.body);
        expect(screen.getByTestId('todo-list-eventually')).toHaveTextContent(todo.body);
    });

    it('calls "onAddTodo" when add todo button in today list is clicked', async () => {
        const onAddTodo = vi.fn();

        render(TodoBoard, {
            props: { onAddTodo },
        });
        await userEvent.click(
            document.querySelector('[data-testid="todo-list-today"] [data-testid="todo-list-empty-add-btn"]'),
        );

        expect(onAddTodo).toHaveBeenCalledWith({
            list: TODOS_TODAY,
        });
    });

    it('calls "onAddTodo" when add todo button in this week list is clicked', async () => {
        const onAddTodo = vi.fn();

        render(TodoBoard, {
            props: { onAddTodo },
        });
        await userEvent.click(
            document.querySelector('[data-testid="todo-list-this-week"] [data-testid="todo-list-empty-add-btn"]'),
        );

        expect(onAddTodo).toHaveBeenCalledWith({
            list: TODOS_THIS_WEEK,
        });
    });

    it('calls "onAddTodo" when add todo button in eventually list is clicked', async () => {
        const onAddTodo = vi.fn();

        render(TodoBoard, {
            props: { onAddTodo },
        });
        await userEvent.click(
            document.querySelector('[data-testid="todo-list-eventually"] [data-testid="todo-list-empty-add-btn"]'),
        );

        expect(onAddTodo).toHaveBeenCalledWith({
            list: TODOS_EVENTUALLY,
        });
    });

    it('calls "onUpdate" when there are changes in the todos list', () => {
        const todo = generateTodo({ list: TODOS_TODAY });
        const onUpdate = vi.fn();

        render(TodoBoard, {
            props: {
                todos: [todo],
                onUpdate,
            },
        });

        // svelte-dnd-action uses a custom event called `finalize` when an item is droppped to a dropzone, so we fire
        // a custom event of this name to simulate this interaction
        const list = document.querySelector('[data-testid="todo-list-this-week"] [data-testid="todo-list-dropzone"]');
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

        expect(onUpdate).toHaveBeenCalledWith([{ ...todo, list: TODOS_THIS_WEEK }]);
    });
});
