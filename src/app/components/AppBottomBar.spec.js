import { settings } from '@features/settings/store';
import AppBottomBar from './AppBottomBar.svelte';

describe('AppBottomBar', () => {
    it('hides unsplash attribution if not using an unsplash background image', () => {
        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            const attribution = `Photo by ${backgroundImage.user_name} on Unsplash`;
            settings.set({ backgroundImage: null });

            cy.mount(AppBottomBar);
            cy.contains(attribution).should('not.exist');
        });
    });

    it('displays unsplash attribution if using an unsplash background image', () => {
        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            const attribution = `Photo by ${backgroundImage.user_name} on Unsplash`;
            settings.set({ backgroundImage });

            cy.mount(AppBottomBar);
            cy.contains(attribution).should('be.visible');
        });
    });
});
