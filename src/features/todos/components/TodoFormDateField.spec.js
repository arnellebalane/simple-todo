import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import TodoFormDateField from './TodoFormDateField.svelte';

describe('TodoFormDateField', () => {
    it('disables clear button when value prop is not set', () => {
        render(TodoFormDateField);

        expect(screen.getByTestId('clear-date-btn')).toBeDisabled();
    });

    it('enables clear button when value prop is set', () => {
        render(TodoFormDateField, {
            props: {
                value: '2024-10-20',
            },
        });

        expect(screen.getByTestId('clear-date-btn')).toBeEnabled();
    });
});
