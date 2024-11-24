import { BACKGROUND_REFRESH_MANUALLY, BACKGROUND_SOURCE_CUSTOM } from '../../src/features/backgrounds/constants';

describe('backgrounds', () => {
    const settingsLabel = 'Background';

    beforeEach(() => {
        cy.visit(Cypress.env('APP_TESTING_ENDPOINT'));
    });

    it('can specify automatic background image', () => {
        cy.get('[data-testid="settings-btn"]').click();
        cy.get('[data-testid="settings-form-sidebar"]').contains(settingsLabel).click();

        cy.intercept('GET', '**/.netlify/functions/get-background-image**').as('getBackgroundImage');
        cy.get('[data-testid="toggle-background"]').click({ force: true });
        cy.wait('@getBackgroundImage').its('response.statusCode').should('equal', 200);

        cy.get(`[data-testid="refresh-frequency-selector"] input[value="${BACKGROUND_REFRESH_MANUALLY}"]`).click({
            force: true,
        });
        cy.get('[data-testid="settings-form-submit-btn"]').click();
        cy.reload();

        cy.get('body').should('have.attr', 'data-background');
    });

    it('can specify custom unsplash image as background image', () => {
        cy.get('[data-testid="settings-btn"]').click();
        cy.get('[data-testid="settings-form-sidebar"]').contains(settingsLabel).click();

        cy.intercept('GET', '**/.netlify/functions/get-background-image**').as('getBackgroundImage');
        cy.get('[data-testid="toggle-background"]').click({ force: true });
        cy.wait('@getBackgroundImage').its('response.statusCode').should('equal', 200);

        cy.get(`[data-testid="background-source-selector"] input[value="${BACKGROUND_SOURCE_CUSTOM}"]`).click({
            force: true,
        });

        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            cy.get('[data-testid="image-url-field-input"]').type(backgroundImage.photo_link);

            cy.get('[data-testid="image-url-field-button"]').click();
            cy.wait('@getBackgroundImage').its('response.statusCode').should('equal', 200);

            cy.get('[data-testid="settings-form-submit-btn"]').click();
            cy.reload();

            cy.get('body').should('have.attr', 'data-background');
        });
    });

    it('can specify custom image file as background image', () => {
        cy.get('[data-testid="settings-btn"]').click();
        cy.get('[data-testid="settings-form-sidebar"]').contains(settingsLabel).click();

        cy.intercept('GET', '**/.netlify/functions/get-background-image**').as('getBackgroundImage');
        cy.get('[data-testid="toggle-background"]').click({ force: true });
        cy.wait('@getBackgroundImage').its('response.statusCode').should('equal', 200);

        cy.get(`[data-testid="background-source-selector"] input[value="${BACKGROUND_SOURCE_CUSTOM}"]`).click({
            force: true,
        });

        cy.get('[data-testid="image-upload-field-input"]').selectFile('cypress/fixtures/unsplash-image.jpeg', {
            force: true,
        });
        cy.get('[data-testid="image-upload-field-button"]').click();

        cy.get('[data-testid="settings-form-submit-btn"]').click();
        cy.reload();

        cy.get('body').should('have.attr', 'data-background');
    });
});
