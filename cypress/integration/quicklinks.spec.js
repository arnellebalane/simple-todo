import { faker } from '@faker-js/faker';
import { STORAGE_KEY_SETTINGS } from '../lib/constants';

describe('quicklinks', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('APP_TESTING_ENDPOINT'));
    });

    it('can add quick links for predefined applications', () => {
        const linkTitles = ['Gmail', 'Calendar', 'Photos'];
        const linkUrls = ['https://mail.google.com/', 'https://calendar.google.com/', 'https://photos.google.com/'];

        cy.get('[data-cy="settings-btn"]').click();
        cy.get('[data-cy="settings-form-sidebar"]').contains('Quick Links').click();

        for (const title of linkTitles) {
            [cy.get('[data-cy="default-links"]').contains(title).closest('[data-cy="default-link"]').click()];
        }
        cy.get('[data-cy="settings-form-submit"]').click();

        cy.get('[data-cy="quick-link"]').should('have.length', linkUrls.length);
        for (const url of linkUrls) {
            cy.get(`[data-cy="quick-link"][href="${url}"]`).should('be.visible');
        }
    });

    it('can add quick links for custom urls', () => {
        cy.fixture('quicklinks.json').then((quickLinks) => {
            cy.setInitialData(STORAGE_KEY_SETTINGS, {
                quickLinks: quickLinks.filter((link) => link.custom),
            }).then(() => {
                const linkUrls = ['https://arnellebalane.com/', 'https://simple-todo.arnelle.dev/'];

                cy.get('[data-cy="settings-btn"]').click();
                cy.get('[data-cy="settings-form-sidebar"]').contains('Quick Links').click();

                cy.get('[data-cy="custom-url-field-button"]').click();
                cy.get('[data-cy="custom-url-field-error"]').should('be.visible');
                cy.get('[data-cy="custom-url-field-input"]').type(faker.string.alpha(10));
                cy.get('[data-cy="custom-url-field-button"]').click();
                cy.get('[data-cy="custom-url-field-error"]').should('be.visible');
                cy.get('[data-cy="custom-url-field-input"]').clear();

                cy.get('[data-cy="custom-url-item"]').each((element) => {
                    cy.wrap(element).within(() => {
                        cy.get('[data-cy="custom-url-item-remove-button"]').click();
                    });
                    cy.get('[data-cy="confirm-btn"]').click();
                });
                cy.get('[data-cy="custom-url-item"]').should('have.length', 0);

                for (const url of linkUrls) {
                    cy.get('[data-cy="custom-url-field-input"]').type(url);
                    cy.get('[data-cy="custom-url-field-button"]').click();
                    cy.get('[data-cy="custom-url-item"]').contains(url).should('be.visible');
                }
                cy.get('[data-cy="settings-form-submit"]').click();

                cy.get('[data-cy="quick-link"]').should('have.length', linkUrls.length);
                for (const url of linkUrls) {
                    cy.get(`[data-cy="quick-link"][href="${url}"]`).should('be.visible');
                }
            });
        });
    });
});
