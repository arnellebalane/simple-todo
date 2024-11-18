import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import SettingsForm from './SettingsForm.svelte';

import { COLOR_GREEN, COLOR_YELLOW, THEME_LIGHT, THEME_SYSTEM } from '@features/themes/constants';

describe('SettingsForm', () => {
    it('calls "onSubmit" when save changes button is clicked', async () => {
        const onSubmit = vi.fn();
        const data = {
            theme: THEME_SYSTEM,
            color: COLOR_GREEN,
        };

        render(SettingsForm, {
            props: {
                data,
                onSubmit,
            },
        });
        await userEvent.click(screen.getByTestId('settings-form-submit-btn'));

        expect(onSubmit).toHaveBeenCalledWith(data);
    });

    it('calls "onCancel" when cancel button is clicked', async () => {
        const onCancel = vi.fn();

        render(SettingsForm, {
            props: { onCancel },
        });
        await userEvent.click(screen.getByTestId('settings-form-cancel-btn'));

        expect(onCancel).toHaveBeenCalled();
    });

    it('calls "onChange" when setings tab content fields has changes', async () => {
        const onChange = vi.fn();
        const data = {
            theme: THEME_SYSTEM,
            color: COLOR_GREEN,
        };

        render(SettingsForm, {
            props: {
                data,
                onChange,
            },
        });
        await userEvent.click(screen.getByLabelText('Light'));

        expect(onChange).toHaveBeenCalledWith({
            theme: THEME_LIGHT,
            color: COLOR_GREEN,
        });
    });

    it('displays settings form content corresponding to selected settings tab', async () => {
        render(SettingsForm);

        await userEvent.click(screen.getByLabelText('Theme'));
        expect(screen.getByTestId('theme-settings-selector')).toBeInTheDocument();

        await userEvent.click(screen.getByLabelText('Background'));
        expect(screen.getByTestId('toggle-background')).toBeInTheDocument();
    });
});
