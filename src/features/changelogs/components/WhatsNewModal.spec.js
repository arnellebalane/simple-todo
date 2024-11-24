import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import WhatsNewModal from './WhatsNewModal.svelte';

import changeLogs from '@cypress/fixtures/changelogs.json';
import { changelogs } from '@features/changelogs/store';

describe('WhatsNewModal', () => {
    beforeEach(() => {
        changelogs.set(changeLogs);
    });

    it('hides the modal when show prop is false', () => {
        render(WhatsNewModal);

        expect(screen.queryByTestId('whats-new-modal')).not.toBeInTheDocument();
    });

    it('displays the modal when show prop is true', () => {
        render(WhatsNewModal, {
            props: {
                show: true,
            },
        });

        expect(screen.getByTestId('whats-new-modal')).toBeInTheDocument();
    });
});
