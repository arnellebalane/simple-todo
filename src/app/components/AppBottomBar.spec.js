import AppBottomBar from './AppBottomBar.svelte';

import { settings } from '@features/settings/store';

describe('AppBottomBar', () => {
    beforeEach(() => {
        settings.set({});
    });

    it('hides unsplash attribution if not using an unsplash background image', () => {
        settings.set({ backgroundImage: null });

        cy.mount(AppBottomBar);

        cy.get('[data-testid="unsplash-attribution"]').should('not.exist');
    });

    it('displays unsplash attribution if using an unsplash background image', () => {
        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            const attribution = `Photo by ${backgroundImage.user_name} on Unsplash`;
            settings.set({ backgroundImage });

            cy.mount(AppBottomBar);

            cy.get('[data-testid="unsplash-attribution"]').contains(attribution).should('be.visible');
        });
    });
});
