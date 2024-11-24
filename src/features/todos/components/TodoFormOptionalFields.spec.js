import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';

import TodoFormOptionalFields from './TodoFormOptionalFields.svelte';

import { settings } from '@features/settings/store';
import { generateTodo } from '../utils/test-helpers';

describe('TodoFormOptionalFields', () => {
    beforeEach(() => {
        settings.set({});
    });

    it('hides fields when settings.openOptionalFields=false', () => {
        settings.set({ openOptionalFields: false });
        const data = generateTodo();

        render(TodoFormOptionalFields, {
            props: { data },
        });

        expect(screen.getByTestId('todo-form-optional-fields')).not.toHaveAttribute('open');
    });

    it('displays fields when settings.openOptionalFields=true', () => {
        settings.set({ openOptionalFields: true });
        const data = generateTodo();

        render(TodoFormOptionalFields, {
            props: { data },
        });

        expect(screen.getByTestId('todo-form-optional-fields')).toHaveAttribute('open');
    });

    it('displays fields when any optional field is set in the todo item', () => {
        settings.set({ openOptionalFields: false });
        const data = generateTodo({ date: '2024-10-27' });

        render(TodoFormOptionalFields, {
            props: { data },
        });

        expect(screen.getByTestId('todo-form-optional-fields')).toHaveAttribute('open');
    });
});
