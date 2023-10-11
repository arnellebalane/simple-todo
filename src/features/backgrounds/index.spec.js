import { settings } from '@features/settings/store';
import { getDefaultSettings } from './settings';
import { initializeBackgrounds } from './index';
import { BACKGROUND_REFRESH_DAILY, BACKGROUND_REFRESH_WEEKLY } from './constants';

describe('initializeBackgrounds', () => {
    beforeEach(() => {
        settings.set(getDefaultSettings());

        cy.intercept('GET', '**/.netlify/functions/get-background-image**', {}).as('getBackgroundImage');
        cy.intercept('POST', '**/.netlify/functions/report-unsplash-download**', {}).as('reportUnsplashDownload');
        cy.intercept('GET', 'https://images.unsplash.com/**', { fixture: 'unsplash-image.jpeg' }).as('downloadImage');
    });

    it('removes background image when background settings are not defined', () => {
        initializeBackgrounds();

        cy.get('body').should('not.have.attr', 'data-background');
    });

    it('displays background image when background settings are defined', () => {
        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            settings.set({
                background: true,
                backgroundImage,
            });

            initializeBackgrounds();

            cy.get('body')
                .should('have.attr', 'data-background', backgroundImage.photo_blurhash)
                .should('have.attr', 'data-background-loaded');
        });
    });

    it('sets data-background to custom when using an uploaded background image', () => {
        cy.fixture('unsplash-image-data-url.txt').then((dataUrl) => {
            settings.set({
                background: true,
                backgroundImage: {
                    photo_url: dataUrl,
                },
            });
        });

        initializeBackgrounds();

        cy.get('body').should('have.attr', 'data-background', 'custom').should('have.attr', 'data-background-loaded');
    });

    it('does not load full resolution image when settings are in preview', () => {
        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            settings.set({
                background: true,
                backgroundImage,
                preview: true,
            });

            initializeBackgrounds();

            cy.get('@downloadImage.all').should('have.length', 1);
            cy.wait('@downloadImage').its('request.url').should('equal', backgroundImage.photo_url);
        });
    });

    it('does not load full resolution image again when background has been preloaded', () => {
        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            settings.set({
                background: true,
                backgroundImage,
                backgroundPreloaded: true,
            });

            initializeBackgrounds();

            cy.get('@downloadImage.all').should('have.length', 1);
            cy.wait('@downloadImage').its('request.url').should('equal', backgroundImage.photo_url_full);
        });
    });

    it('does not load full resolution image when data saver mode is enabled', () => {
        cy.window().then((win) => {
            Object.defineProperty(win.navigator.connection, 'saveData', {
                get: cy.stub().returns(true),
            });

            cy.fixture('unsplash-image.json').then((backgroundImage) => {
                settings.set({
                    background: true,
                    backgroundImage,
                });

                initializeBackgrounds();

                cy.get('@downloadImage.all').should('have.length', 1);
                cy.wait('@downloadImage').its('request.url').should('equal', backgroundImage.photo_url);
            });
        });
    });

    // TODO: For some reason this test passes when run on its own, but fails with the rest of the test suite. We should
    // test here that both photo URLs were requested.
    it.skip('loads full resolution image when settings are applied and not yet preloaded', () => {
        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            settings.set({
                background: true,
                backgroundImage,
            });

            initializeBackgrounds();

            cy.get('@downloadImage.all').should('have.length', 2);
            cy.wait('@downloadImage').its('request.url').should('equal', backgroundImage.photo_url);
            cy.wait('@downloadImage').its('request.url').should('equal', backgroundImage.photo_url_full);
        });
    });

    it('refreshes background image for daily frequency and beyond last update', () => {
        cy.clock(new Date(2023, 0, 2));

        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            settings.set({
                background: true,
                backgroundImage,
                backgroundImageLastUpdate: new Date(2023, 0, 1),
                backgroundRefreshFrequency: BACKGROUND_REFRESH_DAILY,
            });

            initializeBackgrounds();

            cy.wait('@getBackgroundImage');
        });
    });

    it('refreshes background image for weekly frequency and beyond last update', () => {
        cy.clock(new Date(2023, 0, 8));

        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            settings.set({
                background: true,
                backgroundImage,
                backgroundImageLastUpdate: new Date(2023, 0, 1),
                backgroundRefreshFrequency: BACKGROUND_REFRESH_WEEKLY,
            });

            initializeBackgrounds();

            cy.wait('@getBackgroundImage');
        });
    });
});
