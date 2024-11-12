import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Selector from './Selector.svelte';

const choices = [
    { label: 'Option 1', value: 'ONE' },
    { label: 'Option 2', value: 'TWO' },
    { label: 'Option 3', value: 'THREE' },
];
const { label, value } = choices[0];
const { label: newLabel, value: newValue } = choices[1];

describe('Selector', () => {
    it('displays selection for each item in the choices prop', () => {
        render(Selector, {
            props: {
                choices,
            },
        });

        for (const { label } of choices) {
            expect(screen.getByText(label)).toBeInTheDocument();
        }
    });

    it('selects the option specified in the value prop', () => {
        render(Selector, {
            props: {
                choices,
                value,
            },
        });

        expect(screen.getByLabelText(label)).toBeChecked();
    });

    it('enables the selection when disabled prop is false', () => {
        render(Selector, {
            props: {
                choices,
                disabled: false,
            },
        });

        for (const { label } of choices) {
            expect(screen.getByLabelText(label)).toBeEnabled();
        }
    });

    it('disables the selection when disabled prop is true', () => {
        render(Selector, {
            props: {
                choices,
                disabled: true,
            },
        });

        for (const { label } of choices) {
            expect(screen.getByLabelText(label)).toBeDisabled();
        }
    });

    it('calls "onChange" when selected option changes', async () => {
        const onChange = vi.fn();

        render(Selector, {
            props: {
                choices,
                value,
                onChange,
            },
        });
        await userEvent.click(screen.getByLabelText(newLabel));

        expect(onChange).toHaveBeenCalledWith(newValue);
    });
});
