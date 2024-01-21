import { component as ShortcutsSettings } from '.';
import shortcuts from '../shortcuts.json';

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
