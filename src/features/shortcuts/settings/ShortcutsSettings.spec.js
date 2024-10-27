import shortcuts from '../shortcuts.json';

import { component as ShortcutsSettings } from '.';

describe('ShortcutsSettings', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('renders all supported shortcuts', () => {
        cy.mount(ShortcutsSettings);

        for (const { label } of Object.values(shortcuts)) {
            cy.contains(label);
        }
    });
});
