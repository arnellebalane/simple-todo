import Checkbox from './Checkbox.svelte';

describe('Checkbox', () => {
    it('unchecks checkbox input when checked prop is false', () => {
        cy.mount(Checkbox);

        cy.get('input').should('not.be.checked');
    });

    it('checks checkbox input when checked prop is true', () => {
        cy.mount(Checkbox, {
            props: {
                checked: true,
            },
        });

        cy.get('input').should('be.checked');
    });

    it('dispatches "change" event when checkbox is toggled', () => {
        const onChange = cy.spy();

        cy.mount(Checkbox).then(({ component }) => {
            component.$on('change', onChange);
        });

        cy.get('label').click();
        cy.wrap(onChange).should('have.been.called');
    });
});
