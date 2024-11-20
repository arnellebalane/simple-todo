import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { COLOR_PURPLE, COLOR_YELLOW, THEME_DARK, THEME_SYSTEM } from '../constants';

import { component as ThemeSettings } from '.';

describe('ThemeSettings', () => {
    it('selects theme and color choices based on data prop', () => {
        const data = {
            theme: THEME_DARK,
            color: COLOR_PURPLE,
        };

        render(ThemeSettings, {
            props: { data },
        });

        expect(screen.getByLabelText('Dark')).toBeChecked();
        expect(screen.getByLabelText('Purple')).toBeChecked();
    });

    it('dispatches "change" event when theme selection changes', async () => {
        const data = {
            theme: THEME_DARK,
            color: COLOR_PURPLE,
        };
        const onChange = vi.fn();

        render(ThemeSettings, {
            props: {
                data,
                onChange,
            },
        });
        await userEvent.click(screen.getByLabelText('System'));

        expect(onChange).toHaveBeenCalledWith({
            theme: THEME_SYSTEM,
            color: COLOR_PURPLE,
        });
    });

    it('dispatches "change" event when color selection changes', async () => {
        const data = {
            theme: THEME_DARK,
            color: COLOR_PURPLE,
        };
        const onChange = vi.fn();

        render(ThemeSettings, {
            props: {
                data,
                onChange,
            },
        });
        await userEvent.click(screen.getByLabelText('Yellow'));

        expect(onChange).toHaveBeenCalledWith({
            theme: THEME_DARK,
            color: COLOR_YELLOW,
        });
    });
});
