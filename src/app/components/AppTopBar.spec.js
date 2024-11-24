import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import AppTopBar from './AppTopBar.svelte';

import changeLogs from '@cypress/fixtures/changelogs.json';
import quickLinks from '@cypress/fixtures/quicklinks.json';
import { changelogs } from '@features/changelogs/store';
import { frequentLinks } from '@features/quick-links/store';
import { settings } from '@features/settings/store';

vi.mock('@lib/axios', () => ({
    default: {
        get: vi.fn().mockResolvedValue({ data: [] }),
    },
}));

describe('AppTopBar', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        settings.set({});
        frequentLinks.set([]);
        changelogs.set([]);
    });

    it('hides quick links when there are no saved quick links', () => {
        settings.set({ quickLinks: [] });

        render(AppTopBar);

        expect(screen.queryByTestId('quick-links')).not.toBeInTheDocument();
    });

    it('displays quick links when there are saved quick links', () => {
        settings.set({ quickLinks });

        render(AppTopBar);

        expect(screen.getByTestId('quick-links')).toBeInTheDocument();
    });

    it('hides frequent links when there are no frequent links', () => {
        render(AppTopBar);

        expect(screen.queryByTestId('frequent-links')).not.toBeInTheDocument();
    });

    it('hides frequent links when disabled in settings', () => {
        frequentLinks.set(quickLinks);
        settings.set({ showFrequentLinks: false });

        render(AppTopBar);

        expect(screen.queryByTestId('frequent-links')).not.toBeInTheDocument();
    });

    it('displays frequent links when it is supported and enabled in settings', () => {
        frequentLinks.set(quickLinks);
        settings.set({ showFrequentLinks: true });

        render(AppTopBar);

        expect(screen.getByTestId('frequent-links')).toBeInTheDocument();
    });

    it('hides whats new button when there are no changelogs', () => {
        render(AppTopBar);

        expect(screen.queryByTestId('whats-new-btn')).not.toBeInTheDocument();
    });

    it('displays whats new button when there are changelogs', () => {
        changelogs.set(changeLogs);

        render(AppTopBar);

        expect(screen.getByTestId('whats-new-btn')).toBeInTheDocument();
    });

    it('opens whats new modal when whats new button is clicked', async () => {
        changelogs.set(changeLogs);

        render(AppTopBar);

        await userEvent.click(screen.getByTestId('whats-new-btn'));
        expect(screen.getByTestId('whats-new-modal')).toBeInTheDocument();
    });

    it('opens settings modal when settings button is clicked', async () => {
        render(AppTopBar);

        await userEvent.click(screen.getByTestId('settings-btn'));
        expect(screen.getByTestId('settings-form-modal')).toBeInTheDocument();
    });
});
