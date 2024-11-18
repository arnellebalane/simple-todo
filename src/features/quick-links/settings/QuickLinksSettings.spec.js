import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import quickLinks from '@cypress/fixtures/quicklinks.json';

import { getDefaultSettings, component as QuickLinksSettings } from '.';

describe('QuickLinksSettings', () => {
    it('calls "onChange" and updates data when there are changes to the quick links settings', async () => {
        const onChange = vi.fn();
        const data = getDefaultSettings();

        render(QuickLinksSettings, {
            props: {
                data,
                onChange,
            },
        });
        await userEvent.type(screen.getByTestId('custom-url-field-input'), quickLinks[0].url);
        await userEvent.click(screen.getByTestId('custom-url-field-button'));

        expect(onChange).toHaveBeenCalledWith({
            quickLinks: [{ ...quickLinks[0], custom: true }],
            showFrequentLinks: false,
        });
    });
});
