import SettingsFormSidebar from './SettingsFormSidebar.svelte';
import { settingsTabs } from '../config';

describe('SettingsFormSidebar', () => {
    beforeEach(() => {
        cy.viewport(300, 500);
    });

    it('renders all supported settings tabs', () => {
        cy.mount(SettingsFormSidebar);

        for (const { label } of settingsTabs) {
            cy.contains(label);
        }
    });
});
