import WhatsNewModal from './WhatsNewModal.svelte';

import { changelogs } from '@features/changelogs/store';

describe('WhatsNewModal', () => {
    beforeEach(() => {
        cy.fixture('changelogs.json').then((changeLogs) => {
            cy.intercept('GET', '**/.netlify/functions/get-version-changelog**', changeLogs);
            changelogs.set(changeLogs);
        });
    });

    it('hides the modal when show prop is false', () => {
        cy.mount(WhatsNewModal);

        cy.get('[data-cy="whats-new-modal"]').should('not.exist');
    });

    it('displays the modal when show prop is true', () => {
        cy.mount(WhatsNewModal, {
            props: {
                show: true,
            },
        });

        cy.get('[data-cy="whats-new-modal"]').should('be.visible');
    });
});
