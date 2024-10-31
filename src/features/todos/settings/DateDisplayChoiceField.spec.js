import DateDisplayChoiceField from './DateDisplayChoiceField.svelte';

const choice = {
    label: 'Label text',
    subtext: 'This is the subtext',
};

describe('DateDisplayChoiceField', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('displays the choice label and subtext', () => {
        cy.mount(DateDisplayChoiceField, {
            props: { choice },
        });

        cy.get('p').should('contain.text', choice.label);
        cy.get('span').should('contain.text', choice.subtext);
    });

    it('does not add the selected class when selected prop is false', () => {
        cy.mount(DateDisplayChoiceField, {
            props: { choice },
        });

        cy.get('p').should('not.have.class', 'selected');
    });

    it('adds the selected class when selected prop is true', () => {
        cy.mount(DateDisplayChoiceField, {
            props: {
                choice,
                selected: true,
            },
        });

        cy.get('p').should('have.class', 'selected');
    });
});
