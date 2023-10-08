import { settings } from '@features/settings/store';
import { frequentLinks } from '@features/quick-links/store';
import { changelogs } from '@features/changelogs/store';
import AppTopBar from './AppTopBar.svelte';

describe('AppTopBar', () => {
    beforeEach(() => {
        settings.set({});
        frequentLinks.set([]);
        changelogs.set([]);

        cy.intercept('GET', '**/.netlify/functions/get-version-changelog**', []);
    });

    it('hides quick links when there are no saved quick links', () => {
        settings.set({ quickLinks: [] });

        cy.mount(AppTopBar);

        cy.get('[data-cy="quick-links"]').should('not.exist');
    });

    it('displays quick links when there are saved quick links', () => {
        cy.fixture('quicklinks.json').then((quickLinks) => {
            settings.set({ quickLinks });

            cy.mount(AppTopBar);

            cy.get('[data-cy="quick-links"]').should('be.visible');
        });
    });

    it('hides frequent links when there are no frequent links', () => {
        cy.mount(AppTopBar);

        cy.get('[data-cy="frequent-links"]').should('not.exist');
    });

    it('hides frequent links when disabled in settings', () => {
        cy.fixture('quicklinks.json').then((quickLinks) => {
            frequentLinks.set(quickLinks);
            settings.set({ showFrequentLinks: false });

            cy.mount(AppTopBar);

            cy.get('[data-cy="frequent-links"]').should('not.exist');
        });
    });

    it('displays frequent links when it is supported and enabled in settings', () => {
        cy.fixture('quicklinks.json').then((quickLinks) => {
            frequentLinks.set(quickLinks);
            settings.set({ showFrequentLinks: true });

            cy.mount(AppTopBar);

            cy.get('[data-cy="frequent-links"]').should('be.visible');
        });
    });

    it('hides whats new button when there are no changelogs', () => {
        cy.mount(AppTopBar);

        cy.get('[data-cy="whats-new-btn"]').should('not.exist');
    });

    it('displays whats new button when there are changelogs', () => {
        cy.fixture('changelogs.json').then((changeLogs) => {
            changelogs.set(changeLogs);

            cy.mount(AppTopBar);

            cy.get('[data-cy="whats-new-btn"]').should('be.visible');
        });
    });

    it.skip('hides chrome web store link when the build is not for web', () => {
        cy.mount(AppTopBar);

        cy.get('[data-cy="chrome-webstore-link"]').should('not.exist');
    });

    it.skip('displays chrome web store link when the build is for web', () => {
        cy.mount(AppTopBar);

        cy.get('[data-cy="chrome-webstore-link"]').should('be.visible');
    });

    it('opens whats new modal when whats new button is clicked', () => {
        cy.fixture('changelogs.json').then((changeLogs) => {
            changelogs.set(changeLogs);

            cy.mount(AppTopBar);

            cy.get('[data-cy="whats-new-btn"]').click();
            cy.get('[data-cy="whats-new-modal"]').should('be.visible');
        });
    });

    it('opens settings modal when settings button is clicked', () => {
        cy.mount(AppTopBar);

        cy.get('[data-cy="settings-btn"]').click();
        cy.get('[data-cy="settings-modal"]').should('be.visible');
    });
});
