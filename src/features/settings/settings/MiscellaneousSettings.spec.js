import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { component as MiscellaneousSettings } from '.';

describe('MiscellaneousSettings', () => {
    it('toggles privacy mode switch based on enablePrivacyMode prop value', () => {
        render(MiscellaneousSettings, {
            props: {
                data: {
                    enablePrivacyMode: true,
                },
            },
        });

        expect(screen.getByTestId('enable-privacy-mode-toggle')).toBeChecked();
    });

    it('dispatches "change" event when privacy mode switch is toggled', async () => {
        const onChange = vi.fn();
        const data = {
            enablePrivacyMode: false,
        };

        render(MiscellaneousSettings, {
            props: {
                data,
                onChange,
            },
        });
        await userEvent.click(screen.getByTestId('enable-privacy-mode-toggle'));

        expect(onChange).toHaveBeenCalledWith({
            enablePrivacyMode: true,
        });
    });
});
