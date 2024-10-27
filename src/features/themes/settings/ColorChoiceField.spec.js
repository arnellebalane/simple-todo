import ColorChoiceField from './ColorChoiceField.svelte';

import { COLOR_GREEN } from '../constants';

const choice = {
    value: COLOR_GREEN,
};

describe('ColorChoiceField', () => {
    beforeEach(() => {
        cy.viewport(120, 120);
    });

    it('does not add the selected class when selected prop is false', () => {
        cy.mount(ColorChoiceField, {
            props: { choice },
        });

        cy.get('p').should('not.have.class', 'selected');
    });

    it('adds the selected class when selected prop is true', () => {
        cy.mount(ColorChoiceField, {
            props: {
                choice,
                selected: true,
            },
        });

        cy.get('p').should('have.class', 'selected');
    });
});
