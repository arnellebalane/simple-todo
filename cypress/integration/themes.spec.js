import {
    COLOR_BLUE,
    COLOR_GREEN,
    COLOR_PINK,
    COLOR_PURPLE,
    COLOR_YELLOW,
    THEME_DARK,
    THEME_LIGHT,
    THEME_SYSTEM,
} from '@features/themes/constants';

describe('themes', () => {
    const settingsLabel = 'Theme';
    const themes = [THEME_SYSTEM, THEME_LIGHT, THEME_DARK];
    const colors = [COLOR_GREEN, COLOR_YELLOW, COLOR_BLUE, COLOR_PURPLE, COLOR_PINK];

    beforeEach(() => {
        cy.visit(Cypress.env('APP_TESTING_ENDPOINT'));
    });

    it('can apply theme settings to the document', () => {
        cy.get('[data-testid="settings-btn"]').click();
        cy.get('[data-testid="settings-form-sidebar"]').contains(settingsLabel).click();

        for (const theme of themes) {
            cy.get(`[data-testid="theme-settings-selector"] input[value="${theme}"]`).click({ force: true });
            cy.get('body').should('have.attr', 'data-theme', theme);
        }

        cy.get('[data-testid="settings-form-submit-btn"]').click();
        cy.reload();
        cy.get('body').should('have.attr', 'data-theme', themes[themes.length - 1]);
    });

    it('can apply color settings to the document', () => {
        cy.get('[data-testid="settings-btn"]').click();
        cy.get('[data-testid="settings-form-sidebar"]').contains(settingsLabel).click();

        for (const color of colors) {
            cy.get(`[data-testid="color-settings-selector"] input[value="${color}"]`).click({ force: true });
            cy.get('body').should('have.attr', 'data-color', color);
        }

        cy.get('[data-testid="settings-form-submit-btn"]').click();
        cy.reload();
        cy.get('body').should('have.attr', 'data-color', colors[colors.length - 1]);
    });
});
