import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import WhatsNew from './WhatsNew.svelte';

import changeLogs from '@cypress/fixtures/changelogs.json';
import { changelogs, version } from '@features/changelogs/store';

describe('WhatsNew', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        changelogs.set(changeLogs);
        version.set('1.0.0');
    });

    it('displays screens from the changelogs data', () => {
        render(WhatsNew);

        expect(screen.getAllByTestId('changelog-screen')).toHaveLength(changeLogs.length + 1);
    });

    it('hides the previous button when in the first screen', () => {
        render(WhatsNew);

        expect(screen.queryByTestId('changelogs-previous-btn')).not.toBeInTheDocument();
    });

    it('displays the previous button when not in the first screen', async () => {
        render(WhatsNew);
        await userEvent.click(screen.getByTestId('changelogs-next-btn'));

        expect(screen.getByTestId('changelogs-previous-btn')).toBeInTheDocument();
    });

    it('hides the next button and displays the close button when in the last screen', async () => {
        render(WhatsNew);
        await userEvent.click(screen.getByTestId('changelogs-next-btn'));
        await userEvent.click(screen.getByTestId('changelogs-next-btn'));
        await userEvent.click(screen.getByTestId('changelogs-next-btn'));

        expect(screen.queryByTestId('changelogs-next-btn')).not.toBeInTheDocument();
        expect(screen.getByTestId('changelogs-close-btn')).toBeInTheDocument();
    });

    it('displays the next button and hides the close button when not in the last screen', () => {
        render(WhatsNew);

        expect(screen.getByTestId('changelogs-next-btn')).toBeInTheDocument();
        expect(screen.queryByTestId('changelogs-close-btn')).not.toBeInTheDocument();
    });

    it('dispatches "close" event when close button is clicked', async () => {
        const onClose = vi.fn();

        render(WhatsNew, {
            props: { onClose },
        });
        await userEvent.click(screen.getByTestId('changelogs-next-btn'));
        await userEvent.click(screen.getByTestId('changelogs-next-btn'));
        await userEvent.click(screen.getByTestId('changelogs-next-btn'));
        await userEvent.click(screen.getByTestId('changelogs-close-btn'));

        expect(onClose).toHaveBeenCalled();
    });

    it('updates version data if higher that current version when next button is clicked', async () => {
        const onSubscribe = vi.fn();
        version.subscribe(onSubscribe);

        render(WhatsNew);
        await userEvent.click(screen.getByTestId('changelogs-next-btn'));

        expect(onSubscribe).toHaveBeenCalledWith('1.8.1');
        expect(onSubscribe).toHaveBeenCalledWith('1.9.0');
    });

    it('does not update version data when lower than current version when next button is clicked', async () => {
        const onSubscribe = vi.fn();
        version.set('2.0.0');
        version.subscribe(onSubscribe);

        render(WhatsNew);
        await userEvent.click(screen.getByTestId('changelogs-next-btn'));

        expect(onSubscribe).not.toHaveBeenCalledWith('1.8.1');
        expect(onSubscribe).not.toHaveBeenCalledWith('1.9.0');
    });
});
