import { settings } from '@features/settings/store';
import { COLOR_PURPLE, THEME_DARK } from '@features/themes/constants';

import { initializeThemes } from '.';

describe('initializeThemes', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('sets theme and color settings as data-attributes on the body element', () => {
        initializeThemes();

        settings.set({
            theme: THEME_DARK,
            color: COLOR_PURPLE,
        });

        cy.document().then((doc) => {
            cy.wrap(doc.body).should('have.attr', 'data-theme', THEME_DARK);
            cy.wrap(doc.body).should('have.attr', 'data-color', COLOR_PURPLE);
        });
    });
});
