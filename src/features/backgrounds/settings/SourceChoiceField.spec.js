import SourceChoiceField from './SourceChoiceField.svelte';

const choice = {
    label: 'Label text',
    subtext: 'This is the subtext',
};

describe('SourceChoiceField', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('displays the choice label and subtext', () => {
        cy.mount(SourceChoiceField, {
            props: { choice },
        });

        cy.get('p').should('contain.text', choice.label);
        cy.get('span').should('contain.text', choice.subtext);
    });

    it('does not add the selected class when selected prop is false', () => {
        cy.mount(SourceChoiceField, {
            props: { choice },
        });

        cy.get('p').should('not.have.class', 'selected');
    });

    it('adds the selected class when selected prop is true', () => {
        cy.mount(SourceChoiceField, {
            props: {
                choice,
                selected: true,
            },
        });

        cy.get('p').should('have.class', 'selected');
    });
});
