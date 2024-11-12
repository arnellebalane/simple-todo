import { COLOR_PURPLE, COLOR_YELLOW, THEME_DARK, THEME_SYSTEM } from '../constants';

import { component as ThemeSettings } from '.';

describe('ThemeSettings', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('selects theme and color choices based on data prop', () => {
        const data = {
            theme: THEME_DARK,
            color: COLOR_PURPLE,
        };

        cy.mount(ThemeSettings, {
            props: { data },
        });

        cy.get(`[data-testid="theme-settings-selector"] input[value="${THEME_DARK}"]`).should('be.checked');
        cy.get(`[data-testid="color-settings-selector"] input[value="${COLOR_PURPLE}"]`).should('be.checked');
    });

    it('dispatches "change" event when theme selection changes', () => {
        const data = {
            theme: THEME_DARK,
            color: COLOR_PURPLE,
        };
        const changeSpy = cy.spy();

        cy.mount(ThemeSettings, {
            props: { data },
        }).then(({ component }) => {
            component.$on('change', changeSpy);
        });
        cy.get(`[data-testid="theme-settings-selector"] input[value="${THEME_SYSTEM}"]`).click({ force: true });

        cy.wrap(changeSpy).should('have.been.called');
        cy.wrap(data).should('deep.equal', {
            theme: THEME_SYSTEM,
            color: COLOR_PURPLE,
        });
    });

    it('dispatches "change" event when color selection changes', () => {
        const data = {
            theme: THEME_DARK,
            color: COLOR_PURPLE,
        };
        const changeSpy = cy.spy();

        cy.mount(ThemeSettings, {
            props: { data },
        }).then(({ component }) => {
            component.$on('change', changeSpy);
        });
        cy.get(`[data-testid="color-settings-selector"] input[value="${COLOR_YELLOW}"]`).click({ force: true });

        cy.wrap(changeSpy).should('have.been.called');
        cy.wrap(data).should('deep.equal', {
            theme: THEME_DARK,
            color: COLOR_YELLOW,
        });
    });
});
