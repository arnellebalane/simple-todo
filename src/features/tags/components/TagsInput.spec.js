import { fireEvent, render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import TagsInput from './TagsInput.svelte';

describe('TagsInput', () => {
    it('renders current list of values', () => {
        const value = ['one', 'two'];

        render(TagsInput, {
            props: {
                value,
                choices: [],
            },
        });

        for (const tag of value) {
            expect(screen.getByRole('button', { name: tag })).toBeInTheDocument();
        }
    });

    it('calls "onChange" with new value in list of values and resets input when enter key is pressed', async () => {
        const onChange = vi.fn();

        render(TagsInput, {
            props: {
                value: [],
                choices: [],
                onChange,
            },
        });
        await userEvent.type(screen.getByTestId('tags-input'), 'one');
        fireEvent.change(screen.getByTestId('tags-input'));

        expect(onChange).toHaveBeenCalledWith(['one']);
        await vi.waitFor(() => expect(screen.getByTestId('tags-input')).toHaveValue(''));
    });

    it('ignores new value when it is already in the list of values', async () => {
        const onChange = vi.fn();

        render(TagsInput, {
            props: {
                value: ['one'],
                choices: [],
                onChange,
            },
        });
        await userEvent.type(screen.getByTestId('tags-input'), 'one');
        fireEvent.change(screen.getByTestId('tags-input'));

        expect(onChange).not.toHaveBeenCalled();
        await vi.waitFor(() => expect(screen.getByTestId('tags-input')).toHaveValue(''));
    });

    it('removes value from values when it is clicked', async () => {
        const onChange = vi.fn();

        render(TagsInput, {
            props: {
                value: ['one'],
                choices: [],
                onChange,
            },
        });
        await userEvent.click(screen.getByRole('button', { name: 'one' }));

        expect(onChange).toHaveBeenCalledWith([]);
    });
});
