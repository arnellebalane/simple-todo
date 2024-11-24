import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Checkbox from './Checkbox.svelte';

describe('Checkbox', () => {
    it('unchecks checkbox input when checked prop is false', () => {
        render(Checkbox);

        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('checks checkbox input when checked prop is true', () => {
        render(Checkbox, {
            props: {
                checked: true,
            },
        });

        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('calls "onChange" with false when unchecked checkbox is checked', async () => {
        const onChange = vi.fn();

        render(Checkbox, {
            props: { onChange },
        });
        await userEvent.click(screen.getByRole('checkbox'));

        expect(onChange).toHaveBeenCalledWith(true);
    });

    it('dispatches "change" event with true when unchecked checkbox is checked', async () => {
        const onChange = vi.fn();

        render(Checkbox, {
            props: {
                checked: true,
                onChange,
            },
        });
        await userEvent.click(screen.getByRole('checkbox'));

        expect(onChange).toHaveBeenCalledWith(false);
    });
});
