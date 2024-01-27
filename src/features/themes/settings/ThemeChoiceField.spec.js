import ThemeChoiceField from './ThemeChoiceField.svelte';
import { THEME_SYSTEM } from '../constants';

const choice = {
    label: 'System',
    value: THEME_SYSTEM,
};

describe('ThemeChoiceField', () => {
    beforeEach(() => {
        cy.viewport(180, 180);
    });

    it('displays the choice label', () => {
        cy.mount(ThemeChoiceField, {
            props: { choice },
        });

        cy.get('p').should('contain.text', choice.label);
    });

    it('does not add the selected class when selected prop is false', () => {
        cy.mount(ThemeChoiceField, {
            props: { choice },
        });

        cy.get('p').should('not.have.class', 'selected');
    });

    it('adds the selected class when selected prop is true', () => {
        cy.mount(ThemeChoiceField, {
            props: {
                choice,
                selected: true,
            },
        });

        cy.get('p').should('have.class', 'selected');
    });
});
