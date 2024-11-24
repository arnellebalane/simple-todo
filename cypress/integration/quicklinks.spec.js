import { faker } from '@faker-js/faker';

import { STORAGE_KEY_SETTINGS } from '@lib/constants';

describe('quicklinks', () => {
    const settingsLabel = 'Quick Links';

    beforeEach(() => {
        cy.visit(Cypress.env('APP_TESTING_ENDPOINT'));
    });

    it('can add quick links for predefined applications', () => {
        const linkTitles = ['Gmail', 'Calendar', 'Photos'];
        const linkUrls = ['https://mail.google.com/', 'https://calendar.google.com/', 'https://photos.google.com/'];

        cy.get('[data-testid="settings-btn"]').click();
        cy.get('[data-testid="settings-form-sidebar"]').contains(settingsLabel).click();

        for (const title of linkTitles) {
            [cy.get('[data-testid="default-links"]').contains(title).closest('[data-testid="default-link"]').click()];
        }
        cy.get('[data-testid="settings-form-submit-btn"]').click();

        cy.get('[data-testid="quick-link"]').should('have.length', linkUrls.length);
        for (const url of linkUrls) {
            cy.get(`[data-testid="quick-link"][href="${url}"]`).should('be.visible');
        }
    });

    it('can add quick links for custom urls', () => {
        cy.fixture('quicklinks.json').then((quickLinks) => {
            cy.setInitialData(STORAGE_KEY_SETTINGS, {
                quickLinks: quickLinks.filter((link) => link.custom),
            }).then(() => {
                const linkUrls = ['https://arnellebalane.com/', 'https://simple-todo.arnelle.dev/'];

                cy.get('[data-testid="settings-btn"]').click();
                cy.get('[data-testid="settings-form-sidebar"]').contains(settingsLabel).click();

                cy.get('[data-testid="custom-url-field-button"]').click();
                cy.get('[data-testid="custom-url-field-error"]').should('be.visible');
                cy.get('[data-testid="custom-url-field-input"]').type(faker.string.alpha(10));
                cy.get('[data-testid="custom-url-field-button"]').click();
                cy.get('[data-testid="custom-url-field-error"]').should('be.visible');
                cy.get('[data-testid="custom-url-field-input"]').clear();

                cy.get('[data-testid="custom-url-item"]').each((element) => {
                    cy.wrap(element).within(() => {
                        cy.get('[data-testid="custom-url-item-remove-button"]').click();
                    });
                    cy.get('[data-testid="confirm-btn"]').click();
                });
                cy.get('[data-testid="custom-url-item"]').should('have.length', 0);

                for (const url of linkUrls) {
                    cy.get('[data-testid="custom-url-field-input"]').type(url);
                    cy.get('[data-testid="custom-url-field-button"]').click();
                    cy.get('[data-testid="custom-url-item"]').contains(url).should('be.visible');
                }
                cy.get('[data-testid="settings-form-submit-btn"]').click();

                cy.get('[data-testid="quick-link"]').should('have.length', linkUrls.length);
                for (const url of linkUrls) {
                    cy.get(`[data-testid="quick-link"][href="${url}"]`).should('be.visible');
                }
            });
        });
    });
});
