import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Switch from './Switch.svelte';

describe('Switch', () => {
    it('does not select the checkbox when checked prop is false', () => {
        render(Switch, {
            props: {
                checked: false,
            },
        });

        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('selects the checkbox when checked prop is true', () => {
        render(Switch, {
            props: {
                checked: true,
            },
        });

        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('calls "onChange" when unchecked switch is checked', async () => {
        const onChange = vi.fn();

        render(Switch, {
            props: { onChange },
        });
        await userEvent.click(screen.getByRole('checkbox'));

        expect(onChange).toHaveBeenCalledWith(true);
    });

    it('calls "onChange" when checked switch is unchecked', async () => {
        const onChange = vi.fn();

        render(Switch, {
            props: {
                checked: true,
                onChange,
            },
        });
        await userEvent.click(screen.getByRole('checkbox'));

        expect(onChange).toHaveBeenCalledWith(false);
    });
});
