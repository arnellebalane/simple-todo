import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import TodoForm from './TodoForm.svelte';

import { TODOS_THIS_WEEK } from '../constants';

describe('TodoForm', () => {
    it('prepopulates form with values from data prop', () => {
        const data = {
            body: faker.string.alpha(10),
            list: TODOS_THIS_WEEK,
        };

        render(TodoForm, {
            props: { data },
        });

        expect(screen.getByTestId('todo-form-body')).toHaveTextContent(data.body);
        expect(screen.getByLabelText('This week')).toBeChecked();
    });

    it('escapes and unsanitizes todo body from data prop when displaying it in the form', () => {
        const data = {
            body: '<strong>test todo</strong>',
            list: TODOS_THIS_WEEK,
        };

        render(TodoForm, {
            props: { data },
        });

        expect(screen.getByTestId('todo-form-body')).toHaveTextContent('<strong>test todo</strong>');
    });

    it('disables submit button when todo body is not specified', () => {
        render(TodoForm, {
            props: {
                data: {},
            },
        });

        expect(screen.getByTestId('todo-form-body')).toHaveTextContent('');
        expect(screen.getByTestId('todo-form-save-btn')).toBeDisabled();
    });

    it('disables submit button when todo list is not specified', () => {
        const data = {
            body: faker.string.alpha(10),
        };

        render(TodoForm, {
            props: { data },
        });

        expect(screen.getByTestId('todo-form-body')).toHaveTextContent(data.body);
        expect(screen.getByTestId('todo-form-save-btn')).toBeDisabled();
    });

    it('calls "onSubmit" when form is submitted with valid todo', async () => {
        const data = {
            body: '&lt;test todo&gt;',
            list: TODOS_THIS_WEEK,
        };
        const onSubmit = vi.fn();

        render(TodoForm, {
            props: {
                data,
                onSubmit,
            },
        });
        await userEvent.type(screen.getByTestId('todo-form-body'), data.body);
        await userEvent.click(screen.getByLabelText('This week'));
        await userEvent.click(screen.getByTestId('todo-form-save-btn'));

        expect(onSubmit).toHaveBeenCalled();
    });

    it('calls "onCancel" when cancel button is clicked', async () => {
        const onCancel = vi.fn();

        render(TodoForm, {
            props: {
                data: {},
                onCancel,
            },
        });
        await userEvent.click(screen.getByTestId('todo-form-cancel-btn'));

        expect(onCancel).toHaveBeenCalled();
    });
});
