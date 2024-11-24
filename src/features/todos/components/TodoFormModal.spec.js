import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import TodoFormModal from './TodoFormModal.svelte';

describe('TodoFormModal', () => {
    it('hides the modal when show prop is false', () => {
        render(TodoFormModal);

        expect(screen.queryByTestId('todo-form-modal')).not.toBeInTheDocument();
    });

    it('displays the modal when show prop is true', () => {
        render(TodoFormModal, {
            props: {
                data: {},
                show: true,
            },
        });

        expect(screen.getByTestId('todo-form-modal')).toBeInTheDocument();
    });
});
