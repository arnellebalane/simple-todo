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

    it('dispatches "change" event with false when unchecked checkbox is checked', () => {
        const onChange = cy.spy();

        cy.mount(Checkbox).then(({ component }) => {
            component.$on('change', onChange);
        });

        cy.get('label').click();
        cy.wrap(onChange).should('have.been.calledWith', Cypress.sinon.match.has('detail', true));
    });

    it('dispatches "change" event with true when unchecked checkbox is checked', () => {
        const onChange = cy.spy();

        cy.mount(Checkbox, {
            props: {
                checked: true,
            },
        }).then(({ component }) => {
            component.$on('change', onChange);
        });

        cy.get('label').click();
        cy.wrap(onChange).should('have.been.calledWith', Cypress.sinon.match.has('detail', false));
    });
});
